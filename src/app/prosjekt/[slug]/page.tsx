"use client";

import { useParams } from "next/navigation";
import { projects } from "@/data/projects";
import Image from "next/image";
import Link from "next/link";

export default function ProjectPage() {
  const params = useParams();
  
  if (!params) {
    return <div>Loading...</div>;
  }
  
  const slug = typeof params.slug === 'string' ? params.slug : params.slug[0];
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <main className="bg-gray-50 min-h-screen w-full flex flex-col items-center">
      <section className="w-full flex justify-center bg-gray-50 pt-12 pb-0">
        <div className="w-full max-w-5xl mx-auto flex flex-col gap-6 px-6">
          <div className="flex flex-col gap-4">
            <div className="flex gap-2 mb-1">
              {project.tags.map((tag) => (
                <span key={tag} className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-full">{tag}</span>
              ))}
            </div>
            <h1 className="text-3xl font-bold text-gray-900">{project.title}</h1>
            <p className="text-lg text-gray-600">{project.subtitle}</p>
            <div className="flex flex-col gap-2 mt-2">
              <div>
                <span className="font-semibold text-gray-700 text-sm mr-2">TEKNOLOGIER BRUKT</span>
                <span className="inline-flex items-center gap-2 text-sm text-gray-700">
                  {project.tech.map((tech) => (
                    <span key={tech.name} className="flex items-center gap-1">
                      {tech.iconType === 'svg' ? (
                        <Image 
                          src={`/${tech.icon}`}
                          alt={tech.name}
                          width={18}
                          height={18}
                          className="object-contain"
                        />
                      ) : (
                        <span style={{ color: tech.iconColor, fontWeight: 700 }}>{tech.icon}</span>
                      )}
                      {tech.name}
                    </span>
                  ))}
                </span>
              </div>
              <div className="flex gap-8 text-sm text-gray-700 mt-2">
                <span><span className="font-semibold">KUNDE</span><br />{project.client}</span>
                <span><span className="font-semibold">ÅR</span><br />{project.year}</span>
              </div>
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="mt-2 font-semibold text-gray-800 hover:underline flex items-center gap-1">{project.link.replace('https://', '')} <span aria-hidden>→</span></a>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full flex justify-center bg-gray-50 pt-8 pb-0">
        <div className="w-full max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-xl">
          <Image src={project.image} alt={project.imageAlt} width={1600} height={600} className="w-full h-auto object-cover" />
        </div>
      </section>
    </main>
  );
} 