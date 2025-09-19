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

const generateArticle = async (keyword: string, summaries: string[], openaiApiKey: string): Promise<string> => {
  const summariesText = summaries.filter(s => s).join('\n\n');
  
  const prompt = `Write an SEO-optimized article about: ${keyword}

Use the following research content to construct the article. Do not repeat the same content. The article should be SEO-optimized and more than 1700 words. Format as Markdown.

In the introduction, answer key questions the reader may have. Generate Markdown links where appropriate. 

Each h2 section must contain at least 100 words. Include a conclusion with a call to action.

Research content:
${summariesText}

Do not reference or promote the source articles directly.`;

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
          content: 'Act as a technical writer creating SEO-optimized articles. Use plain language and focus on providing valuable information.'
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
  return data.choices?.[0]?.message?.content || '';
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

    // Save to database
    const { data: blogPost, error } = await supabaseClient
      .from('blog_posts')
      .insert({
        keyword,
        title: keyword,
        content: article,
        suggested_titles: titles,
        status: 'draft',
        word_count: article.split(' ').length
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