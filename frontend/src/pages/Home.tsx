import React from "react";
import {
  AcademicCapIcon,
  CalendarIcon,
  UsersIcon,
  CpuChipIcon,
} from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import theme from "../styles/theme";
import img from "./../assets/3.jpg"
import img2 from "./../assets/7.jpg"
import img3 from "./../assets/8.jpg"
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Home() {
  return (
    <div >

      {/* ===== Hero ===== */}
      {/* <motion.section
        id="home"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="flex flex-col items-center text-center py-28 px-6"
        style={{ background: theme.gradients.primary }}
      >
        <h1
          className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight"
          style={{ color: theme.colors.titleColor }}
        >
          Welcome to UniLink
        </h1>
        <p
          className="text-lg md:text-xl mb-8 max-w-2xl"
          style={{ color: theme.colors.textPrimary }}
        >
          The central hub for Sri Lankan university students to share knowledge,
          discover events, and connect with peers across campuses.
        </p>
        <a
          href="/login"
          className="px-8 py-3 rounded-lg shadow-lg text-lg font-semibold transition hover:opacity-90"
          style={{ backgroundColor: theme.colors.primary, color: theme.colors.white }}
        >
          Get Started
        </a>
      </motion.section> */}
     <motion.section
  id="home"
  initial="hidden"
  animate="visible"
  variants={fadeInUp}
  className="relative flex items-center justify-start min-h-[65vh] md:min-h-[80vh] overflow-hidden"
>
  {/* Background image */}
  <div
    className="absolute inset-0 -z-20"
    style={{
      backgroundImage: `url(${img3})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  />

  {/* Overlay: black on left → teal on right */}
  <div
    className="absolute inset-0 -z-10"
    style={{
      background: `
        linear-gradient(
          to right,
          rgba(0,0,0,0.8) 0%,            /* almost black left */
          rgba(76,166,155,0.7) 100%      /* theme.colors.primary (teal) right */
        )
      `,
    }}
  />

  {/* Content */}
  <div className="relative z-10 w-full">
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-24 text-left">
      <h1
        className="text-4xl md:text-6xl font-extrabold leading-tight mb-4"
        style={{ color: theme.colors.white }}
      >
        Welcome to UniLink
      </h1>

      <p
        className="text-lg md:text-xl max-w-2xl mb-8"
        style={{ color: "rgba(255,255,255,0.92)" }}
      >
        The central hub for Sri Lankan university students to share knowledge,
        discover events, and connect with peers across campuses.

        
      </p>

      <a
        href="/login"
        className="inline-block px-8 py-3 rounded-lg shadow-lg text-lg font-semibold transition hover:opacity-90"
        style={{ backgroundColor: theme.colors.primary, color: theme.colors.white }}
      >
        Get Started
      </a>
    </div>
  </div>
</motion.section>


      {/* ===== Features ===== */}
      <section id="features" className="py-10 px-6 w-full max-w-7xl mx-auto">
        <h2
          className="text-3xl md:text-4xl font-bold text-center mb-12"
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
              desc: "Sentiment analysis, tag suggestions, and gamified badges.",
            },
          ].map((f, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              variants={fadeInUp}
              className="rounded-xl p-8 flex flex-col items-center shadow-lg hover:scale-105 transition mb-[0px]"
              style={{ backgroundColor: theme.colors.white }}
            >
              <f.icon className="w-16 h-16 mb-4" style={{ color: theme.colors.secondary }} />
              <h3 className="font-semibold text-xl mb-2" style={{ color: theme.colors.textPrimary }}>
                {f.title}
              </h3>
              <p className="text-sm text-center" style={{ color: theme.colors.textSecondary }}>
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== About (layout A: images left, text right) ===== */}
      <motion.section
        id="about"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
        className="w-full max-w-7xl mx-auto px-6 md:px-10 py-20 grid md:grid-cols-2 gap-10 items-center mb-24"
      >
     
       
<div className="relative w-full h-full">
  {/* First image */}
  <div className="w-4/6 aspect-[4/4] overflow-hidden rounded-lg shadow-lg">
    <img src={img2} alt="Students" className="w-full h-full object-cover" />
  </div>

{/* Background box (shifted lower & left) */}

<div className="absolute inset-0 flex  items-center justify-center -z-10 translate-y-20 -translate-x-[10px]">
  <div
    className="w-4/6 h-full rounded-lg"
    style={{ backgroundColor: theme.colors.secondary }}
  />
</div>

  {/* Second image (shifted further down) */}
  <div className="w-4/6 aspect-[4/4] overflow-hidden rounded-lg shadow-lg absolute -bottom-40 right-5 hidden md:block">
    <img src={img} alt="Library" className="w-full h-full object-cover" />
  </div>
</div>



        {/* text (right) */}
        <div className="mt-[160px]">
          <div className="h-[3px] w-[135px] mb-6" style={{ backgroundColor: theme.colors.primary }} />
          <h2
            className="text-4xl md:text-5xl font-extrabold leading-tight mb-6"
            style={{ color: theme.colors.textPrimary }}
          >
            {/* We are preparing the
            <br /> leaders of tomorrow */}
            Empowering the 
            <br/>Leaders of Tomorrow
          </h2>
          <p className="text-lg leading-8 mb-8" style={{ color: theme.colors.textSecondary }}>
{/* UniLink empowers Sri Lankan university students with a centralized space for learning, sharing, and connecting across campuses. */}
          UniLink empowers Sri Lankan university students with the tools and connections they
             need to succeed. By bringing together resources, events, and communities into one platform,
              UniLink supports the next generation of thinkers, creators, and leaders.
          </p>
          <a
            href="/login"
            className="inline-block px-8 py-3 rounded-lg font-semibold shadow-lg transition hover:opacity-90"
            style={{ backgroundColor: theme.colors.primary, color: theme.colors.white }}
          >
            Join Now
          </a>
        </div>
      </motion.section>

      {/* ===== About (layout B: text left, image + quote card right) ===== */}
      {/* <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
        className="w-full max-w-7xl mx-auto px-6 md:px-10 py-20 grid md:grid-cols-2 gap-10 items-center"
      >
   
        <div>
          <div className="h-[3px] w-16 mb-6" style={{ backgroundColor: theme.colors.highlight }} />
          <h3
            className="text-4xl md:text-5xl font-extrabold mb-6"
            style={{ color: theme.colors.textPrimary }}
          >
            Our vision and mission
          </h3>
          <p className="text-lg leading-8 mb-8" style={{ color: theme.colors.textSecondary }}>
            We’re building a student-first community where knowledge is accessible, collaboration is
            seamless, and personal growth is encouraged.
          </p>
          <a
            href="/login"
            className="inline-block px-8 py-3 rounded-lg font-semibold shadow-lg transition hover:opacity-90"
            style={{ backgroundColor: theme.colors.primary, color: theme.colors.white }}
          >
            Enroll Now
          </a>
        </div>

      
        <div className="relative">
          <img
            src="./../assets/3.jpg"
            alt="Mentor"
            className="w-full rounded-lg shadow-lg object-cover"
          />
          <div
            className="absolute left-6 -bottom-10 bg-white rounded-xl shadow-xl p-6 max-w-md"
            style={{ border: "1px solid rgba(0,0,0,0.06)" }}
          >
            <div className="h-[3px] w-12 mb-4" style={{ backgroundColor: theme.colors.highlight }} />
            <p className="text-lg mb-4" style={{ color: theme.colors.textPrimary }}>
              “UniLink helped me find resources and communities I didn’t know existed.”
            </p>
            <div className="text-sm font-semibold" style={{ color: theme.colors.textPrimary }}>
              JOHN CARTER
            </div>
            <div className="text-sm" style={{ color: theme.colors.textSecondary }}>
              PRESIDENT OF CLASSROOM
            </div>
          </div>
        </div>
      </motion.section> */}

     


{/* ===== CTA (green/teal style, matches theme) ===== */}
<motion.section
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.3 }}
  variants={fadeInUp}
  className="w-full mt-[170px]"
>
  <div
    className=" mx-auto px-6 md:px-10 py-20 md:py-24"
    style={{
      backgroundColor: theme.colors.primary, // teal-green from your theme
      color: theme.colors.white,
      borderRadius: "0.25rem",
    }}
  >
    <div className="grid md:grid-cols-3 gap-10 items-center ml-[170px]">
      {/* Left: line + heading + text */}
      <div className="md:col-span-2">
        <div
          className="h-[2px] w-28 mb-5"
          style={{ backgroundColor: theme.colors.white, opacity: 0.9 }}
        />
        <h2
          className="text-4xl md:text-5xl font-extrabold mb-5 leading-tight"
          style={{ color: theme.colors.white }}
        >
          Join UniLink Today!
        </h2>
        <p
          className="text-base md:text-lg max-w-3xl"
          style={{ color: "rgba(255,255,255,0.9)" }}
        >
          Start connecting, sharing, and learning across universities.
        </p>
      </div>

      {/* Right: CTA button */}
      <div className="flex md:justify-end items-center mr-[170px]">
        <a
          href="/login"
          className="px-10 py-6 text-sm tracking-wide font-semibold uppercase rounded-md shadow-lg transition-transform hover:scale-[1.02] focus:outline-none focus:ring-2"
          style={{
            backgroundColor: theme.colors.highlight, // dusty rose button
            color: theme.colors.white,
            boxShadow: "0 12px 24px rgba(0,0,0,0.25)",
          }}
        >
          Enroll Now
        </a>
      </div>
    </div>
  </div>
</motion.section>

      
    </div>
  );
}
