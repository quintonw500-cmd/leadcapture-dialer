-- Update remaining blog posts with any SVG placeholders
UPDATE blog_posts 
SET content = REGEXP_REPLACE(
  content, 
  'src="data:image/svg\+xml[^"]*"', 
  'src="/images/life-insurance-quote-calculator.png"', 
  'g'
)
WHERE status = 'published' AND content LIKE '%data:image/svg+xml%';

-- Ensure all published posts have at least 2 images by adding a second image after H2 sections
UPDATE blog_posts 
SET content = REGEXP_REPLACE(
  content,
  '(<h2[^>]*>[^<]*</h2>\s*<p[^>]*>[^<]*</p>)',
  '\1

<div class="blog-image">
  <img src="/images/life-insurance-client-testimonials.png" alt="Life insurance client testimonials and success stories" class="w-full h-auto rounded-lg shadow-md my-6" />
</div>',
  ''
)
WHERE status = 'published' 
AND LENGTH(content) - LENGTH(REPLACE(content, 'blog-image', '')) < 40;  -- Posts with less than 2 images