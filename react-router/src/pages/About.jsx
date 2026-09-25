import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      {/* Hero Section */}
      <section className="bg-gray-800 px-6 py-24 text-center text-white">
        <h1 className="font-serif text-5xl font-bold md:text-6xl">
          About ABES
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-gray-200">
          Empowering students through education, innovation, and
          industry-oriented learning.
        </p>
      </section>

      {/* Introduction */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="font-serif text-4xl font-bold text-gray-800">
              About ABES Engineering College
            </h2>

            <p className="mt-6 leading-7 text-gray-600">
              ABES Engineering College is a technical institution in
              Ghaziabad, Uttar Pradesh, focused on providing students with
              strong academic foundations, practical learning, and
              industry-relevant skills.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              The college encourages students to combine theoretical
              knowledge with practical experience through projects,
              technical activities, workshops, competitions, and
              industry-oriented learning.
            </p>
          </div>

          <div className="rounded-xl bg-white p-8 shadow-lg">
            <h3 className="font-serif text-2xl font-bold text-gray-800">
              Our Vision
            </h3>

            <p className="mt-4 leading-7 text-gray-600">
              To develop technically competent, innovative, and responsible
              professionals who can contribute meaningfully to society and
              adapt to the evolving world of technology.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center font-serif text-4xl font-bold text-gray-800">
            What We Offer
          </h2>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Card 1 */}
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-6 transition hover:-translate-y-1 hover:shadow-lg">
              <h3 className="text-xl font-semibold">Academic Excellence</h3>

              <p className="mt-3 text-gray-600 leading-6">
                Strong academic programs supported by practical learning,
                laboratories, projects, and technical activities.
              </p>
            </div>

            {/* Card 2 */}
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-6 transition hover:-translate-y-1 hover:shadow-lg">
              <h3 className="text-xl font-semibold">Innovation</h3>

              <p className="mt-3 text-gray-600 leading-6">
                Students are encouraged to explore emerging technologies,
                participate in hackathons, and develop innovative solutions.
              </p>
            </div>

            {/* Card 3 */}
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-6 transition hover:-translate-y-1 hover:shadow-lg">
              <h3 className="text-xl font-semibold">Industry Readiness</h3>

              <p className="mt-3 text-gray-600 leading-6">
                Practical projects and professional activities help students
                develop skills relevant to modern engineering careers.
              </p>
            </div>

            {/* Card 4 */}
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-6 transition hover:-translate-y-1 hover:shadow-lg">
              <h3 className="text-xl font-semibold">Campus Life</h3>

              <p className="mt-3 text-gray-600 leading-6">
                Technical clubs, cultural activities, sports, and student
                communities provide opportunities for personal development.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Closing Section */}
      <section className="bg-gray-800 px-6 py-16 text-center text-white">
        <h2 className="font-serif text-3xl font-bold">
          Building the Engineers of Tomorrow
        </h2>

        <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-300">
          ABES strives to create an environment where students can learn,
          experiment, innovate, and prepare themselves for the challenges of
          the modern world.
        </p>
      </section>
    </div>
  );
};

export default About;