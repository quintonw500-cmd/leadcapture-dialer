import Header from "../components/Header";
import Footer from "../components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold text-primary-dark mb-8">Privacy Policy</h1>
          <p className="text-sm text-muted-foreground mb-8">
            <strong>Last Updated:</strong> January 1, 2025
          </p>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-primary-dark mb-4">Information We Collect</h2>
              <p className="text-muted-foreground mb-4">
                We collect personal information you provide including name, email, phone number, 
                and insurance application details when you request quotes or services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-primary-dark mb-4">How We Use Information</h2>
              <ul className="text-muted-foreground space-y-2">
                <li>• To provide insurance quotes and services</li>
                <li>• To contact you about your insurance needs</li>
                <li>• To comply with legal and regulatory requirements</li>
                <li>• To improve our services and website functionality</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-primary-dark mb-4">Information Sharing</h2>
              <p className="text-muted-foreground mb-4">
                We may share your information with insurance carriers for quote purposes, 
                regulatory bodies as required by law, and service providers who assist in 
                our operations under strict confidentiality agreements.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-primary-dark mb-4">Contact Us</h2>
              <p className="text-muted-foreground mb-4">
                For privacy questions or concerns, contact us at:
              </p>
              <p className="text-muted-foreground">
                Phone: <a href="tel:866-595-7540" className="text-primary hover:underline">866-595-7540</a><br />
                Email: privacy@uslifehelp.com
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-primary-dark mb-4">CCPA Rights (California Residents)</h2>
              <p className="text-muted-foreground mb-4">
                California residents have the right to know what personal information we collect, 
                delete personal information, and opt-out of the sale of personal information. 
                To exercise these rights, please contact us using the information above.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-primary-dark mb-4">Data Security</h2>
              <p className="text-muted-foreground mb-4">
                We implement appropriate security measures to protect your personal information 
                against unauthorized access, alteration, disclosure, or destruction.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;