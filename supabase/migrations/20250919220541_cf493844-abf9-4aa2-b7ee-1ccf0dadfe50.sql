-- Enable pg_cron and pg_net extensions for scheduled functions
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Schedule the blog posting function to run daily at 9:00 AM
SELECT cron.schedule(
  'daily-blog-post',
  '0 9 * * *', -- Run at 9:00 AM every day
  $$
  SELECT
    net.http_post(
        url:='https://pkekpnescchcguienvmy.supabase.co/functions/v1/scheduled-blog-post',
        headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBrZWtwbmVzY2NoY2d1aWVudm15Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgzMDk5MzIsImV4cCI6MjA3Mzg4NTkzMn0.WGdQ2UkhqfryDQKKmtaxcd4isL8AYhgStvBylRVJyps"}'::jsonb,
        body:=concat('{"scheduled_time": "', now(), '"}')::jsonb
    ) AS request_id;
  $$
);

-- Create storage bucket for blog assets
INSERT INTO storage.buckets (id, name, public) VALUES ('blog-titles', 'blog-titles', true)
ON CONFLICT (id) DO NOTHING;

-- Create policy for public read access to blog titles bucket
CREATE POLICY "Allow public read access to blog titles" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'blog-titles');