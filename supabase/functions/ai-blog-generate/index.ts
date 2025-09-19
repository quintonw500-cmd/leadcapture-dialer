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
        model: 'dall-e-3',
        prompt: prompt,
        n: 1,
        size: '1024x1024',
        quality: 'hd'
      })
    });

    const data = await response.json();
    
    if (data.error) {
      console.error('OpenAI Image API error:', data.error);
      return null;
    }

    // OpenAI DALL-E returns URL, we need to fetch and convert to base64
    const imageUrl = data.data?.[0]?.url;
    if (!imageUrl) return null;
    
    // Fetch the image and convert to base64
    const imageResponse = await fetch(imageUrl);
    const imageBuffer = await imageResponse.arrayBuffer();
    const base64 = btoa(String.fromCharCode(...new Uint8Array(imageBuffer)));
    return base64;
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
- IMPORTANT: Include image placeholder comments <!-- IMAGE_PLACEHOLDER_1 -->, <!-- IMAGE_PLACEHOLDER_2 -->, etc. after the introduction and between at least 2 major H2 sections for image insertion

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
  
  // Generate at least 2 relevant images and insert them
  const imagePrompts = [
    `Professional illustration about ${keyword} for life insurance education, clean and trustworthy style, no text`,
    `Modern family protection concept for ${keyword}, professional insurance illustration, no text`,
    `Business meeting about ${keyword} life insurance consultation, professional style, no text`,
    `Financial planning chart showing ${keyword} benefits, infographic style, no text`
  ];
  
  let articleWithImages = article;
  let imagesGenerated = 0;
  const minImages = 2;
  
  // Generate images and insert them strategically
  for (let i = 0; i < imagePrompts.length && imagesGenerated < Math.max(minImages, 3); i++) {
    console.log(`Generating image ${i + 1} for prompt: ${imagePrompts[i]}`);
    const imageBase64 = await generateImage(imagePrompts[i], openaiApiKey);
    
    if (imageBase64) {
      const imageHtml = `<div class="blog-image">
        <img src="data:image/png;base64,${imageBase64}" alt="${keyword} illustration showing key concepts" class="w-full h-auto rounded-lg shadow-md my-6" />
      </div>`;
      
      // Replace placeholder or insert at strategic positions
      const placeholder = `<!-- IMAGE_PLACEHOLDER_${i + 1} -->`;
      if (articleWithImages.includes(placeholder)) {
        articleWithImages = articleWithImages.replace(placeholder, imageHtml);
      } else {
        // Insert images at strategic positions - after intro and between sections
        if (imagesGenerated === 0) {
          // Insert first image after the first paragraph
          const firstParagraphEnd = articleWithImages.indexOf('</p>');
          if (firstParagraphEnd !== -1) {
            articleWithImages = articleWithImages.slice(0, firstParagraphEnd + 4) + '\n\n' + imageHtml + '\n\n' + articleWithImages.slice(firstParagraphEnd + 4);
          }
        } else {
          // Insert subsequent images between H2 sections
          const sections = articleWithImages.split('<h2>');
          const targetSection = Math.min(imagesGenerated + 1, sections.length - 1);
          if (sections.length > targetSection) {
            sections[targetSection] = imageHtml + '\n\n<h2>' + sections[targetSection];
            articleWithImages = sections.join('<h2>');
          }
        }
      }
      imagesGenerated++;
    }
  }
  
  // If we didn't get minimum images, add fallback images
  while (imagesGenerated < minImages) {
    const fallbackImageHtml = `<div class="blog-image">
      <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjhmOWZhIiBzdHJva2U9IiNlNWU3ZWIiIHN0cm9rZS13aWR0aD0iMiIvPgogIDx0ZXh0IHg9IjUwJSIgeT0iNDAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiM2Mzc0OGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPiR7a2V5d29yZH08L3RleHQ+CiAgPHRleHQgeD0iNTAlIiB5PSI2MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk3YTNiNCIgdGV4dC1hbmNob3I9Im1pZGRsZSI+TGlmZSBJbnN1cmFuY2UgR3VpZGU8L3RleHQ+Cjwvc3ZnPg==" alt="${keyword} life insurance guide" class="w-full h-auto rounded-lg shadow-md my-6" />
    </div>`;
    
    const sections = articleWithImages.split('<h2>');
    const targetSection = Math.min(imagesGenerated + 1, sections.length - 1);
    if (sections.length > targetSection) {
      sections[targetSection] = fallbackImageHtml + '\n\n<h2>' + sections[targetSection];
      articleWithImages = sections.join('<h2>');
    }
    imagesGenerated++;
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