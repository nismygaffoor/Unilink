// src/styles/theme.ts
const theme = {
  colors: {
    primary: "#4CA69B",          // Navbar / Buttons
    secondary: "#3C9084",        // Icons / Hover
    bgLeft: "#A8C6B7",           // Gradient start
    bgRight: "#F7E8B5",          // Gradient end
    textPrimary: "#4A4A4A",      // Dark gray
    textSecondary: "#7F8C8D",    // Muted gray
    highlight: "#A6577C",        // Dusty rose / tagline
    icon: "#357C73",             // Deep teal icons
     titleColor: "#14B8A6",       // Old teal color for title
     white: "#FFFFFF", // ← Add this
},

  gradients: {
    primary: "linear-gradient(to right, #53ad80ff, #f4e9c6ff)",
    navbar: "linear-gradient(to bottom, #4CA69B, #3C9084)",
  },

  fontSizes: {
    heading: "2rem",
    subheading: "1.5rem",
    body: "1rem",
  },
};

export default theme;
