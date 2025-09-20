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

const getStaticImage = (): string => {
  // Static images array to rotate through
  const staticImages = [
    '/images/life-insurance-client-testimonials.png',
    '/images/life-insurance-consultation-meeting.png',
    '/images/life-insurance-quote-calculator.png',
    '/images/family-protection-life-insurance.png',
    '/images/final-expense-insurance-coverage.png',
    '/images/free-life-insurance-quote-process.png',
    '/images/family-protection-life-insurance-2.png',
    '/images/licensed-life-insurance-agent-office.png'
  ];
  
  // Return a random image from the array
  const randomIndex = Math.floor(Math.random() * staticImages.length);
  return staticImages[randomIndex];
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
- Add a strong conclusion with a clear call to action that links to homepage
- Use proper HTML tags: <h1>, <h2>, <h3>, <p>, <ul>, <li>, <strong>, <em>
- IMPORTANT: Include image placeholder comments <!-- IMAGE_PLACEHOLDER_1 -->, <!-- IMAGE_PLACEHOLDER_2 -->, etc. after the introduction and between at least 2 major H2 sections for image insertion

SEO Requirements:
- Naturally include LSI keywords throughout: life insurance quotes, insurance coverage, death benefit, beneficiaries, policy premiums, insurance companies, financial protection, family security, insurance agent, policy terms, coverage amount, insurance rates, life insurance policy, insurance plans, permanent life insurance, term life coverage
- CRITICAL: Add 2-3 strategic internal links using these exact patterns:
  * In the first 200 words: <a href="/">get a free life insurance quote</a>
  * In a service mention: <a href="/">speak with our licensed insurance experts</a> 
  * In conclusion: <a href="/">compare life insurance rates and get your personalized quote today</a>
- Place internal links naturally within content, not just at the end
- Include a strong call-to-action in the conclusion with phone number: Call 866-595-7540

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
  
  // Get static images for the article
  const staticImages = [
    getStaticImage(),
    getStaticImage()
  ];
  
  let articleWithImages = article;
  let imagesInserted = 0;
  
  // Insert static images strategically
  for (let i = 0; i < staticImages.length; i++) {
    const imageUrl = staticImages[i];
    const imageHtml = `<div class="blog-image">
      <img src="${imageUrl}" alt="${keyword} life insurance guide and coverage options" class="w-full h-auto rounded-lg shadow-md my-6" />
    </div>`;
    
    // Replace placeholder or insert at strategic positions
    const placeholder = `<!-- IMAGE_PLACEHOLDER_${i + 1} -->`;
    if (articleWithImages.includes(placeholder)) {
      articleWithImages = articleWithImages.replace(placeholder, imageHtml);
    } else {
      // Insert images at strategic positions - after intro and between sections
      if (imagesInserted === 0) {
        // Insert first image after the first paragraph
        const firstParagraphEnd = articleWithImages.indexOf('</p>');
        if (firstParagraphEnd !== -1) {
          articleWithImages = articleWithImages.slice(0, firstParagraphEnd + 4) + '\n\n' + imageHtml + '\n\n' + articleWithImages.slice(firstParagraphEnd + 4);
        }
      } else {
        // Insert subsequent images between H2 sections
        const sections = articleWithImages.split('<h2>');
        const targetSection = Math.min(imagesInserted + 1, sections.length - 1);
        if (sections.length > targetSection) {
          sections[targetSection] = imageHtml + '\n\n<h2>' + sections[targetSection];
          articleWithImages = sections.join('<h2>');
        }
      }
    }
    imagesInserted++;
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

const readCSVAndGetTitle = async (dayOfYear: number): Promise<string | null> => {
  try {
    // Read the CSV file from the public directory
    const csvUrl = `${Deno.env.get('SUPABASE_URL')}/storage/v1/object/public/blog-titles/life_insurance_blog_titles.csv`;
    let response = await fetch(csvUrl);
    
    // If storage fails, try to read from a hardcoded CSV data
    if (!response.ok) {
      console.log('Storage CSV not available, using fallback CSV data');
      // Fallback titles cycling every 10 days
      const fallbackTitles = [
        "What Is Life Insurance? Complete Beginner's Guide",
        "Term vs Whole Life Insurance: Which Policy Is Best for You?",
        "How Much Does Life Insurance Really Cost in 2025?",
        "Life Insurance for New Parents: Protecting Your Family",
        "Best Life Insurance Options for Seniors Over 60",
        "How to File a Life Insurance Claim Step-by-Step",
        "Using Life Insurance in Your Retirement Strategy",
        "Best Cheap Life Insurance Plans Compared",
        "The Future of Life Insurance: 2025 Market Outlook",
        "How to Choose the Right Life Insurance Policy in 2025"
      ];
      
      const titleIndex = (dayOfYear - 1) % fallbackTitles.length;
      return fallbackTitles[titleIndex];
    }
    
    const csvText = await response.text();
    const lines = csvText.split('\n');
    
    // Skip header and get the line for the day
    if (lines.length > dayOfYear) {
      const line = lines[dayOfYear]; // dayOfYear corresponds to line number (1-based indexing)
      const parts = line.split(',');
      if (parts.length >= 2) {
        return parts[1].trim();
      }
    }
    
    // Fallback if no matching line found
    const fallbackTitles = [
      "What Is Life Insurance? Complete Beginner's Guide",
      "Term vs Whole Life Insurance: Which Policy Is Best for You?",
      "How Much Does Life Insurance Really Cost in 2025?",
      "Life Insurance for New Parents: Protecting Your Family",
      "Best Life Insurance Options for Seniors Over 60",
      "How to File a Life Insurance Claim Step-by-Step",
      "Using Life Insurance in Your Retirement Strategy",
      "Best Cheap Life Insurance Plans Compared",
      "The Future of Life Insurance: 2025 Market Outlook",
      "How to Choose the Right Life Insurance Policy in 2025"
    ];
    
    const titleIndex = (dayOfYear - 1) % fallbackTitles.length;
    return fallbackTitles[titleIndex];
  } catch (error) {
    console.error('Error reading CSV file:', error);
    
    // Ultimate fallback
    const fallbackTitles = [
      "What Is Life Insurance? Complete Beginner's Guide",
      "Term vs Whole Life Insurance: Which Policy Is Best for You?",
      "How Much Does Life Insurance Really Cost in 2025?",
      "Life Insurance for New Parents: Protecting Your Family",
      "Best Life Insurance Options for Seniors Over 60",
      "How to File a Life Insurance Claim Step-by-Step",
      "Using Life Insurance in Your Retirement Strategy",
      "Best Cheap Life Insurance Plans Compared",
      "The Future of Life Insurance: 2025 Market Outlook",
      "How to Choose the Right Life Insurance Policy in 2025"
    ];
    
    const titleIndex = (dayOfYear - 1) % fallbackTitles.length;
    return fallbackTitles[titleIndex];
  }
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    console.log('Starting scheduled blog post generation...');
    
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openaiApiKey) {
      return new Response(
        JSON.stringify({ error: 'OpenAI API key not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    );

    // Calculate day of year (1-365)
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const dayOfYear = Math.floor((now.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    
    console.log(`Day of year: ${dayOfYear}`);
    
    // Get the blog title for today
    const blogTitle = await readCSVAndGetTitle(dayOfYear);
    
    if (!blogTitle) {
      return new Response(
        JSON.stringify({ error: 'Could not get blog title for today' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Today's blog title: ${blogTitle}`);

    // Check if we already have a blog post for today
    const { data: existingPosts, error: checkError } = await supabaseClient
      .from('blog_posts')
      .select('id')
      .eq('title', blogTitle)
      .gte('created_at', new Date().toISOString().split('T')[0]); // Today's date

    if (checkError) {
      console.error('Error checking existing posts:', checkError);
    }

    if (existingPosts && existingPosts.length > 0) {
      console.log('Blog post already exists for today');
      return new Response(
        JSON.stringify({ message: 'Blog post already exists for today', title: blogTitle }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Search for content
    const searchResults = await queryDuckDuckGo(blogTitle);
    
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
      generateArticle(blogTitle, summaries, openaiApiKey),
      generateTitles(blogTitle, openaiApiKey)
    ]);

    // Save to database and auto-publish
    const { data: blogPost, error } = await supabaseClient
      .from('blog_posts')
      .insert({
        keyword: blogTitle,
        title: blogTitle,
        content: article,
        suggested_titles: titles,
        status: 'published',
        word_count: article.replace(/<[^>]*>/g, '').split(' ').length,
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

    console.log(`Blog post created successfully: ${blogPost.id}`);

    return new Response(
      JSON.stringify({
        success: true,
        dayOfYear,
        title: blogTitle,
        wordCount: article.split(' ').length,
        blogPostId: blogPost.id,
        message: `Automated blog post created for day ${dayOfYear}`
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});