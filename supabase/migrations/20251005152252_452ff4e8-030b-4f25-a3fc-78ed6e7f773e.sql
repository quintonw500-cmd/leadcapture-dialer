-- Create a table to store quote requests
CREATE TABLE public.quote_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  coverage TEXT NOT NULL,
  tobacco TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  status TEXT NOT NULL DEFAULT 'new'
);

-- Enable Row Level Security
ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;

-- Create policy for admins to view all quote requests
CREATE POLICY "Admins can view all quote requests"
ON public.quote_requests
FOR SELECT
USING (has_role(auth.uid(), 'admin'));

-- Create policy to allow anonymous users to insert their quote requests
CREATE POLICY "Anyone can submit quote requests"
ON public.quote_requests
FOR INSERT
WITH CHECK (true);

-- Create index for faster queries
CREATE INDEX idx_quote_requests_created_at ON public.quote_requests(created_at DESC);