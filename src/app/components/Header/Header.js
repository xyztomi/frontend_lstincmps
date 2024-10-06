"use client"
import { Menu } from "lucide-react"
import { useState } from "react"
import Input from "./Input"
import Sidebar from "../Sidebar"

export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <header className="border-b border-foreground py-4">
        <div className="container mx-auto p-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold">LSTINCMPS</h1>
          </div>
          {/* combobox */ }
          <div className="flex items-center">
            <Input />
            {/* nested menu */ }
            <button onClick={ toggleSidebar }
              className="ml-4 bg-black rounded-md flex items-center justify-center p-2 border border-foreground min-h-[2.5rem] min-w-[2.5rem]"
            >
              <Menu size={ 20 } strokeWidth={ 0.75 } />
            </button>
          </div>
        </div>
      </header>
      {/* Sidebar */ }
      <Sidebar isOpen={ isSidebarOpen } toggleSidebar={ toggleSidebar } />
    </>

  )
}