"use client";
import { useState } from "react";
import Card from "./components/Content/Card";
import Header from "./components/Header";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { categories } from "./components/Sidebar";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const searchParams = useSearchParams();
  const search = searchParams.get("kategori") ?? "Postingan terbaru";

  const { data } = useQuery({
    queryKey: ["item", statusFilter],
    queryFn: () =>
      fetch(`http://localhost:3005/api/item?status=${statusFilter}`).then(
        (res) => res.json(),
      ),
  });

  const filterDataByCategory = data?.filter((item) => {
    return search === "Postingan terbaru" || item.categoryId == search;
  });

  const filterData = filterDataByCategory?.filter((item) => {
    return item.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <>
      <Header onChange={(e) => setSearchQuery(e.target.value)} />
      {/* <p>{ searchQuery }</p> */}
      <div className="p-4">
        <div className="mb-4">
          <label className="mr-2 ">Status hilang:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 bg-black border-none outline-none text-gray-400 placeholder-gray-500 pl-2 flex-1"
          >
            <option value="all">All</option>
            <option value="lost">Lost</option>
            <option value="found">Found</option>
          </select>
        </div>
        <h1 className="text-xl pb-2">
          {searchQuery
            ? `Hasil dari: "${searchQuery}"`
            : `${
                search === "Postingan terbaru"
                  ? search
                  : `${
                      categories.find((category) => {
                        return category.id == search;
                      }).name
                    }:`
              }`}
        </h1>
        {filterData?.map((data, index) => {
          return <Card key={index} data={data} />;
        })}
      </div>
    </>
  );
}
