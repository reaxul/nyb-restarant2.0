const Contact = () => {
  return (
   <section className="  text-white py-16">
          <div className="container px-4">
            <h2 className="text-4xl font-bold text-center mb-10">Contact Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <h3 className="text-2xl font-semibold mb-6">Get in Touch</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full p-3 bg-gray-950 text-white border border-gray-600 rounded-md focus:outline-none focus:border-gray-400"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full p-3 bg-gray-950 text-white border border-gray-600 rounded-md focus:outline-none focus:border-gray-400"
                  />
                  <textarea
                    placeholder="Your Message"
                    rows="5"
                    className="w-full p-3 bg-gray-950 text-white border border-gray-600 rounded-md focus:outline-none focus:border-gray-400"
                  ></textarea>
                  <button className="w-full p-3 bg-white text-black font-semibold rounded-md hover:bg-gray-200 tracking-wide">
                    Send Message
                  </button>
                </div>
              </div>
              {/* Contact Details */}
              <div className="flex flex-col justify-center">
                <h3 className="text-2xl font-semibold mb-6">Our Details</h3>
                <p className="text-gray-400 mb-4">
                  We’d love to hear from you! Reach out with any questions or reservations.
                </p>
                <p className="text-gray-300 mb-2">
                  <span className="font-medium">Address:</span> 123 Flavor Street, Dhaka, Bangladesh
                </p>
                <p className="text-gray-300 mb-2">
                    <span className="font-medium">Phone:</span> +8801717171717
                </p>
                <p className="text-gray-300">
                  <span className="font-medium">Email:</span> info@nyb.com
                </p>
              </div>
            </div>
          </div>
        </section>
  );
};

export default Contact;
