-- Fix the Term vs Whole Life blog post - add internal links and limit to 2 different images
UPDATE blog_posts 
SET content = REGEXP_REPLACE(
  REGEXP_REPLACE(
    REGEXP_REPLACE(
      REGEXP_REPLACE(
        content,
        'Choosing between term and whole life insurance is one of the most important decisions you''ll make when shopping for life insurance coverage\.',
        'Choosing between term and whole life insurance is one of the most important decisions you''ll make when shopping for life insurance coverage. Before diving into the details, you can <a href="/">get a free life insurance quote</a> to see current rates for your situation.',
        'g'
      ),
      'The choice between term and whole life insurance depends on your specific financial situation, goals, and needs:',
      'The choice between term and whole life insurance depends on your specific financial situation, goals, and needs. Our licensed professionals can help you navigate these options - <a href="/">speak with our licensed insurance experts</a> for personalized guidance:',
      'g'
    ),
    'Most financial experts recommend starting with term life insurance',
    'Most financial experts recommend starting with term life insurance. Ready to secure your family''s future? <a href="/">Compare life insurance rates and get your personalized quote today</a> or call 866-595-7540 to speak with a licensed agent. Most financial experts recommend starting with term life insurance',
    'g'
  ),
  '(<div class="blog-image">.*?consultation-meeting.*?</div>)',
  '<div class="blog-image">
  <img src="/images/licensed-life-insurance-agent-office.png" alt="Licensed life insurance agent providing expert consultation" class="w-full h-auto rounded-lg shadow-md my-6" />
</div>',
  'g'
)
WHERE title = 'Term vs Whole Life Insurance: Which Policy Is Best for You?';