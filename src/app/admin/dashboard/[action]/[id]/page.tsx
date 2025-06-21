"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  order: number;
}

export default function ProjectForm({
  params,
}: {
  params: { action: string; id: string };
}) {
  const [project, setProject] = useState<Partial<Project>>({
    title: "",
    description: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const isEdit = params.action === "edit";

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("admin_token");
    if (!token) {
      router.replace("/admin");
      return;
    }

    // If editing, fetch project data
    if (isEdit) {
      fetchProject();
    }
  }, []);

  async function fetchProject() {
    try {
      const res = await fetch(`http://localhost:4000/api/projects/${params.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
        },
      });
      if (!res.ok) throw new Error("Kunne ikke hente prosjekt");
      const data = await res.json();
      setProject(data);
    } catch (err) {
      setError("Feil ved henting av prosjekt");
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const url = isEdit
        ? `http://localhost:4000/api/projects/${params.id}`
        : "http://localhost:4000/api/projects";
      
      const res = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(project),
      });

      if (!res.ok) throw new Error("Kunne ikke lagre prosjekt");
      router.push("/admin/dashboard");
    } catch (err) {
      setError("Feil ved lagring av prosjekt");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <h1 className="text-2xl font-bold mb-6">
            {isEdit ? "Rediger Prosjekt" : "Nytt Prosjekt"}
          </h1>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded mb-6">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tittel
              </label>
              <input
                type="text"
                value={project.title}
                onChange={(e) =>
                  setProject((prev) => ({ ...prev, title: e.target.value }))
                }
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-700 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Beskrivelse
              </label>
              <textarea
                value={project.description}
                onChange={(e) =>
                  setProject((prev) => ({ ...prev, description: e.target.value }))
                }
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-700 focus:border-transparent h-32"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bilde URL
              </label>
              <input
                type="url"
                value={project.image}
                onChange={(e) =>
                  setProject((prev) => ({ ...prev, image: e.target.value }))
                }
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-700 focus:border-transparent"
                required
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-green-700 text-white px-6 py-2 rounded-lg hover:bg-green-800 transition disabled:opacity-50"
              >
                {loading ? "Lagrer..." : isEdit ? "Oppdater" : "Opprett"}
              </button>
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-2 border rounded-lg hover:bg-gray-50 transition"
              >
                Avbryt
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 