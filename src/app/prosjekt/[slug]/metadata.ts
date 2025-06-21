import { Metadata } from 'next';
import { projects } from "@/data/projects";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = projects.find((p) => p.slug === params.slug);
  
  if (!project) {
    return {
      title: 'Prosjekt ikke funnet',
      description: 'Beklager, men prosjektet du leter etter kunne ikke bli funnet.',
    };
  }

  return {
    title: project.title,
    description: project.subtitle,
    openGraph: {
      title: project.title,
      description: project.subtitle,
      images: [
        {
          url: project.image,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.subtitle,
      images: [project.image],
    },
  };
} 