-- Update the user's role to admin so they can create blogs
UPDATE profiles 
SET role = 'admin'::app_role 
WHERE email = 'cpodea5@gmail.com';