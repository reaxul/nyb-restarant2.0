const WhyChooseUs = () => {
    return (
      <section className="bg-primary/5 dark:bg-gray-900 py-10 px-6 text-center">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          Why Choose Smart Dine?
        </h2>
        <div className="flex flex-col md:flex-row justify-center gap-6">
          {["Fresh Ingredients", "Authentic Recipes", "Great Atmosphere"].map(
            (item, i) => (
              <div
                key={i}
                className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow text-gray-800 dark:text-gray-100"
              >
                <h3 className="text-lg font-semibold">{item}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                  We ensure the best experience with every meal.
                </p>
              </div>
            )
          )}
        </div>
      </section>
    );
  };
  
export default WhyChooseUs;
