"use client"
import { useState } from "react";
import Card from "./components/Content/Card";
import Header from "./components/Header";
import { useSearchParams } from 'next/navigation'


export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')

  const searchParams = useSearchParams()
  const search = searchParams.get('kategori') ?? 'Postingan terbaru'



  return (
    <>
      <Header onChange={ (e) => setSearchQuery(e.target.value) } />
      {/* <p>{ searchQuery }</p> */ }
      <div className="p-4">
        <h1 className="text-xl pb-2">
          { searchQuery ? `Hasil dari: "${searchQuery}"` : `${search}:` }
        </h1>
        <Card data = {''}/>
      </div>
    </>
  );
}
