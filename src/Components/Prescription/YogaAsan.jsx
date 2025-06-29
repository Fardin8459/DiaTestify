import React from "react";

const asanas = [
    {
      title: "Viparita Karani (Legs-Up-the-Wall Pose)",
      image: "/src/assets/yoga/yoga2.jpg",
      description: "Helps regulate blood sugar levels and improves circulation.",
    },
    {
      title: "Bhujangasana (Cobra Pose)",
      image: "/src/assets/yoga/yoga5.jpg",
      description: "Stimulates pancreatic function and enhances digestion.",
    },
    {
      title: "Dhanurasana (Bow Pose)",
      image: "/src/assets/yoga/yoga4.jpg",
      description: "Activates the pancreas and improves insulin regulation.",
    },
    {
      title: "Shavasana (Corpse Pose)",
      image: "/src/assets/yoga/yoga3.jpg",
      description: "Reduces stress, a major factor in diabetes management.",
    },
    {
      title: "Paschimottanasana (Seated Forward Bend)",
      image: "/src/assets/yoga/yoga6.jpg",
      description: "Improves metabolism and supports insulin production.",
    },
    {
      title: "Ardha Matsyendrasana (Half Spinal Twist)",
      image: "/src/assets/yoga/yoga1.jpg",
      description: "Stimulates abdominal organs and enhances digestion.",
    },
    {
      title: "Halasana (Plow Pose)",
      image: "/src/assets/yoga/yoga7.jpg",
      description: "Boosts pancreatic function and supports weight management.",
    },
  ];

const YogaAsan = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <header className="text-black py-5 shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-2xl font-bold text-center font-sans">
            Yoga Asanas for Diabetes Management
          </h1>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 bg-emerald-50">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold text-emerald-900 mb-4">
            Holistic Diabetes Management Through Yoga
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Discover carefully curated yoga poses that support blood sugar regulation, 
            enhance metabolic health, and promote overall well-being through mindful practice.
          </p>
        </div>
      </section>

      {/* Asanas Section */}
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {asanas.map((asana, index) => (
          <div 
            key={index}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-emerald-100"
          >
            <img
              src={asana.image}
              alt={asana.title}
              className="w-full h-60 object-cover object-center"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-emerald-800 mb-3">
                {asana.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {asana.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="bg-emerald-50 text-emerald-500 py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-lg font-medium mb-2">
            Empowering Health Through Yoga
          </p>
          <p className="text-sm text-emerald-600">
           Yoga Wellness Initiative | Mindful Diabetes Care
          </p>
        </div>
      </footer>
    </div>
  );
};

export default YogaAsan;