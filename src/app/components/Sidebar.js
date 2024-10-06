import { X } from "lucide-react";

export default function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <div
      className={`fixed inset-y-0 left-0 w-64 bg-black text-foreground transform ${isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out overflow-hidden z-[99]`}
    >
      {/* Ensure full height and column layout */ }
      <div className="relative flex flex-col h-full">
        {/* Close button in the top right corner */ }
        <button
          className="absolute top-4 right-4 text-foreground text-xl"
          onClick={toggleSidebar}
        >
          <X />
        </button>

        {/* Main content, navigation links at the top */ }
        <div className="pt-16 px-4 flex-grow">
          <nav className="space-y-4">
            <a href="#" className="block text-lg font-bold underline hover:animate-bounce">
              Semua
            </a>
            <a href="#" className="flex justify-between text-lg">
              Aksesoris
            </a>
            <a href="#" className="flex justify-between text-lg">
              Buku & Alat Tulis
            </a>
            <a href="#" className="flex justify-between text-lg">
              Elektronik
            </a>
            <a href="#" className="flex justify-between text-lg">
              Kartu Identitas
            </a>
            <a href="#" className="flex justify-between text-lg">
              Kunci
            </a>
            <a href="#" className="flex justify-between text-lg">
              Tas & Dompet
            </a>
            <a href="#" className="flex justify-between text-lg">
              Lain & Lain
            </a>
            {/* Add more links as needed */ }
          </nav>
        </div>

        {/* Footer */ }
        <footer className="p-4 grid grid-cols-1 gap-4 bg-black border-t-2">
          <button className="bg-transparent border border-foreground text-foreground py-2 px-4 rounded-md">
            Masuk
          </button>
          <button className="bg-foreground text-black py-2 px-4 rounded-md">
            Daftar
          </button>
        </footer>
      </div>
    </div>
  );
}
