import React from "react";

const Home = () => {
  const backgroundImage =
    "https://edsathi.com/wp-content/uploads/2025/05/ABES.jpg";

  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/35"></div>

      {/* Bottom gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/75"></div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center text-white">
        
        <h1 className="font-serif text-6xl font-bold leading-tight md:text-7xl lg:text-8xl">
          Welcome to ABES
        </h1>

        <p className="mt-8 max-w-3xl text-lg font-medium leading-relaxed md:text-xl">
          Recognized among the best engineering colleges in the Delhi NCR,
          <br className="hidden md:block" />
          ABES Engineering College blends academic excellence with
          <br className="hidden md:block" />
          industry-ready learning.
        </p>

      </div>
    </div>
  );
};

export default Home;