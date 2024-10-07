import localFont from "next/font/local";
import "./globals.css";

const Avenir = localFont({
  src: "./fonts/Avenir.otf",
  variable: "--font-avenir",
});
const MabryPro = localFont({
  src: "./fonts/MabryPro.ttf",
  variable: "--font-mabrypro",
});

export const metadata = {
  title: "Lost in Campus",
  description: "Tempatnya mencari barangmu yg hilang itu..",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={ `${Avenir.variable} ${MabryPro.variable} antialiased` }>
      <body className="font-[family-name:var(--font-mabrypro)]">
        { children }
      </body>
    </html>
  );
}
