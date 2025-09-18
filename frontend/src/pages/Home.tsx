import React from "react";
import {
  AcademicCapIcon,
  CalendarIcon,
  UsersIcon,
  CpuChipIcon,
} from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import theme from "../styles/theme";
import AboutImage from "../assets/mmmmm.jpg";


export default function Home() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-[theme.colors.bgLeft]">
      {/* Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className={`flex flex-col items-center justify-center text-center py-32 px-4 w-full`}
        style={{ background: theme.gradients.primary }}
      >
        <h1
          className="text-5xl font-extrabold mb-4"
          style={{ color: theme.colors.titleColor }}
        >
          Welcome to UniLink
        </h1>
        <p
          className="text-lg mb-8 max-w-xl"
          style={{ color: theme.colors.textPrimary }}
        >
          The central hub for Sri Lankan university students to share knowledge,
          discover events, and connect with peers across campuses.
        </p>
        <a
          href="/login"
          className="px-8 py-3 rounded-lg shadow-lg text-lg font-semibold transition"
          style={{
            backgroundColor: theme.colors.primary,
            color: theme.colors.white,
          }}
        >
          Get Started
        </a>
      </motion.section>

      {/* Features / Why Choose Us */}
      <section className="py-20 px-6 w-full max-w-6xl">
        <h2
          className="text-3xl font-bold text-center mb-12"
          style={{ color: theme.colors.titleColor }}
        >
          Why Choose UniLink?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {[
            {
              icon: AcademicCapIcon,
              title: "Academic Repository",
              desc: "Upload and access lecture notes, past papers, and Kuppi materials.",
            },
            {
              icon: CalendarIcon,
              title: "Event Hub",
              desc: "Discover and share university events, club activities, and news.",
            },
            {
              icon: UsersIcon,
              title: "Community Forum",
              desc: "Engage in discussions, Q&A sessions, and peer support.",
            },
            {
              icon: CpuChipIcon,
              title: "AI-Powered Tools",
              desc: "Sentiment analysis, tag suggestions, and gamified badges for engagement.",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUp}
              className="shadow-lg rounded-xl p-8 flex flex-col items-center hover:scale-105 transform transition"
              style={{ backgroundColor: theme.colors.white }}
            >
              <feature.icon
                className="w-16 h-16 mb-4"
                style={{ color: theme.colors.secondary }}
              />
              <h3
                className="font-semibold text-xl mb-2"
                style={{ color: theme.colors.textPrimary }}
              >
                {feature.title}
              </h3>
              <p
                className="text-sm text-center"
                style={{ color: theme.colors.textSecondary }}
              >
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About Us Section */}
<motion.section
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.3 }}
  variants={fadeInUp}
  className="py-12 px-8 w-full flex flex-col items-center"
  style={{ backgroundColor: theme.colors.bgRight }}
>
  <h2
    className="text-4xl md:text-6xl font-extrabold text-center mb-6"
    style={{ color: theme.colors.titleColor }}
  >
    About UniLink
  </h2>

  <div className=" text-center flex flex-col gap-4">
    <p className="text-xl md:text-2xl leading-relaxed   font-semibold" style={{ color: theme.colors.textPrimary }}>
      UniLink is designed to empower Sri Lankan university students by providing a centralized platform for learning, sharing, and connecting.
    </p>
    <p className="text-xl md:text-2xl leading-relaxed   font-semibold " style={{ color: theme.colors.textPrimary }}>
      Our mission is to create a student-first digital community where knowledge is accessible, collaboration is seamless, and personal growth is encouraged. Whether you need past papers, want to join a Kuppi session, or stay updated on campus events, UniLink is your one-stop hub. Join us and help shape the future of student life!
    </p>
    <a
      href="/login"
      className="mt-4 px-8 py-4 rounded-lg font-semibold transition shadow-lg text-xl md:text-2xl w-max mx-auto"
      style={{ backgroundColor: theme.colors.primary, color: theme.colors.white }}
    >
      Join Now
    </a>
  </div>
</motion.section>

      {/* Call to Action */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
        className="w-full mb-6 py-16  text-center rounded-b-lg"
        style={{ backgroundColor: theme.colors.primary, color: theme.colors.white }}
      >
        <h2 className="text-3xl font-bold mb-4">Join UniLink Today!</h2>
        <p className="mb-6">
          Start connecting, sharing, and learning across universities.
        </p>
        <a
          href="/login"
          className="px-6 py-3  rounded-lg font-semibold transition"
          style={{ backgroundColor: theme.colors.white, color: theme.colors.primary }}
        >
          Get Started
        </a>
      </motion.section>
    </div>
  );
}
