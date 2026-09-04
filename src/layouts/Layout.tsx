import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-21">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
