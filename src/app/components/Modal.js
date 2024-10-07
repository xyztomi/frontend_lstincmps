import { X } from "lucide-react"

/**
 * Modal component that renders a form for either login or registration.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.formType - The type of form to display, either "login" or "register".
 * @returns {JSX.Element} The rendered Modal component.
 */
export default function Modal({ formType, onClose }) {
  return (
    <div className="flex flex-col bg-background rounded-md p-2 w-full max-w-md border border-foreground absolute z-[999]">
      <button
        className="absolute top-4 right-4 text-foreground text-xl"
        onClick={ onClose }
      >
        <X />
      </button>
      <p className="text-4xl">{ formType === "login" ? "Masuk" : "Daftar" }</p>
      <form className="">
        <div>
          <input
            type="text"
            placeholder="Username"
            className="bg-black border-none outline-none text-gray-400 placeholder-gray-500 pl-2 flex-1"
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Kata Sandi"
            className="bg-black border-none outline-none text-gray-400 placeholder-gray-500 pl-2 flex-1"
          />
        </div>
        {/* retype pw for register */ }

        { formType === "register" && (<div>
          <input
            type="password"
            placeholder="Konfirmasi Kata Sandi"
            className="bg-black border-none outline-none text-gray-400 placeholder-gray-500 pl-2 flex-1"
          />
        </div>)
        }

        <button className="bg-white text-black">
          Submit
        </button>
      </form>
    </div>
  )
}