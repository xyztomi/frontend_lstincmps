import { Search } from 'lucide-react';

export default function Input() {
  return(
    <div className="flex items-center bg-black rounded-md p-2 w-full max-w-md border border-foreground">
      <Search color="#dddd" size={18}/>
      <input
        type="text"
        placeholder="Cari barang hilang"
        className="bg-transparent border-none outline-none text-gray-400 placeholder-gray-500 pl-2 flex-1"
      />
    </div>
  )
}