import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface SearchResult {
  title: string;
  url: string;
}

const queryDuckDuckGo = async (keyword: string): Promise<SearchResult[]> => {
  try {
    const url = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(keyword)}`;
    const response = await fetch(url);
    const html = await response.text();
    
    // Simple regex to extract search results
    const titleRegex = /<a class="result__a"[^>]*href="([^"]*)"[^>]*>([^<]*)<\/a>/g;
    const results: SearchResult[] = [];
    let match;
    
    while ((match = titleRegex.exec(html)) !== null && results.length < 5) {
      const href = match[1];
      const title = match[2];
      
      try {
        const urlObj = new URL(`https:${href}`);
        const actualUrl = urlObj.searchParams.get('uddg');
        if (actualUrl) {
          results.push({
            title: title.trim(),
            url: actualUrl
          });
        }
      } catch (e) {
        console.log('Error parsing URL:', e);
      }
    }
    
    return results;
  } catch (error) {
    console.error('Error querying DuckDuckGo:', error);
    return [];
  }
};

const summarizeContent = async (url: string, openaiApiKey: string): Promise<string | null> => {
  try {
    const response = await fetch(url);
    const html = await response.text();
    
    // Extract text content from HTML
    const textContent = html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 14000);

    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'Act as a helpful program that can summarize the content of an article. You should be detailed as possible.'
          },
          {
            role: 'user',
            content: `Helpfully summarize the following content:\n\n${textContent}`
          }
        ],
        max_tokens: 1000
      })
    });

    const data = await openaiResponse.json();
    return data.choices?.[0]?.message?.content || null;
  } catch (error) {
    console.error(`Error summarizing content from ${url}:`, error);
    return null;
  }
};

const generateImage = async (prompt: string, openaiApiKey: string): Promise<string | null> => {
  try {
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-image-1',
        prompt: prompt,
        n: 1,
        size: '1024x1024',
        quality: 'high',
        output_format: 'png'
      })
    });

    const data = await response.json();
    
    if (data.error) {
      console.error('OpenAI Image API error:', data.error);
      return null;
    }

    // OpenAI gpt-image-1 returns base64 directly
    return data.data?.[0]?.b64_json || null;
  } catch (error) {
    console.error('Error generating image:', error);
    return null;
  }
};

const generateArticle = async (keyword: string, summaries: string[], openaiApiKey: string): Promise<string> => {
  const summariesText = summaries.filter(s => s).join('\n\n');
  
  const prompt = `Write an SEO-optimized article about: ${keyword}

Use the following research content to construct the article. Do not repeat the same content. The article should be SEO-optimized and more than 1700 words. Format as HTML with proper semantic structure.

Structure the article with:
- An engaging introduction that answers key questions
- Multiple detailed sections (at least 4-5 H2 sections)
- Each H2 section must contain at least 150 words
- Include relevant subheadings (H3) where appropriate
- Add a strong conclusion with a clear call to action
- Use proper HTML tags: <h1>, <h2>, <h3>, <p>, <ul>, <li>, <strong>, <em>
- Include placeholder comments like <!-- IMAGE_PLACEHOLDER_1 --> after the introduction and between major sections for image insertion

Research content:
${summariesText}

Do not reference or promote the source articles directly. Focus on life insurance topics and provide valuable, actionable information.`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${openaiApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'Act as a professional life insurance content writer creating SEO-optimized articles. Use clear, authoritative language and focus on providing valuable, trustworthy information that helps families make informed decisions about life insurance.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 4000
    })
  });

  const data = await response.json();
  const article = data.choices?.[0]?.message?.content || '';
  
  // Generate relevant images and insert them
  const imagePrompts = [
    `Professional illustration about ${keyword} for life insurance education, clean and trustworthy style`,
    `Infographic style illustration showing ${keyword} benefits for families, professional design`,
    `Modern illustration representing ${keyword} in life insurance context, business professional style`
  ];
  
  let articleWithImages = article;
  
  // Generate images and replace placeholders
  for (let i = 0; i < Math.min(imagePrompts.length, 3); i++) {
    console.log(`Generating image ${i + 1} for prompt: ${imagePrompts[i]}`);
    const imageBase64 = await generateImage(imagePrompts[i], openaiApiKey);
    
    if (imageBase64) {
      const imageHtml = `<div class="blog-image">
        <img src="data:image/png;base64,${imageBase64}" alt="${keyword} illustration ${i + 1}" class="w-full h-auto rounded-lg shadow-md my-6" />
      </div>`;
      
      // Replace placeholder or insert at strategic positions
      const placeholder = `<!-- IMAGE_PLACEHOLDER_${i + 1} -->`;
      if (articleWithImages.includes(placeholder)) {
        articleWithImages = articleWithImages.replace(placeholder, imageHtml);
      } else {
        // Insert images at strategic positions in the content
        const sections = articleWithImages.split('<h2>');
        if (sections.length > i + 1) {
          sections[i + 1] = imageHtml + '\n<h2>' + sections[i + 1];
          articleWithImages = sections.join('<h2>');
        }
      }
    }
  }
  
  return articleWithImages;
};

const generateTitles = async (keyword: string, openaiApiKey: string): Promise<string> => {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${openaiApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: `Generate 10 SEO-optimized titles for the following keyword: ${keyword}.`
        }
      ],
      max_tokens: 500
    })
  });

  const data = await response.json();
  return data.choices?.[0]?.message?.content || '';
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { keyword } = await req.json();
    
    if (!keyword) {
      return new Response(
        JSON.stringify({ error: 'Keyword is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get OpenAI API key from Supabase secrets
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openaiApiKey) {
      return new Response(
        JSON.stringify({ error: 'OpenAI API key not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    );

    console.log(`Processing keyword: ${keyword}`);

    // Search for content
    const searchResults = await queryDuckDuckGo(keyword);
    
    if (searchResults.length === 0) {
      return new Response(
        JSON.stringify({ error: 'No search results found for this keyword' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Summarize content from search results
    console.log(`Summarizing ${searchResults.length} articles...`);
    const summaries: string[] = [];
    
    for (const result of searchResults) {
      console.log(`Processing: ${result.title} - ${result.url}`);
      const summary = await summarizeContent(result.url, openaiApiKey);
      if (summary) {
        summaries.push(summary);
      }
    }

    if (summaries.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Could not summarize any content for this keyword' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Generate article and titles
    console.log(`Generating article from ${summaries.length} summaries...`);
    const [article, titles] = await Promise.all([
      generateArticle(keyword, summaries, openaiApiKey),
      generateTitles(keyword, openaiApiKey)
    ]);

    // Generate a compelling title from the suggested titles
    const titleLines = titles.split('\n').filter(line => line.trim());
    const selectedTitle = titleLines.find(line => line.match(/^\d+\./))?.replace(/^\d+\.\s*/, '') || 
                         titleLines[0]?.replace(/^[-•*]\s*/, '') || 
                         keyword;

    // Save to database and auto-publish
    const { data: blogPost, error } = await supabaseClient
      .from('blog_posts')
      .insert({
        keyword,
        title: selectedTitle,
        content: article,
        suggested_titles: titles,
        status: 'published', // Auto-publish to blog
        word_count: article.replace(/<[^>]*>/g, '').split(' ').length, // Count words excluding HTML tags
        published_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to save blog post' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        keyword,
        article,
        titles,
        wordCount: article.split(' ').length,
        blogPostId: blogPost.id
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});