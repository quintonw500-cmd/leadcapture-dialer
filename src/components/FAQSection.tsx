import { Phone } from "lucide-react";

const FAQSection = () => {
  const phoneNumber = "866-595-7540";

  const faqs = [
    {
      question: "How much life insurance do I need?",
      answer: "Most experts recommend 10-12 times your annual income in life insurance coverage. Our licensed agents help calculate your exact needs based on your family situation, debts, and financial goals."
    },
    {
      question: "What's the difference between term and whole life insurance?",
      answer: "Term life provides temporary coverage for a specific period (10-30 years) at lower premiums. Whole life provides permanent coverage with cash value accumulation but higher premiums."
    },
    {
      question: "How fast can I get life insurance coverage?",
      answer: "Many healthy applicants can get approved within 24-48 hours with simplified issue policies. Full underwriting typically takes 2-6 weeks depending on the carrier and coverage amount."
    },
    {
      question: "Do I need a medical exam for life insurance?",
      answer: "Not always! We offer no-exam life insurance policies for qualifying applicants. These simplified issue policies can provide coverage up to certain limits without medical exams or lengthy health questionnaires."
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
            Get answers to common life insurance questions from our licensed professionals
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
              Still Have Questions?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Speak with a licensed agent for personalized advice
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