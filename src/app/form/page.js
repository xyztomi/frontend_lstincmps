"use client";

import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "../components/Header";
import Image from "next/image";

const BASE_URL = "http://localhost:3005/api";
const categories = [
  { name: "Aksesoris", id: 1 },
  { name: "Buku dan Alat Tulis", id: 2 },
  { name: "Elektronik", id: 3 },
  { name: "Kartu Identitas", id: 4 },
  { name: "Kunci", id: 5 },
  { name: "Tas dan Dompet", id: 6 },
  { name: "Lain Lain", id: 7 },
];

const postItem = async (formData) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${BASE_URL}/item/post`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Gagal menyimpan item");
  }

  return await response.json();
};

const updateItem = async (id, formData) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/item/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Gagal update item");
  }

  return await response.json();
};

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const itemId = searchParams.get("id");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
    }
  }, [router]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "",
    image_url: null,
    categoryId: "",
    existingImage: "",
  });

  useEffect(() => {
    if (itemId) {
      fetch(`${BASE_URL}/item/${itemId}`)
        .then((res) => res.json())
        .then((data) => {
          setFormData({
            ...data,
            existingImage: data.image_url,
            image_url: null,
          });
        })
        .catch((err) => console.error("Failed to fetch item:", err));
    }
  }, [itemId]);

  const mutation = useMutation({
    mutationFn: itemId ? (formData) => updateItem(itemId, formData) : postItem,
    onSuccess: (data) => {
      console.log("Item berhasil disimpan:", data);
      router.push("/profil");
    },
    onError: (error) => {
      console.error("Error menyimpan item:", error.message);
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFormData((prev) => ({
        ...prev,
        image_url: e.target.files[0],
        existingImage: null,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSubmit = new FormData();
    formDataToSubmit.append("title", formData.title);
    formDataToSubmit.append("description", formData.description);
    formDataToSubmit.append("status", formData.status);
    formDataToSubmit.append("categoryId", formData.categoryId);

    if (formData.image_url) {
      formDataToSubmit.append("image_url", formData.image_url);
    }

    mutation.mutate(formDataToSubmit);
  };

  return (
    <>
      <Header onChange={(e) => console.log(e)} />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl mb-4">
          {itemId ? "Edit Barang" : "Tambah barang baru"}
        </h1>
        <form className="my-2 space-y-3" onSubmit={handleSubmit}>
          <div className="flex items-center bg-black rounded-md p-2 w-full max-w-md border border-foreground">
            <input
              type="text"
              placeholder="Judul Barang"
              name="title"
              className="input bg-black border-none outline-none text-gray-400 placeholder-gray-500 pl-2 flex-1"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="flex items-center bg-black rounded-md p-2 w-full max-w-md border border-foreground">
            <textarea
              placeholder="Deskripsi Barang"
              name="description"
              className="textarea bg-black border-none outline-none text-gray-400 placeholder-gray-500 pl-2 flex-1"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="flex items-center bg-black rounded-md p-2 w-full max-w-md border border-foreground">
            <select
              name="categoryId"
              className="select bg-black border-none outline-none text-gray-400 placeholder-gray-500 pl-2 flex-1"
              value={formData.categoryId}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>
                Pilih Kategori
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            {formData.existingImage && (
              <div className="max-w-md relative h-[200px]">
                {" "}
                <Image
                  src={`http://localhost:3005/public${formData.existingImage}`}
                  fill
                  style={{ objectFit: "cover" }}
                  alt="Current image"
                  className="rounded-md"
                />
                <p className="text-gray-400 text-sm mt-2">Current image</p>
              </div>
            )}
            <div className="flex items-center bg-black rounded-md p-2 w-full max-w-md border border-foreground">
              <input
                type="file"
                name="image_url"
                accept="image/png, image/jpeg"
                className="input bg-black border-none outline-none text-gray-400 placeholder-gray-500 pl-2 flex-1"
                onChange={handleFileChange}
                required={!itemId}
              />
            </div>
          </div>

          <div className="flex items-center bg-black rounded-md p-2 w-full max-w-md border border-foreground">
            <select
              name="status"
              className="select bg-black border-none outline-none text-gray-400 placeholder-gray-500 pl-2 flex-1"
              value={formData.status}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>
                Status Barang
              </option>
              <option value="lost">Lost</option>
              <option value="found">Found</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-foreground text-black py-2 px-2 rounded-md max-w-xs"
          >
            {mutation.isLoading ? "Processing..." : "Submit"}
          </button>
        </form>

        {mutation.isError && (
          <p className="text-red-500 mt-2">Error: {mutation.error.message}</p>
        )}
        {mutation.isSuccess && (
          <p className="text-green-500 mt-2">Barang telah dipost!</p>
        )}
      </div>
    </>
  );
}
