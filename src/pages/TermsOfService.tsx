import Header from "../components/Header";
import Footer from "../components/Footer";

const TermsOfService = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold text-primary-dark mb-8">Terms of Service</h1>
          <p className="text-sm text-muted-foreground mb-8">
            <strong>Last Updated:</strong> January 1, 2025
          </p>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-primary-dark mb-4">Services</h2>
              <p className="text-muted-foreground mb-4">
                We are licensed insurance agents providing life insurance quotes, policy 
                placement services, and insurance consultation. We work with multiple 
                insurance carriers to find suitable coverage options for our clients.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-primary-dark mb-4">Important Disclaimers</h2>
              <ul className="text-muted-foreground space-y-2">
                <li>• Coverage determinations and approvals are made solely by insurance carriers</li>
                <li>• This website and its content do not constitute insurance advice</li>
                <li>• We are licensed in all states where services are provided</li>
                <li>• Rates and availability are subject to carrier underwriting and approval</li>
                <li>• Past results do not guarantee future outcomes</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-primary-dark mb-4">User Responsibilities</h2>
              <p className="text-muted-foreground mb-4">
                Users agree to provide accurate and complete information when requesting 
                quotes or services. Misrepresentation of information may void coverage 
                or result in claim denials.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-primary-dark mb-4">Limitation of Liability</h2>
              <p className="text-muted-foreground mb-4">
                Our liability is limited to the services we directly provide. We are not 
                responsible for carrier decisions, policy terms, or claim determinations 
                made by insurance companies.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-primary-dark mb-4">Licensing Information</h2>
              <p className="text-muted-foreground mb-4">
                We maintain proper licensing in all states where we conduct business. 
                License information is available upon request and through state 
                insurance department websites.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-primary-dark mb-4">Contact Information</h2>
              <p className="text-muted-foreground mb-4">
                Questions about these terms or our services:
              </p>
              <p className="text-muted-foreground">
                Phone: <a href="tel:866-595-7540" className="text-primary hover:underline">866-595-7540</a><br />
                Email: support@uslifehelp.com
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfService;