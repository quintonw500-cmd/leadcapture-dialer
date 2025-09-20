-- Clean up duplicate images and ensure only 2 different images per post
UPDATE blog_posts 
SET content = REGEXP_REPLACE(
  content,
  '(<div class="blog-image">.*?</div>\s*){3,}',
  '\1',
  'g'
)
WHERE status = 'published';

-- Fix the second blog post to have proper internal links
UPDATE blog_posts 
SET content = REGEXP_REPLACE(
  content,
  'Life insurance is one of the most important financial decisions you''ll ever make, yet many people find it confusing and overwhelming\.',
  'Life insurance is one of the most important financial decisions you''ll ever make, yet many people find it confusing and overwhelming. To help you get started, <a href="/">get a free life insurance quote</a> and see how affordable protection can be for your family.',
  'g'
)
WHERE title LIKE 'What Is Life Insurance%';

-- Add conclusion CTA to second blog post if it doesn't exist
UPDATE blog_posts 
SET content = content || '

<p>Don''t wait to protect your family''s financial future. <a href="/">Compare life insurance rates and get your personalized quote today</a> or call 866-595-7540 to speak with a licensed professional who can help you choose the right coverage.</p>'
WHERE title LIKE 'What Is Life Insurance%' 
AND content NOT LIKE '%Compare life insurance rates and get your personalized quote today%';