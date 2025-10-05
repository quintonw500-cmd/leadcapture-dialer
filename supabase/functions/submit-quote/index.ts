import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.4";
import { Resend } from "npm:resend@4.0.0";
import { encode } from "https://deno.land/std@0.190.0/encoding/base64.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface QuoteRequest {
  firstName: string;
  lastName: string;
  phone: string;
  dateOfBirth: string;
  coverage: string;
  tobacco: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { firstName, lastName, phone, dateOfBirth, coverage, tobacco }: QuoteRequest = await req.json();

    console.log("Received quote request:", { firstName, lastName, phone, dateOfBirth, coverage, tobacco });

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Save to database
    const { data: quoteData, error: dbError } = await supabase
      .from("quote_requests")
      .insert({
        first_name: firstName,
        last_name: lastName,
        phone: phone,
        date_of_birth: dateOfBirth,
        coverage: coverage,
        tobacco: tobacco,
      })
      .select()
      .single();

    if (dbError) {
      console.error("Database error:", dbError);
      throw new Error(`Failed to save quote: ${dbError.message}`);
    }

    console.log("Quote saved to database:", quoteData);

    // Send email notification
    const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

    const emailHtml = `
      <h2>New Life Insurance Quote Request</h2>
      <p><strong>Name:</strong> ${firstName} ${lastName}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Date of Birth:</strong> ${dateOfBirth}</p>
      <p><strong>Coverage Amount:</strong> $${coverage}</p>
      <p><strong>Tobacco Use:</strong> ${tobacco === 'yes' ? 'Yes' : 'No'}</p>
      <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
      <hr>
      <p style="color: #666; font-size: 12px;">Quote ID: ${quoteData.id}</p>
    `;

    const emailResponse = await resend.emails.send({
      from: "Life Insure Help <onboarding@resend.dev>",
      to: ["quintonw500@gmail.com"],
      subject: `New Quote Request - ${firstName} ${lastName}`,
      html: emailHtml,
    });

    console.log("Email sent successfully:", emailResponse);

    // Send SMS notification via Twilio
    const twilioAccountSid = Deno.env.get("TWILIO_ACCOUNT_SID");
    const twilioAuthToken = Deno.env.get("TWILIO_AUTH_TOKEN");
    const twilioPhoneNumber = Deno.env.get("TWILIO_PHONE_NUMBER");
    
    if (twilioAccountSid && twilioAuthToken && twilioPhoneNumber) {
      try {
        const smsMessage = `New quote request from ${firstName} ${lastName}. Phone: ${phone}, Coverage: $${coverage}`;
        
        const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${twilioAccountSid}/Messages.json`;
        const credentials = encode(`${twilioAccountSid}:${twilioAuthToken}`);
        
        const smsResponse = await fetch(twilioUrl, {
          method: "POST",
          headers: {
            "Authorization": `Basic ${credentials}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            To: "+18107061575",
            From: twilioPhoneNumber,
            Body: smsMessage,
          }),
        });

        if (smsResponse.ok) {
          console.log("SMS sent successfully");
        } else {
          const errorText = await smsResponse.text();
          console.error("Failed to send SMS:", errorText);
        }
      } catch (smsError) {
        console.error("Error sending SMS:", smsError);
        // Don't throw - we still want to return success even if SMS fails
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        quoteId: quoteData.id,
        message: "Quote submitted successfully" 
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in submit-quote function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
