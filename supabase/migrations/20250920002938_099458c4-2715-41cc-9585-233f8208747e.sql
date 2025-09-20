-- Update all existing blog posts to replace SVG placeholders with proper static images
UPDATE blog_posts 
SET content = REPLACE(
  REPLACE(
    REPLACE(content, 
      'src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzMzNzM4NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkxpZmUgSW5zdXJhbmNlIENvbXBhcmlzb248L3RleHQ+Cjwvc3ZnPg=="',
      'src="/images/family-protection-life-insurance.png"'
    ),
    'alt="Life Insurance Comparison illustration"',
    'alt="Life insurance comparison and coverage options"'
  ),
  'alt="Generated life insurance image"',
  'alt="Life insurance guide and coverage information"'
)
WHERE status = 'published' AND content LIKE '%data:image/svg+xml%';

-- Also add more images to existing posts that only have one image
UPDATE blog_posts 
SET content = REPLACE(content, 
  '</ul>',
  '</ul>

<div class="blog-image">
  <img src="/images/life-insurance-consultation-meeting.png" alt="Life insurance consultation and expert guidance" class="w-full h-auto rounded-lg shadow-md my-6" />
</div>'
)
WHERE status = 'published' AND 
  (content LIKE '%</ul>%' AND content NOT LIKE '%consultation-meeting%') 
  AND LENGTH(content) - LENGTH(REPLACE(content, 'blog-image', '')) < 20;  -- Only posts with one image