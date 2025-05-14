const Info = () => {
  return (
    <section className=" py-12">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-200 mb-6">
          About NYB Restaurant
        </h2>
        <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
          Welcome to NYB Restaurant, where culinary excellence meets warm
          hospitality. Located in the heart of the city, we offer a diverse menu
          featuring delicious food, refreshing drinks, and delightful desserts.
          Join us for an unforgettable dining experience!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="border border-white/15 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-200 mb-2">
              Contact Us
            </h3>
            <p className="text-gray-400">Phone: +8801717171717</p>
            <p className="text-gray-400">Email: info@nyb.com</p>
          </div>
          <div className="border border-white/15 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-200 mb-2">
              Operating Hours
            </h3>
            <p className="text-gray-400">Mon-Fri: 8AM - 12PM</p>
            <p className="text-gray-400">Sat-Sun: 8AM - 12PM</p>
          </div>
          <div className="border border-white/15 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-200 mb-2">
              Location
            </h3>
            <p className="text-gray-400">
              123 Flavor Street, Dhaka, Bangladesh
            </p>
            <p className="text-gray-400">Map: Coming Soon</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Info;
