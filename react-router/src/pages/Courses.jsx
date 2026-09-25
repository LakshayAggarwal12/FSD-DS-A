import React from "react";

const Courses = () => {
  const courses = [
    {
      title: "Computer Science & Engineering",
      duration: "4 Years",
      description:
        "Build strong foundations in programming, software development, databases, algorithms, and modern computing technologies.",
    },
    {
      title: "CSE - Data Science",
      duration: "4 Years",
      description:
        "Explore data analysis, machine learning, statistics, artificial intelligence, and data-driven problem solving.",
    },
    {
      title: "Information Technology",
      duration: "4 Years",
      description:
        "Develop practical skills in software engineering, networking, databases, web technologies, and information systems.",
    },
    {
      title: "Electronics & Communication",
      duration: "4 Years",
      description:
        "Learn electronics, communication systems, embedded technologies, signal processing, and modern electronic systems.",
    },
    {
      title: "Mechanical Engineering",
      duration: "4 Years",
      description:
        "Study mechanical systems, manufacturing, thermodynamics, design, materials, and engineering principles.",
    },
    {
      title: "Electrical & Electronics Engineering",
      duration: "4 Years",
      description:
        "Explore electrical systems, electronics, power systems, control systems, and modern electrical technologies.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      {/* Hero */}
      <section className="bg-gray-800 px-6 py-24 text-center text-white">
        <h1 className="font-serif text-5xl font-bold md:text-6xl">
          Our Courses
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-gray-300">
          Explore academic programs designed to build strong technical
          foundations and prepare students for the evolving world of
          engineering and technology.
        </p>
      </section>

      {/* Courses */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course, index) => (
            <div
              key={index}
              className="group rounded-xl border border-gray-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="mb-5 flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 font-semibold text-white">
                  {index + 1}
                </span>

                <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600">
                  {course.duration}
                </span>
              </div>

              <h2 className="font-serif text-2xl font-bold text-gray-800">
                {course.title}
              </h2>

              <p className="mt-4 leading-7 text-gray-600">
                {course.description}
              </p>

              <button className="mt-6 font-medium text-gray-800 transition hover:text-gray-500">
                Learn More →
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Section */}
      <section className="bg-white px-6 py-16 text-center">
        <h2 className="font-serif text-3xl font-bold text-gray-800">
          Learn. Build. Innovate.
        </h2>

        <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-600">
          Our academic programs combine theoretical knowledge with practical
          experience, projects, and opportunities for technical growth.
        </p>
      </section>
    </div>
  );
};

export default Courses;