// src/styles/theme.ts
const theme = {
  colors: {
    primary: "#4CA69B",          // Navbar / Buttons teal shades
    secondary: "#3C9084",        // Icons / Hover  
    bgLeft: "#A8C6B7",           // Gradient start  Soft green
    bgRight: "#F7E8B5",          // Gradient end -beige 
    textPrimary: "#4A4A4A",      // Dark gray
    textSecondary: "#7F8C8D",    // Muted gray
    highlight: "#b84b7eff",        // Dusty rose / tagline
    icon: "#357C73",             // Deep teal icons
     titleColor: "#14B8A6",       // Brighter teal, 
       white: "#FFFFFF", // ← Add this
},

  gradients: {
    primary: "linear-gradient(to right, #53ad80ff, #f4e9c6ff)", 

    secondary: "linear-gradient(to right, #53ad80ff, #f4e9c6ff)",
    navbar: "linear-gradient(to bottom, #4CA69B, #3C9084)",
  },

  fontSizes: {
    heading: "2rem",
    subheading: "1.5rem",
    body: "1rem",
  },
};

export default theme;
