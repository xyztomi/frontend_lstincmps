"use client";
import { useState, useEffect } from "react";
import Card from "../components/Content/Card";
import Header from "../components/Header";
import { useSearchParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { categories } from "../components/Sidebar";

export default function Page() {
  const [searchQuery, setSearchQuery] = useState("");
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("kategori") ?? `Postingan ${username}`;

  const { data, refetch } = useQuery({
    queryKey: ["item"],
    queryFn: () =>
      fetch("http://localhost:3005/api/item").then((res) => res.json()),
  });

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const storedUsername = localStorage.getItem("username");
    if (storedUserId) {
      setUserId(storedUserId);
      setUsername(storedUsername);
    }
  }, []);

  const filterDataByCategoryAndUser = data?.filter((item) => {
    const isUserItem = userId ? item.userId == userId : false;
    if (search === `Postingan ${username}`) {
      return isUserItem;
    }
    return item.categoryId == search && isUserItem;
  });

  const filterData = filterDataByCategoryAndUser?.filter((item) => {
    return item.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleEdit = (item) => {
    // encode data jadi uri component ke param
    const itemState = encodeURIComponent(JSON.stringify(item));
    router.push(`/form?edit=true&itemData=${itemState}`);
  };

  const handleDelete = async (itemId) => {
    const token = localStorage.getItem("token");
    const confirmation = window.confirm(
      "Yakin? Data yang sudah dihapus tidak bisa dikembalikan.",
    );
    if (!confirmation) return;

    try {
      const response = await fetch(`http://localhost:3005/api/item/${itemId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        refetch();
      } else {
        console.error("Failed to delete item:", await response.json());
      }
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

  return (
    <>
      <Header onChange={(e) => setSearchQuery(e.target.value)} />
      <div className="p-4">
        <h1 className="text-xl pb-2">
          {searchQuery
            ? `Hasil dari: "${searchQuery}"`
            : search === `Postingan ${username}`
              ? search
              : categories.find((category) => category.id == search)?.name}
        </h1>
        {filterData?.map((item, index) => (
          <Card
            key={index}
            data={item}
            isOwner={item.userId == userId}
            onEdit={() => handleEdit(item)}
            onDelete={() => handleDelete(item.id)}
          />
        ))}
      </div>
    </>
  );
}
