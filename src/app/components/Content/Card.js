import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Card({ data, isOwner, onEdit, onDelete }) {
  const router = useRouter();
  const handleEdit = () => {
    router.push(
      `/form?id=${data.id}&title=${data.title}&description=${data.description}&status=${data.status}&categoryId=${data.categoryId}&image_url=${data.image_url}`,
    );
  };

  return (
    <article className="bg-black border border-foreground rounded-md mb-4">
      <figure className="bg-white bg-cover border-b rounded-t-sm aspect-square relative w-full">
        <Image
          src={`http://localhost:3005/public${data.image_url}`}
          fill
          style={{ objectFit: "cover" }}
          alt={data.title}
        />
      </figure>
      <header className="p-4 border-b">
        {/* judul */}
        <a>
          <h3 className="text-xl font-bold">{data.title}</h3>
        </a>
        {/* user */}
        <a>
          <p className="text-sm underline">{data.User.username}</p>
        </a>
        <a>
          <p className="text-sm underline">
            {new Date(data.updatedAt).toLocaleDateString("en-GB", {
              year: "2-digit",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </a>
      </header>
      {/* grid */}
      <div className="grid grid-cols-4 divide-x">
        {/* desc of the item */}
        <div className="p-4 col-span-3">
          <p>{data.description}</p>
        </div>
        {/* lost ? found */}
        <div
          className={`p-4 ${
            data.status === "lost"
              ? "bg-red-600 text-white"
              : "bg-green-600 text-white"
          }`}
        >
          <p>{data.status.toUpperCase()}</p>
        </div>
      </div>
      {isOwner && (
        <footer className="py-4 border">
          <button
            onClick={handleEdit}
            className="px-4 py-2 text-sm font-medium text-white rounded hover:animate-pulse transition"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-500 transition"
          >
            Hapus
          </button>
        </footer>
      )}
    </article>
  );
}
