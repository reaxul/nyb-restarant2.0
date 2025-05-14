const CustomerReviews = () => {
    const reviews = [
      {
        name: "Ayesha K.",
        comment: "Absolutely loved the biryani! The spices were perfect and the service was amazing.",
        rating: 5,
      },
      {
        name: "Daniel M.",
        comment: "A hidden gem. Cozy atmosphere and the food tastes truly authentic!",
        rating: 4,
      },
      {
        name: "Priya R.",
        comment: "Quick delivery and everything was still hot and fresh. Highly recommend!",
        rating: 5,
      },
    ];
  
    return (
      <section className="py-12 px-6 bg-white dark:bg-gray-900">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">
            What Our Customers Say
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="bg-surface dark:bg-gray-800 rounded-lg p-6 shadow text-left"
              >
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center font-bold text-primary">
                    {review.name.charAt(0)}
                  </div>
                  <span className="ml-3 font-semibold text-gray-900 dark:text-white">
                    {review.name}
                  </span>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                  "{review.comment}"
                </p>
                <div className="text-yellow-500 flex space-x-1">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.172c.969 0 1.371 1.24.588 1.81l-3.378 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118l-3.378-2.455a1 1 0 00-1.176 0l-3.378 2.455c-.784.57-1.838-.197-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.04 9.394c-.783-.57-.38-1.81.588-1.81h4.172a1 1 0 00.95-.69l1.286-3.967z" />
                    </svg>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default CustomerReviews;
  