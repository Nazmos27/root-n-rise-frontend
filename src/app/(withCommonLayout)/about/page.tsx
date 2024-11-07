import React from "react";

const AboutUs = () => {
  return (
    <div className="py-12 w-full pt-32">
      <div className="container mx-auto px-6">
        {/* Page Title */}
        <h1 className="text-5xl font-bold text-center mb-8 ">About Us</h1>

        {/* Mission Section */}
        <section className="shadow-lg rounded-lg p-8 mb-10 transition-transform transform hover:-translate-y-1 hover:shadow-xl duration-300">
          <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
          <p className="leading-relaxed">
            At Root & Rise, we are dedicated to inspiring and connecting
            gardening enthusiasts and professionals. Our mission is to provide a
            space where people can exchange knowledge, support one another, and
            celebrate the joy and impact of gardening as a lifestyle that
            nurtures sustainability, health, and community.
          </p>
        </section>

        {/* Vision Section */}
        <section className="shadow-lg rounded-lg p-8 mb-10 transition-transform transform hover:-translate-y-1 hover:shadow-xl duration-300">
          <h2 className="text-3xl font-semibold mb-4">Our Vision</h2>
          <p className="leading-relaxed">
            We envision a global network of gardeners united by a shared love
            for nature and growth. Root & Rise aims to cultivate a supportive
            community where knowledge is accessible to all, innovation is
            encouraged, and gardening skills flourish, empowering both beginners
            and experts to transform their spaces.
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
