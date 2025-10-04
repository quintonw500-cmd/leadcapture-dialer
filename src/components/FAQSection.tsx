import { Phone } from "lucide-react";

const FAQSection = () => {
  const phoneNumber = "866-595-7540";

  const faqs = [
    {
      question: "How can I review my current life insurance policy?",
      answer: "Our licensed agents can perform a comprehensive policy review at no cost. We'll analyze your current coverage, premiums, and benefits to ensure your policy still meets your needs and that you're not overpaying."
    },
    {
      question: "What if I'm having trouble with a claim or billing issue?",
      answer: "We provide dedicated support for policy claims and billing questions. Our licensed professionals can advocate on your behalf with carriers and help resolve coverage, payment, or benefit claim issues."
    },
    {
      question: "Can I upgrade or modify my existing policy?",
      answer: "Yes! Many policies can be modified or upgraded. We can review your options including increasing coverage, converting term to permanent insurance, or finding better rates. Many upgrades don't require medical exams."
    },
    {
      question: "How do I know if I'm overpaying for my current policy?",
      answer: "Policy rates vary significantly by carrier and change over time. We offer free policy reviews to compare your current premiums against current market rates and identify potential savings opportunities."
    }
  ];

  return (
    <section className="py-20 bg-accent/10" id="faq">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary-dark mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get answers to common policy questions from our licensed professionals
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid gap-8">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-card rounded-lg p-6 shadow-md"
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
              >
                <h3
                  className="text-xl font-semibold text-primary-dark mb-4"
                  itemProp="name"
                >
                  {faq.question}
                </h3>
                <div
                  itemScope
                  itemProp="acceptedAnswer"
                  itemType="https://schema.org/Answer"
                >
                  <p
                    className="text-muted-foreground leading-relaxed"
                    itemProp="text"
                  >
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 p-8 bg-primary-dark rounded-lg text-white">
            <h3 className="text-2xl font-bold mb-4">
              Need Help With Your Policy?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Speak with a licensed agent for policy support and reviews
            </p>
            <a
              href={`tel:${phoneNumber}`}
              className="inline-flex items-center space-x-3 bg-white text-primary-dark px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
            >
              <Phone className="w-5 h-5" />
              <span>Call {phoneNumber} Now</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;