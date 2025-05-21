const Info = () => {
  return (
    <div className="py-12 px-4 max-w-7xl mx-auto">
      {/* About Section */}
      <section className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-200 mb-6">
          About NYB Restaurant
        </h2>
        <p className="text-lg text-gray-400 mb-8 max-w-3xl mx-auto">
          At NYB Restaurant, we bring a passion for food and community to the
          heart of New York. Founded in 2015, our journey began with a simple
          goal: to create a space where people can enjoy exceptional meals made
          with the freshest ingredients.
        </p>
        <p className="text-lg text-gray-400 mb-8 max-w-3xl mx-auto">
          Our mission is to celebrate the joy of dining by offering a menu that
          blends classic flavors with modern twists. From our savory dishes to
          our delightful desserts, every item is crafted with care to ensure a
          memorable experience for our guests.
        </p>
        <p className="text-lg text-gray-400 max-w-3xl mx-auto">
          We invite you to join us at NYB Restaurant, where every meal is a
          celebration of taste, tradition, and togetherness. Come savor the
          flavors that make us who we are!
        </p>
      </section>

      {/* Info Section */}
      <section className="text-center">
        <h2 className="text-3xl font-bold text-gray-200 mb-6">
          General Information
        </h2>
        <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
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
      </section>
    </div>
  );
};

export default Info;
