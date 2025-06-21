"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  order: number;
  status: "planning" | "in-progress" | "review" | "completed";
  startDate: string;
  endDate: string;
  client: string;
  progress: number;
}

const statusMeta = {
  planning: {
    color: "bg-blue-100 text-blue-700 border-blue-200",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2a4 4 0 014-4h4" />
        <circle cx="9" cy="7" r="4" />
      </svg>
    ),
    label: "Planlegging",
  },
  "in-progress": {
    color: "bg-yellow-100 text-yellow-700 border-yellow-200",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3" />
        <circle cx="12" cy="12" r="10" />
      </svg>
    ),
    label: "Under Utvikling",
  },
  review: {
    color: "bg-purple-100 text-purple-700 border-purple-200",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12h.01M12 12h.01M9 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: "Under Gjennomgang",
  },
  completed: {
    color: "bg-green-100 text-green-700 border-green-200",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
    label: "Fullført",
  },
};

export default function AdminDashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "planning" | "in-progress" | "review" | "completed">("all");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      router.replace("/admin");
      return;
    }
    fetchProjects();
  }, []);

  async function fetchProjects() {
    try {
      const res = await fetch("http://localhost:4000/api/projects", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
        },
      });
      if (!res.ok) throw new Error("Kunne ikke hente prosjekter");
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      setError("Feil ved henting av prosjekter");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Er du sikker på at du vil slette dette prosjektet?")) return;
    try {
      const res = await fetch(`http://localhost:4000/api/projects/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
        },
      });
      if (!res.ok) throw new Error("Kunne ikke slette prosjekt");
      await fetchProjects();
    } catch (err) {
      setError("Feil ved sletting av prosjekt");
    }
  }

  async function handleReorder(id: number, direction: "up" | "down") {
    try {
      const res = await fetch(`http://localhost:4000/api/projects/${id}/reorder`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ direction }),
      });
      if (!res.ok) throw new Error("Kunne ikke endre rekkefølge");
      await fetchProjects();
    } catch (err) {
      setError("Feil ved endring av rekkefølge");
    }
  }

  async function handleStatusChange(id: number, status: Project["status"]) {
    try {
      const res = await fetch(`http://localhost:4000/api/projects/${id}/status`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Kunne ikke oppdatere status");
      await fetchProjects();
    } catch (err) {
      setError("Feil ved oppdatering av status");
    }
  }

  function handleRefresh() {
    setLoading(true);
    fetchProjects();
  }

  function handleLogout() {
    localStorage.removeItem("admin_token");
    router.replace("/admin");
  }

  const filteredProjects = projects.filter(project => 
    activeTab === "all" ? true : project.status === activeTab
  );

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-50 via-white to-green-50">
      {/* Sidebar */}
      <aside className="w-72 bg-white/80 backdrop-blur border-r border-gray-200 flex flex-col py-8 px-6 min-h-screen sticky top-0 shadow-xl z-20">
        <div className="mb-10 flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-700 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-2xl tracking-tight">A</span>
          </div>
          <span className="text-2xl font-extrabold text-gray-900 tracking-tight">Agency Admin</span>
        </div>
        <nav className="flex-1 flex flex-col gap-2 mt-4">
          <span className="text-xs text-gray-400 font-semibold mb-1 pl-2">SEKSJONER</span>
          <button
            className={`text-left px-4 py-3 rounded-lg transition font-medium flex items-center gap-3 ${activeTab === "all" ? "bg-green-50 text-green-700" : "text-gray-700 hover:bg-gray-50"}`}
            onClick={() => setActiveTab("all")}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            Prosjekter
          </button>
          <button
            className="text-left px-4 py-3 rounded-lg transition font-medium text-gray-700 flex items-center gap-3 hover:bg-gray-50"
            onClick={() => router.push("/admin/dashboard/new")}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Nytt Prosjekt
          </button>
          <button
            className="text-left px-4 py-3 rounded-lg transition font-medium text-gray-700 flex items-center gap-3 hover:bg-gray-50"
            onClick={() => router.push("/admin/dashboard/clients")}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Kunder
          </button>
          <button
            className="text-left px-4 py-3 rounded-lg transition font-medium text-gray-700 flex items-center gap-3 hover:bg-gray-50"
            onClick={() => router.push("/admin/dashboard/calendar")}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Kalender
          </button>
        </nav>
        <button
          className="mt-auto px-4 py-3 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition font-medium flex items-center gap-3 shadow-sm"
          onClick={handleLogout}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logg ut
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen relative">
        {/* Top Bar */}
        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-gray-200 px-8 py-6 flex items-center justify-between shadow-md">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Administrer Prosjekter</h1>
          <div className="flex items-center gap-3">
            <button
              onClick={handleRefresh}
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 border border-gray-200 rounded-lg px-4 py-2 flex items-center gap-2 transition shadow-sm"
              title="Oppdater liste"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Oppdater
            </button>
            <button
              onClick={() => router.push("/admin/dashboard/new")}
              className="bg-gradient-to-br from-green-500 to-green-700 text-white px-5 py-2 rounded-lg hover:scale-105 hover:shadow-lg transition flex items-center gap-2 font-semibold shadow-md"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Nytt Prosjekt
            </button>
          </div>
        </div>

        {/* Status Tabs */}
        <div className="px-8 pt-8">
          <div className="flex gap-2 border-b border-gray-200">
            {(["all", "planning", "in-progress", "review", "completed"] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 font-semibold text-sm rounded-t-lg transition-all duration-200 flex items-center gap-1 ${
                  activeTab === tab
                    ? tab === "all"
                      ? "text-green-700 border-b-2 border-green-600 bg-green-50"
                      : statusMeta[tab as keyof typeof statusMeta].color + " border-b-2 " + statusMeta[tab as keyof typeof statusMeta].color.split(" ")[1]
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab !== "all" && statusMeta[tab as keyof typeof statusMeta].icon}
                {tab === "all" ? "Alle Prosjekter" : statusMeta[tab as keyof typeof statusMeta].label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects List */}
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <div className="col-span-full flex justify-center items-center h-40">
              <div className="flex flex-col items-center gap-3">
                <div className="w-10 h-10 border-4 border-gray-200 border-t-green-600 rounded-full animate-spin"></div>
                <span className="text-gray-600 font-medium">Laster prosjekter...</span>
              </div>
            </div>
          ) : error ? (
            <div className="col-span-full flex justify-center items-center h-40">
              <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg flex items-center gap-2 shadow">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </div>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="col-span-full flex justify-center items-center h-40">
              <div className="text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow">
                  <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                </div>
                <span className="text-gray-500 font-medium">Ingen prosjekter funnet</span>
              </div>
            </div>
          ) : (
            filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className="bg-white/90 rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-200 group relative overflow-hidden flex flex-col"
                style={{ minHeight: 420 }}
              >
                <div className="relative aspect-video rounded-t-2xl overflow-hidden">
                  <Image
                    src={project.image.startsWith('http') ? project.image : `/uploads/${project.image}`}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200"></div>
                  <span className={`absolute top-4 left-4 px-3 py-1 rounded-full border text-xs font-semibold flex items-center gap-1 shadow ${statusMeta[project.status].color}`}>{statusMeta[project.status].icon}{statusMeta[project.status].label}</span>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900 truncate max-w-[70%]">{project.title}</h3>
                    <select
                      value={project.status}
                      onChange={(e) => handleStatusChange(project.id, e.target.value as Project["status"])}
                      className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusMeta[project.status].color} ml-2`}
                    >
                      <option value="planning">Planlegging</option>
                      <option value="in-progress">Under Utvikling</option>
                      <option value="review">Under Gjennomgang</option>
                      <option value="completed">Fullført</option>
                    </select>
                  </div>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-4 flex-1">
                    {project.description}
                  </p>
                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-gray-500">Fremgang</span>
                      <span className="text-gray-900 font-semibold">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  {/* Timeline */}
                  <div className="mb-4 text-xs text-gray-500 flex gap-4">
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>Start: {new Date(project.startDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>Slutt: {new Date(project.endDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                  {/* Client Info */}
                  <div className="mb-4 text-xs text-gray-500 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span>Kunde: {project.client}</span>
                  </div>
                  <div className="flex items-center justify-between mt-auto pt-2">
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleReorder(project.id, "up")}
                        disabled={index === 0}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg disabled:opacity-50 transition"
                        title="Flytt opp"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleReorder(project.id, "down")}
                        disabled={index === projects.length - 1}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg disabled:opacity-50 transition"
                        title="Flytt ned"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => router.push(`/admin/dashboard/edit/${project.id}`)}
                        className="px-3 py-1.5 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition flex items-center gap-1 font-semibold"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Rediger
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="px-3 py-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition flex items-center gap-1 font-semibold"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Slett
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {/* Floating New Project Button (Mobile) */}
        <button
          onClick={() => router.push("/admin/dashboard/new")}
          className="fixed bottom-8 right-8 z-30 bg-gradient-to-br from-green-500 to-green-700 text-white p-4 rounded-full shadow-xl hover:scale-110 transition-all duration-200 flex items-center gap-2 md:hidden"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </main>
    </div>
  );
} 