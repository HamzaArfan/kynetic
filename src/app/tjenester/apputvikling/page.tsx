"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { projects } from "@/data/projects";

// Particle effect component
const ParticleBackground = () => {
  useEffect(() => {
    const canvas = document.getElementById('particleCanvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: { x: number; y: number; size: number; speedX: number; speedY: number }[] = [];
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedX: Math.random() * 2 - 1,
        speedY: Math.random() * 2 - 1
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.fill();

        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <canvas
      id="particleCanvas"
      className="absolute inset-0"
      style={{ zIndex: 1 }}
    />
  );
};

// Floating elements component
const FloatingElements = () => {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 2 }}>
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="absolute w-24 h-24 rounded-full bg-white/5 backdrop-blur-sm"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float ${5 + i * 2}s infinite ease-in-out`,
            transform: `scale(${0.5 + Math.random()})`
          }}
        />
      ))}
    </div>
  );
};

// Scroll animation hook
const useScrollAnimation = (ref: React.RefObject<HTMLDivElement | null>) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref]);

  return { isVisible };
};

// Parallax effect hook
const useParallax = (ref: React.RefObject<HTMLDivElement | null>, speed: number = 0.5) => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const scrollY = window.scrollY;
        setOffset(scrollY * speed);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [ref, speed]);

  return { offset };
};

// Add this new hook for 3D tilt effect
const useTilt = () => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const tiltX = (y - centerY) / 20;
      const tiltY = (centerX - x) / 20;
      
      setTilt({ x: tiltX, y: tiltY });
    };

    const handleMouseLeave = () => {
      setTilt({ x: 0, y: 0 });
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return { ref, tilt };
};

// AppDemo component
const AppDemo = () => {
  const [todos, setTodos] = useState<string[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const { ref, tilt } = useTilt();

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, newTodo]);
      setNewTodo('');
    }
  };

  const removeTodo = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  return (
    <div 
      ref={ref}
      className={`w-full max-w-md mx-auto rounded-xl overflow-hidden shadow-lg transition-all duration-300 ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
      }`}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transformStyle: 'preserve-3d',
      }}
    >
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h3 className="font-medium">Demo App</h3>
        <button
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </button>
      </div>
      <div className="p-4">
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            placeholder="Add a task..."
            className="flex-1 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addTodo}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Add
          </button>
        </div>
        <div className="space-y-2">
          {todos.map((todo, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800 transition-colors"
            >
              <span>{todo}</span>
              <button
                onClick={() => removeTodo(index)}
                className="text-red-500 hover:text-red-600 transition-colors"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function AppDevelopmentPage() {
  const relevantProjects = projects.filter(project =>
    project.tags.includes('Apputvikling')
  );

  const featuresRef = useRef<HTMLDivElement>(null);
  const techStackRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const demoRef = useRef<HTMLDivElement>(null);
  const { offset } = useParallax(demoRef);

  const features = [
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h.008v.008H12v6M12 6v6h.008v.008H12v6M3.75 5.25h16.5m-16.5 7.5h16.5M3.75 15h16.5m-16.5 7.5h16.5" />
      </svg>,
      title: "Native-feeling",
      description: "We create native-feeling apps that work seamlessly across all platforms"
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h.008v.008H12v6M12 6v6h.008v.008H12v6M3.75 5.25h16.5m-16.5 7.5h16.5M3.75 15h16.5m-16.5 7.5h16.5" />
      </svg>,
      title: "Performance",
      description: "With a focus on performance"
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h.008v.008H12v6M12 6v6h.008v.008H12v6M3.75 5.25h16.5m-16.5 7.5h16.5M3.75 15h16.5m-16.5 7.5h16.5" />
      </svg>,
      title: "User Experience",
      description: "And beautiful design"
    }
  ];

  const techStack = [
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h.008v.008H12v6M12 6v6h.008v.008H12v6M3.75 5.25h16.5m-16.5 7.5h16.5M3.75 15h16.5m-16.5 7.5h16.5" />
      </svg>,
      name: "React Native"
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h.008v.008H12v6M12 6v6h.008v.008H12v6M3.75 5.25h16.5m-16.5 7.5h16.5M3.75 15h16.5m-16.5 7.5h16.5" />
      </svg>,
      name: "TypeScript"
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h.008v.008H12v6M12 6v6h.008v.008H12v6M3.75 5.25h16.5m-16.5 7.5h16.5M3.75 15h16.5m-16.5 7.5h16.5" />
      </svg>,
      name: "Firebase"
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h.008v.008H12v6M12 6v6h.008v.008H12v6M3.75 5.25h16.5m-16.5 7.5h16.5M3.75 15h16.5m-16.5 7.5h16.5" />
      </svg>,
      name: "Redux"
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h.008v.008H12v6M12 6v6h.008v.008H12v6M3.75 5.25h16.5m-16.5 7.5h16.5M3.75 15h16.5m-16.5 7.5h16.5" />
      </svg>,
      name: "Expo"
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h.008v.008H12v6M12 6v6h.008v.008H12v6M3.75 5.25h16.5m-16.5 7.5h16.5M3.75 15h16.5m-16.5 7.5h16.5" />
      </svg>,
      name: "Node.js"
    }
  ];

  const process = [
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h.008v.008H12v6M12 6v6h.008v.008H12v6M3.75 5.25h16.5m-16.5 7.5h16.5M3.75 15h16.5m-16.5 7.5h16.5" />
      </svg>,
      title: "Discovery & Planning",
      description: "We start by understanding your needs and goals"
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h.008v.008H12v6M12 6v6h.008v.008H12v6M3.75 5.25h16.5m-16.5 7.5h16.5M3.75 15h16.5m-16.5 7.5h16.5" />
      </svg>,
      title: "Design & Prototyping",
      description: "We design and create prototypes to ensure the best user experience"
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h.008v.008H12v6M12 6v6h.008v.008H12v6M3.75 5.25h16.5m-16.5 7.5h16.5M3.75 15h16.5m-16.5 7.5h16.5" />
      </svg>,
      title: "Development",
      description: "We develop the app using the latest technologies"
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h.008v.008H12v6M12 6v6h.008v.008H12v6M3.75 5.25h16.5m-16.5 7.5h16.5M3.75 15h16.5m-16.5 7.5h16.5" />
      </svg>,
      title: "Testing & QA",
      description: "We test and ensure the quality of the app"
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h.008v.008H12v6M12 6v6h.008v.008H12v6M3.75 5.25h16.5m-16.5 7.5h16.5M3.75 15h16.5m-16.5 7.5h16.5" />
      </svg>,
      title: "Launch & Support",
      description: "We launch the app and provide ongoing support"
    }
  ];

  const featuresVisible = useScrollAnimation(featuresRef);
  const techStackVisible = useScrollAnimation(techStackRef);
  const processVisible = useScrollAnimation(processRef);

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section with Particles */}
      <section className="relative h-[60vh] overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-700">
        <ParticleBackground />
        <FloatingElements />
        <div className="relative z-10 flex h-full items-center justify-center text-center">
          <div className="max-w-3xl px-4">
            <h1 className="mb-6 text-2xl md:text-5xl font-bold text-white animate-fade-in">
              Apputvikling
            </h1>
            <p className="text-base md:text-xl text-white/90 animate-fade-in-delay">
              Vi skaper moderne og brukervennlige applikasjoner som løser reelle problemer og gir verdi til dine brukere.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          {/* Left Column - Content */}
          <div className="space-y-16">
            {/* Features Section */}
            <div ref={featuresRef} className="opacity-0 transition-all duration-1000">
              <h2 className="mb-8 text-3xl font-bold text-gray-900">Nøkkelfunksjoner</h2>
              <div className="grid gap-6">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="group rounded-xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:border-blue-500 hover:shadow-lg animate-slide-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-100">
                      {feature.icon}
                    </div>
                    <h3 className="mb-2 text-xl font-semibold text-gray-900">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack Section */}
            <div ref={techStackRef} className="opacity-0 transition-all duration-1000">
              <h2 className="mb-8 text-3xl font-bold text-gray-900">Teknologistakk</h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {techStack.map((tech, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 rounded-lg border border-gray-200 bg-white p-4 transition-all duration-300 hover:border-blue-500 hover:shadow-md animate-slide-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-50">
                      {tech.icon}
                    </div>
                    <span className="font-medium text-gray-900">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Process Section */}
            <div ref={processRef} className="opacity-0 transition-all duration-1000">
              <h2 className="mb-8 text-3xl font-bold text-gray-900">Vår Prosess</h2>
              <div className="space-y-6">
                {process.map((step, index) => (
                  <div
                    key={index}
                    className="relative rounded-xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:border-blue-500 hover:shadow-lg animate-slide-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                      {step.icon}
                    </div>
                    <h3 className="mb-2 text-xl font-semibold text-gray-900">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Demo App */}
          <div className="sticky top-8">
            <div
              ref={demoRef}
              className="transform transition-transform duration-300"
              style={{ transform: `translateY(${offset * 0.1}px)` }}
            >
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xl animate-pulse">
                <AppDemo />
              </div>
            </div>
          </div>
        </div>

        {/* Portfolio Section */}
        <div className="mt-24">
          <h2 className="mb-12 text-3xl font-bold text-gray-900">Relaterte Prosjekter</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {relevantProjects.map((project, index) => (
              <div
                key={project.slug}
                className="group relative overflow-hidden rounded-xl animate-slide-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.imageAlt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="flex h-full flex-col justify-end">
                    <h3 className="mb-2 text-xl font-bold text-white">{project.title}</h3>
                    <p className="text-white/90">{project.subtitle}</p>
                    <Link
                      href={`/prosjekter/${project.slug}`}
                      className="mt-4 inline-flex items-center text-sm font-medium text-white hover:text-blue-400"
                    >
                      Les mer
                      <svg
                        className="ml-2 h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

// Add these styles to your globals.css
const styles = `
@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(5deg);
  }
}

.animate-fade-in {
  animation: fadeIn 1s ease-out;
}

.animate-fade-in-delay {
  animation: fadeIn 1s ease-out 0.3s both;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
`; 