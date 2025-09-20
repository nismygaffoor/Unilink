import theme from "../styles/theme";

export default function Footer() {
  return (
     <footer className="py-3 text-center">
       <p style={{ color: theme.colors.textSecondary }}>
           © {new Date().getFullYear()} UniLink. All rights reserved.
         </p>
       </footer>

    // <footer className="bg-gray-100 text-center text-gray-500 py-4 w-full fixed bottom-0 left-0 z-40">
    //   © 2024 UniLink. All rights reserved.
    // </footer>
  );
} 
