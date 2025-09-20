-- Fix the "What Is Life Insurance" blog post - add internal links 
UPDATE blog_posts 
SET content = REGEXP_REPLACE(
  REGEXP_REPLACE(
    REGEXP_REPLACE(
      content,
      'Life insurance is one of the most important financial decisions you''ll ever make, yet many people find it confusing and overwhelming\.',
      'Life insurance is one of the most important financial decisions you''ll ever make, yet many people find it confusing and overwhelming. To help you get started, <a href="/">get a free life insurance quote</a> and see how affordable protection can be for your family.',
      'g'
    ),
    'consulting with a financial advisor or insurance agent',
    'consulting with <a href="/">our licensed insurance experts</a>',
    'g'
  ),
  '</p>$',
  '</p>

<p>Don''t wait to protect your family''s financial future. <a href="/">Compare life insurance rates and get your personalized quote today</a> or call 866-595-7540 to speak with a licensed professional who can help you choose the right coverage.</p>',
  'g'
)
WHERE title LIKE 'What Is Life Insurance%';

-- Remove extra images to ensure only 2 per post
UPDATE blog_posts 
SET content = REGEXP_REPLACE(
  content,
  '(<div class="blog-image">.*?</div>\s*<div class="blog-image">.*?</div>)\s*(<div class="blog-image">.*?</div>)+',
  '\1',
  'g'
)
WHERE status = 'published';