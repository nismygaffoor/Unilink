// src/layouts/PublicLayout.tsx
import PublicNavbar from "../components/PublicNavbar";
import Footer from "../components/Footer";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PublicNavbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
