"use client";

import { CarritoProvider } from "./CarritoContext";
import Header from "./Header";
import Footer from "./Footer";
import CarritoSidebar from "./CarritoSidebar";

export default function ClientLayout({ children }) {
  return (
    <CarritoProvider>
      <Header />
      <main>
        {children}
      </main>
      <Footer />
      <CarritoSidebar />
    </CarritoProvider>
  );
}
