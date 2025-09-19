-- Allow public read access to published blog posts
CREATE POLICY "Public users can view published blog posts" 
ON public.blog_posts 
FOR SELECT 
TO public
USING (status = 'published');