-- Grant admin role to the first user (Quinton Williams)
UPDATE profiles 
SET role = 'admin'::app_role 
WHERE email = 'quintonw500@gmail.com';