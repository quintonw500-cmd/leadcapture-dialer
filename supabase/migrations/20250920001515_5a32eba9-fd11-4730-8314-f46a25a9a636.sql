-- Update existing blog posts to replace placeholder SVGs with static image references
UPDATE blog_posts 
SET content = replace(
  replace(
    content,
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjhmOWZhIiBzdHJva2U9IiNlNWU3ZWIiIHN0cm9rZS13aWR0aD0iMiIvPgogIDx0ZXh0IHg9IjUwJSIgeT0iNDAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiM2Mzc0OGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPiR7a2V5d29yZH08L3RleHQ+CiAgPHRleHQgeD0iNTAlIiB5PSI2MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk3YTNiNCIgdGV4dC1hbmNob3I9Im1pZGRsZSI+TGlmZSBJbnN1cmFuY2UgR3VpZGU8L3RleHQ+Cjwvc3ZnPg==',
    'https://pkekpnescchcguienvmy.supabase.co/storage/v1/object/public/blog-titles/life-insurance-consultation-meeting.png'
  ),
  'fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"></path></svg>',
  'https://pkekpnescchcguienvmy.supabase.co/storage/v1/object/public/blog-titles/family-protection-life-insurance.png'
)
WHERE content LIKE '%data:image/svg+xml%' OR content LIKE '%currentColor%';