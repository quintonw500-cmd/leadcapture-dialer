-- Enable pg_cron extension for scheduling
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Enable pg_net extension for HTTP requests
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Schedule daily blog post generation at 9 AM UTC
SELECT cron.schedule(
  'daily-blog-post-generation',
  '0 9 * * *', -- Daily at 9 AM UTC
  $$
  SELECT
    net.http_post(
        url:='https://pkekpnescchcguienvmy.supabase.co/functions/v1/scheduled-blog-post',
        headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBrZWtwbmVzY2NoY2d1aWVudm15Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgzMDk5MzIsImV4cCI6MjA3Mzg4NTkzMn0.WGdQ2UkhqfryDQKKmtaxcd4isL8AYhgStvBylRVJyps"}'::jsonb,
        body:='{"trigger": "cron"}'::jsonb
    ) as request_id;
  $$
);