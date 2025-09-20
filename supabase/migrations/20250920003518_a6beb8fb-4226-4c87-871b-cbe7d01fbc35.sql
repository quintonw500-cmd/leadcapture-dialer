-- Add internal links and fix images in existing blog posts
UPDATE blog_posts 
SET content = REPLACE(
  REPLACE(
    REPLACE(
      REPLACE(
        REPLACE(
          -- Remove extra images first
          REGEXP_REPLACE(content, '(<div class="blog-image">.*?</div>\s*){3,}', '\1\2', 'g'),
          -- Add internal link in first paragraph  
          'Choosing between term and whole life insurance is one of the most important decisions you''ll make when shopping for life insurance coverage.',
          'Choosing between term and whole life insurance is one of the most important decisions you''ll make when shopping for life insurance coverage. Before diving into the details, you can <a href="/">get a free life insurance quote</a> to see current rates for your situation.'
        ),
        -- Add service link in middle section
        'The choice between term and whole life insurance depends on your specific financial situation, goals, and needs:',
        'The choice between term and whole life insurance depends on your specific financial situation, goals, and needs. Our licensed professionals can help you navigate these options - <a href="/">speak with our licensed insurance experts</a> for personalized guidance.'
      ),
      -- Add conclusion CTA
      'Most financial experts recommend starting with term life insurance, especially for young families with tight budgets and high insurance needs.',
      'Most financial experts recommend starting with term life insurance, especially for young families with tight budgets and high insurance needs. Ready to secure your family''s future? <a href="/">Compare life insurance rates and get your personalized quote today</a> or call 866-595-7540 to speak with a licensed agent.'
    ),
    -- Replace duplicate images with different ones
    'src="/images/life-insurance-consultation-meeting.png" alt="Life insurance consultation and expert guidance"',
    'src="/images/life-insurance-quote-calculator.png" alt="Life insurance quote calculator and coverage planning"'
  ),
  -- Clean up extra image divs
  REGEXP_REPLACE(content, '(<div class="blog-image">.*?</div>\s*<div class="blog-image">.*?</div>)(\s*<div class="blog-image">.*?</div>)+', '\1', 'g')
)
WHERE title = 'Term vs Whole Life Insurance: Which Policy Is Best for You?';

-- Update the second blog post
UPDATE blog_posts 
SET content = REPLACE(
  REPLACE(
    REPLACE(
      REPLACE(
        content,
        -- Add internal link in introduction
        'Life insurance is one of the most important financial decisions you''ll ever make, yet many people find it confusing and overwhelming.',
        'Life insurance is one of the most important financial decisions you''ll ever make, yet many people find it confusing and overwhelming. To help you get started, <a href="/">get a free life insurance quote</a> and see how affordable protection can be for your family.'
      ),
      -- Replace SVG with proper image  
      'src="/images/life-insurance-quote-calculator.png"',
      'src="/images/family-protection-life-insurance-2.png"'
    ),
    -- Add service mention link (assuming there's content about working with professionals)
    'speaking with a qualified insurance professional',
    '<a href="/">speak with our licensed insurance experts</a>'
  ),
  -- Add conclusion CTA (need to add at the end)
  '</p>',
  '</p>

<p>Don''t wait to protect your family''s financial future. <a href="/">Compare life insurance rates and get your personalized quote today</a> or call 866-595-7540 to speak with a licensed professional who can help you choose the right coverage.</p>'
) 
WHERE title LIKE 'What Is Life Insurance%';