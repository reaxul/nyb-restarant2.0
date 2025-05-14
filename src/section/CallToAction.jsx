const CallToAction = () => {
  return (
    <section className="bg-black text-white py-16 px-6 text-center">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-extrabold tracking-tight mb-4">
          Ready to Taste the Difference?
        </h2>
        <p className="text-gray-400 text-lg mb-8">
          Reserve your table or give us a call to enjoy an unforgettable dining
          experience.
        </p>
        <a
          href="tel:+8801795328824"
          className="inline-flex items-center gap-2 bg-white text-black font-medium px-8 py-3 rounded-full hover:bg-gray-100 transition-all duration-300"
        >
          📞 Call Now
        </a>
      </div>
    </section>
  );
};

export default CallToAction;
