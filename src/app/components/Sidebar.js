import { X } from "lucide-react";
import Modal from "./Modal";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useLogout } from "../lib/auth";
import Link from "next/link";

export const categories = [
  { name: "Aksesoris", id: 1 },
  { name: "Buku dan Alat Tulis", id: 2 },
  { name: "Elektronik", id: 3 },
  { name: "Kartu Identitas", id: 4 },
  { name: "Kunci", id: 5 },
  { name: "Tas dan Dompet", id: 6 },
  { name: "Lain Lain", id: 7 },
];

export default function Sidebar({ isOpen, toggleSidebar }) {
  const router = useRouter();

  const handleClick = () => {
    router.push("/form");
  };

  const [modalStatus, setModalStatus] = useState({
    formType: "",
    isModalOpen: false,
  });

  const searchParams = useSearchParams();
  const search = searchParams.get("kategori");

  const [user, setUser] = useState(null);
  const logoutMutation = useLogout();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const userData = localStorage.getItem("username");
      console.log(userData);
      setUser(userData);
    }
  }, []);

  const handleLogout = () => {
    logoutMutation.mutateAsync();
    setUser(null);
  };

  return (
    <>
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-black text-foreground transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out overflow-hidden z-[99]`}
      >
        <div className="relative flex flex-col h-full">
          <button
            className="absolute top-4 right-4 text-foreground text-xl"
            onClick={toggleSidebar}
          >
            <X />
          </button>

          <div className="pt-16 px-4 flex-grow">
            <nav className="space-y-4">
              <a
                href="/"
                className={`block text-lg font-bold ${!search ? "underline" : ""}`}
              >
                Semua
              </a>
              {categories.map((category, index) => {
                return (
                  <a
                    href={`?kategori=${category.id}`}
                    key={index}
                    className={`block text-lg font-bold ${category.id == search ? "underline" : ""}`}
                  >
                    {category.name}
                  </a>
                );
              })}
            </nav>
          </div>

          <footer className="p-4 grid grid-cols-1 gap-4 bg-black border-t-2">
            {user ? (
              <>
                <Link href="/profil">
                  <button className="text-foreground underline">{user}</button>
                </Link>
                <Link
                  href="/form"
                  className="bg-foreground text-black py-2 px-4 rounded-md flex items-center justify-center"
                >
                  <button className="">Post Barang</button>
                </Link>

                <button
                  className="bg-foreground text-black py-2 px-4 rounded-md"
                  onClick={handleLogout}
                  disabled={logoutMutation.isLoading}
                >
                  {logoutMutation.isLoading ? "Logging out..." : "Logout"}
                </button>
              </>
            ) : (
              <>
                <button
                  className="bg-transparent border border-foreground text-foreground py-2 px-4 rounded-md"
                  onClick={() =>
                    setModalStatus({ isModalOpen: true, formType: "login" })
                  }
                >
                  Masuk
                </button>
                <button
                  className="bg-foreground text-black py-2 px-4 rounded-md"
                  onClick={() =>
                    setModalStatus({ isModalOpen: true, formType: "register" })
                  }
                >
                  Daftar
                </button>
              </>
            )}
          </footer>
        </div>
      </div>
      <div className="">
        {modalStatus.isModalOpen && (
          <Modal
            formType={modalStatus.formType}
            onClose={() => {
              setModalStatus({ formType: "", isModalOpen: false });
            }}
            onLoginSuccess={(username) => {
              setUser(username);
              setModalStatus({ formType: "", isModalOpen: false });
            }}
          />
        )}
      </div>
    </>
  );
}
