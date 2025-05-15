import Hero from "../components/Hero";
import CallToAction from "../section/CallToAction";
import ChefsSection from "../section/ChefsSection";
import CustomerReviews from "../section/CustomerReveiws";
import SignatureItems from "../section/SignatureItems";
import WhyChooseUs from "../section/WhyChooseUs";

const Home = () => {
  return (
    <>
      <Hero />
      <SignatureItems />
      <CallToAction />
      {/* <CustomerReviews /> */}
      <ChefsSection />
      <WhyChooseUs />
    </>
  );
};

export default Home;