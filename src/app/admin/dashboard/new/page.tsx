"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function NewProject() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [slug, setSlug] = useState("");
  const router = useRouter();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !image || !slug) {
      setError("Alle felt må fylles ut");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("image", image);
      formData.append("slug", slug);

      const res = await fetch("http://localhost:4000/api/projects", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error("Kunne ikke opprette prosjekt");
      router.push("/admin/dashboard");
    } catch (err) {
      setError("Feil ved opprettelse av prosjekt");
    } finally {
      setLoading(false);
    }
  };

  function handleLogout() {
    localStorage.removeItem("admin_token");
    router.replace("/admin");
  }

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col py-8 px-6 min-h-screen sticky top-0">
        <div className="mb-10 flex items-center gap-2">
          <span className="text-2xl font-extrabold tracking-tight">Admin</span>
        </div>
        <nav className="flex-1 flex flex-col gap-2">
          <button
            className="text-left px-3 py-2 rounded-lg hover:bg-gray-800 transition font-medium"
            onClick={() => router.push("/admin/dashboard")}
          >
            Dashboard
          </button>
          <button
            className="text-left px-3 py-2 rounded-lg hover:bg-gray-800 transition font-medium"
            onClick={() => router.push("/admin/dashboard/new")}
          >
            Nytt Prosjekt
          </button>
        </nav>
        <button
          className="mt-auto px-3 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition font-medium"
          onClick={handleLogout}
        >
          Logg ut
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900">Nytt Prosjekt</h1>
          <button
            onClick={() => router.back()}
            className="text-gray-600 hover:text-gray-900 border border-gray-200 rounded-lg px-3 py-1"
          >
            Tilbake
          </button>
        </div>
        {/* Form Card */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-8 w-full max-w-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-lg">
                  {error}
                </div>
              )}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Tittel
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:ring-green-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Beskrivelse
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:ring-green-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Bilde
                </label>
                <div className="mt-1 flex items-center gap-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                    required
                  />
                  {preview && (
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden">
                      <Image
                        src={preview}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
                  Slug (URL)
                </label>
                <input
                  type="text"
                  id="slug"
                  value={slug}
                  onChange={e => setSlug(e.target.value.replace(/[^a-z0-9-]/gi, '').toLowerCase())}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:ring-green-500"
                  required
                  pattern="[a-z0-9-]+"
                  title="Kun små bokstaver, tall og bindestrek"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-green-700 text-white px-6 py-2 rounded-lg hover:bg-green-800 transition disabled:opacity-50"
                >
                  {loading ? "Oppretter..." : "Opprett Prosjekt"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
} 