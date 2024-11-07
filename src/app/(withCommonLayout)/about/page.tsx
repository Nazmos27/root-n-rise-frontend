import React from "react";

const AboutUs = () => {
  return (
    <div className="py-12 w-full">
      <div className="container mx-auto px-6">
        {/* Page Title */}
        <h1 className="text-4xl font-bold text-center  mb-8">About Us</h1>

        {/* Mission Section */}
        <section className=" shadow-lg rounded-lg p-8 mb-10 transition-transform transform hover:-translate-y-1 hover:shadow-xl duration-300">
          <h2 className="text-3xl font-semibold  mb-4">Our Mission</h2>
          <p className="leading-relaxed">
            At Root n Rise, our mission is to empower gardening enthusiasts and
            professionals alike by providing a platform to share, learn, and
            connect. We believe that gardening is not just a hobby but a way of
            life that promotes sustainability, well-being, and community
            building.
          </p>
        </section>

        {/* Vision Section */}
        <section className=" shadow-lg rounded-lg p-8 mb-10 transition-transform transform hover:-translate-y-1 hover:shadow-xl duration-300">
          <h2 className="text-3xl font-semibold  mb-4">Our Vision</h2>
          <p className=" leading-relaxed">
            Our vision is to create a global community of gardeners where
            knowledge flows freely, innovation thrives, and a deep love for
            nature is shared across borders. We aim to foster a space where
            beginners and experts alike can find the resources they need to grow
            their skills and their gardens.
          </p>
        </section>

      </div>
    </div>
  );
};

export default AboutUs;
