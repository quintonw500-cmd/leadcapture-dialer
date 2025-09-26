-- First drop any existing cron jobs
SELECT cron.unschedule('daily-blog-post-generation');

-- Recreate the daily blog post generation schedule with proper function calls
SELECT cron.schedule(
  'daily-blog-post-generation',
  '0 9 * * *', -- Daily at 9 AM UTC
  $$
  SELECT
    net.http_post(
        url:='https://pkekpnescchcguienvmy.supabase.co/functions/v1/scheduled-blog-post',
        headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBrZWtwbmVzY2NoZ3VpZW52bXkiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTc1ODMwOTkzMiwiZXhwIjoyMDczODg1OTMyfQ.WGdQ2UkhqfryDQKKmtaxcd4isL8AYhgStvBylRVJyps"}'::jsonb,
        body:='{"trigger": "cron"}'::jsonb
    ) as request_id;
  $$
);