import Header from "../components/Header";
import Footer from "../components/Footer";
import QuoteForm from "../components/QuoteForm";

const Quote = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-16">
        <QuoteForm />
      </main>
      <Footer />
    </div>
  );
};

export default Quote;