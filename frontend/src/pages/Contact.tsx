import { motion } from "framer-motion";
import theme from "../styles/theme";

export default function Contact() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.div
      className="max-w-xl mx-auto py-16 px-4"
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
    >
      <h1
        className="text-3xl md:text-5xl font-extrabold mb-4 text-center"
        style={{ color: theme.colors.titleColor }}
      >
        Contact & Feedback
      </h1>
      <p
        className="text-lg md:text-lg text-center mb-4"
        style={{ color: theme.colors.textPrimary }}
      >
        Have questions, feedback, or want to get in touch? Fill out the form below or email us at{" "}
        <a
          href="mailto:info@unilink.lk"
          className="underline font-semibold"
          style={{ color: theme.colors.secondary }}
        >
          info@unilink.lk
        </a>.
      </p>

      <motion.form
        className="bg-white p-8 rounded-2xl shadow-2xl flex flex-col gap-4"
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <input
          type="text"
          placeholder="Your Name"
          className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
        <input
          type="email"
          placeholder="Your Email"
          className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
        <textarea
          placeholder="Your Message"
          className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none h-32"
          required
        />
        <button
          type="submit"
          className="bg-primary text-white px-4 py-3 rounded-xl font-semibold text-lg hover:scale-105 transition-transform"
          style={{ backgroundColor: theme.colors.primary }}
        >
          Send Message
        </button>
      </motion.form>

      <div
        className="mt-10 text-center text-gray-500"
        style={{ color: theme.colors.textSecondary }}
      >
        Or connect with us on{" "}
        <a
          href="https://facebook.com"
          className="underline font-semibold"
          style={{ color: theme.colors.secondary }}
        >
          Facebook
        </a>{" "}
        or{" "}
        <a
          href="https://twitter.com"
          className="underline font-semibold"
          style={{ color: theme.colors.secondary }}
        >
          Twitter
        </a>.
      </div>
    </motion.div>
  );
}
