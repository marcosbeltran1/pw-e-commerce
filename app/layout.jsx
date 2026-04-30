import "./styles.css";
import ClientLayout from "@/components/ClientLayout";

export const metadata = {
  title: "Mundo Suplemento — Suplementos deportivos",
  description: "E-commerce de suplementos deportivos. Calidad premium para deportistas.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
