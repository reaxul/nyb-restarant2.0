import { Link } from "react-router-dom";

const SignatureItems = () => {
  const signatureItems = [
    {
      id: 4,
      title: "Beef Tehari",
      image: "https://www.shutterstock.com/image-photo/beef-tehari-bengali-style-600nw-2208351749.jpg",
      description: "Fragrant basmati rice with marinated beef and mustard oil.",
    },
    {
      id: 5,
      title: "Shorshe Coleman",
      image: "https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg",
      description: "Hilsa fish in mustard gravy, a Bengali delicacy.",
    },
    {
      id: 6,
      title: "Vegetable Khichuri",
      image: "https://static.vecteezy.com/system/resources/previews/016/285/977/large_2x/bengali-dish-khichdi-or-khichuri-made-from-a-combination-of-lentils-and-rice-and-vegetables-free-photo.jpg",
      description: "Comforting rice-lentil dish with seasonal veggies.",
    },
    {
      id: 15,
      title: "Roshogolla",
      image: "https://wellfoodbd.com/documents/products/202110/Roshogolla.png",
      description: "Spongy sweet balls soaked in aromatic syrup.",
    },
    {
      id: 10,
      title: "Borhani",
      image: "https://www.seriouseats.com/thmb/sUOfP39og6FG1ibR61zW4KSnf08=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/20171220-salted-mint-lassi-borhani-vicky-wasik-SEA-4I8A5025-79df6d0cd52d4eaebe17e64453b68f7e.jpg",
      description: "Savory yogurt drink with mint and spice.",
    },
  ];

  return (
    <section className="py-16 px-6 bg-black text-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-12 tracking-tight">Our Signature Items</h2>
        <div className="grid gap-8 md:grid-cols-3 sm:grid-cols-2">
          {signatureItems.map((item) => (
            <Link
              to={`/menu/${item.id}`}
              key={item.id}
              className="group relative rounded-xl overflow-hidden border border-white/10 hover:scale-105 transition-transform duration-300 shadow-md"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:brightness-75 transition"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-70" />
              </div>
              <div className="absolute bottom-0 left-0 w-full p-4 z-10 text-left bg-gradient-to-t from-black via-black/50 to-transparent">
                <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
                <p className="text-sm text-gray-300">{item.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SignatureItems;
