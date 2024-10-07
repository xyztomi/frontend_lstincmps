import { X } from "lucide-react";
import Modal from "./Modal"
import { useState } from "react";
import { useSearchParams } from 'next/navigation'

export default function Sidebar({ isOpen, toggleSidebar }) {
  const [modalStatus, setModalStatus] = useState({ formType: '', isModalOpen: false })

  const searchParams = useSearchParams()
  const search = searchParams.get('kategori')

  const categories = [
    'Aksesoris',
    'Buku dan Alat Tulis',
    'Elektronik',
    'Kartu Identitas',
    'Kunci',
    'Tas dan Dompet',
    'Lain Lain',
  ]

  return (
    <>
      <div
        className={ `fixed inset-y-0 left-0 w-64 bg-black text-foreground transform ${isOpen ? 'translate-x-0' : '-translate-x-full'
          } transition-transform duration-300 ease-in-out overflow-hidden z-[99]` }
      >
        <div className="relative flex flex-col h-full">
          <button
            className="absolute top-4 right-4 text-foreground text-xl"
            onClick={ toggleSidebar }
          >
            <X />
          </button>

          {/* Main content, navigation links at the top */ }
          <div className="pt-16 px-4 flex-grow">
            <nav className="space-y-4">
              <a href="/" className={ `block text-lg font-bold ${!search ? 'underline' : ''}`}>
                Semua
              </a>
              { categories.map((category, index) => {
                return (
                  <a href={ `?kategori=${category}` } key={ index } className={ `block text-lg font-bold ${category == search ? 'underline' : ''}`}>
                    { category }
                  </a>
                )
              }) }
            </nav>
          </div>

          {/* Footer */ }
          <footer className="p-4 grid grid-cols-1 gap-4 bg-black border-t-2">
            <button
              className="bg-transparent border border-foreground text-foreground py-2 px-4 rounded-md"
              onClick={ () => {
                setModalStatus({ isModalOpen: true, formType: "login" })
              } }>
              Masuk
            </button>
            <button
              className="bg-foreground text-black py-2 px-4 rounded-md"
              onClick={ () => {
                setModalStatus({ isModalOpen: true, formType: "register" })
              } }>
              Daftar
            </button>
          </footer>
        </div>
      </div>
      { modalStatus.isModalOpen && <Modal formType={ modalStatus.formType } onClose={ () => { setModalStatus({ formType: '', isModalOpen: false }) } } /> }
    </>

  );
}
