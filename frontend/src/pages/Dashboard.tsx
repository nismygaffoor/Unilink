import { useState } from "react";
import { motion } from "framer-motion";
import theme from "../styles/theme";
import {
  AcademicCapIcon,
  CalendarIcon,
  UsersIcon,
  TrophyIcon,
  ChatBubbleLeftEllipsisIcon,
  PencilSquareIcon
} from "@heroicons/react/24/solid";

export default function Dashboard() {
  const [stats] = useState({
    points: 120,
    notes: 8,
    events: 3,
    forumPosts: 5,
  });

  const statsCards = [
    { title: "Points", value: stats.points, icon: TrophyIcon },
    { title: "Notes Uploaded", value: stats.notes, icon: AcademicCapIcon },
    { title: "Events Attended", value: stats.events, icon: CalendarIcon },
    { title: "Forum Posts", value: stats.forumPosts, icon: UsersIcon },
  ];

  const quickLinks = [
    { label: "Upload Notes", icon: AcademicCapIcon, href: "/repository", color: theme.colors.primary },
    { label: "Join Event", icon: CalendarIcon, href: "/events", color: theme.colors.secondary },
    { label: "New Forum Post", icon: ChatBubbleLeftEllipsisIcon, href: "/forum", color: theme.colors.highlight },
  ];

  const recentActivity = [
    { icon: PencilSquareIcon, text: "Uploaded new notes for CS101" },
    { icon: CalendarIcon, text: "Joined AI Club Hackathon event" },
    { icon: ChatBubbleLeftEllipsisIcon, text: "Posted a new question in the forum" },
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="py-10 px-6 max-w-6xl mx-auto space-y-12">
      {/* Welcome Section */}
      <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="text-center">
        <h1 className="text-4xl font-extrabold mb-4" style={{ color: theme.colors.primary }}>
          Welcome Back to UniLink!
        </h1>
        <p className="text-lg text-gray-600">
          Quickly access your resources, events, and community activities below.
        </p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6" initial="hidden" animate="visible" variants={fadeInUp}>
        {statsCards.map((card, idx) => (
          <motion.div
            key={idx}
            className="p-6 rounded-xl shadow-lg flex flex-col items-center transition transform hover:scale-105"
            style={{ backgroundColor: theme.colors.white }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <card.icon className="w-12 h-12 mb-4" style={{ color: theme.colors.secondary }} />
            <h3 className="text-xl font-semibold mb-2" style={{ color: theme.colors.textPrimary }}>
              {card.title}
            </h3>
            <p className="text-3xl font-bold" style={{ color: theme.colors.primary }}>
              {card.value}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Quick Links */}
      <motion.div className="flex flex-col md:flex-row gap-6" initial="hidden" animate="visible" variants={fadeInUp}>
        {quickLinks.map((link, idx) => (
          <motion.a
            key={idx}
            href={link.href}
            className="flex-1 flex items-center justify-center gap-2 text-white font-semibold py-4 rounded-2xl shadow-lg transition transform hover:scale-105"
            style={{ backgroundColor: link.color }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <link.icon className="w-6 h-6" />
            {link.label}
          </motion.a>
        ))}
      </motion.div>

      {/* Recent Activity Timeline */}
      <motion.div className="bg-white p-6 rounded-2xl shadow-lg" initial="hidden" animate="visible" variants={fadeInUp}>
        <h2 className="text-2xl font-bold mb-6" style={{ color: theme.colors.titleColor }}>
          Recent Activity
        </h2>
        <ul className="space-y-4">
          {recentActivity.map((activity, idx) => (
            <li key={idx} className="flex items-start gap-4">
              <activity.icon className="w-6 h-6 mt-1 text-teal-500 flex-shrink-0" />
              <p className="text-gray-700">{activity.text}</p>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}
