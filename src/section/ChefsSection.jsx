import React from 'react';

const ChefsSection = () => {
  const chefs = [
    {
      name: 'Chef John Doe',
      specialty: 'Italian Cuisine',
      image: 'https://i.ibb.co/7yrHQ6t/chef-2.jpg',
    },
    {
      name: 'Chef Maria Smith',
      specialty: 'French Cuisine',
      image: 'https://i.ibb.co/FbT5NHZ/chef-3.jpg',
    },
    {
      name: 'Chef Alex Johnson',
      specialty: 'Asian Fusion',
      image: 'https://i.ibb.co/g47HHdh/chef-1.jpg',
    },
  ];

  return (
    <section className="bg-[#0f0f0f] text-gray-100 py-16">
      <div className="container mx-auto text-center px-4">
        <h2 className="text-4xl font-bold mb-10 hover:text-yellow-400">Meet Our Chefs</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {chefs.map((chef, index) => (
            <div
              key={index}
              className="bg-[#1c1c1c] p-6 rounded-xl shadow-md hover:shadow-yellow-500/20 transition-shadow duration-300"
            >
              <img
                src={chef.image}
                alt={chef.name}
                className="w-full h-56 object-cover rounded-lg mb-4"
              />
              <h3 className="text-2xl font-semibold mb-2">{chef.name}</h3>
              <p className="text-gray-400">{chef.specialty}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChefsSection;
