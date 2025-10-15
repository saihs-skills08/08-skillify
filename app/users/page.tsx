import { db } from "@/appwrite";

export default async function Users() {
  const { documents } = await db.listDocuments("db", "users");
  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">All Users</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {documents.map((doc) => (
          <div
            key={doc.$id}
            className="p-3 border rounded-lg flex items-center gap-4"
          >
            <img
              src={doc.avatar}
              alt={doc.name}
              width={50}
              height={50}
              className="rounded-lg border"
            />
            <h2 className="font-bold">{doc.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
