"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Submission {
  id: string;
  type: 'contact' | 'calculator' | 'newsletter';
  data: {
    name: string;
    email: string;
    phone?: string;
    message?: string;
    projectType?: string;
    estimatedPrice?: string;
  };
  createdAt: string;
}

export default function AdminDashboard() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    console.log('Admin dashboard loading...');
    
    // Check authentication
    const token = localStorage.getItem('adminToken');
    console.log('Auth token:', token);
    
    if (!token) {
      console.log('No auth token found, redirecting to login...');
      router.push('/admin/login');
      return;
    }

    // Fetch submissions from localStorage
    const storedSubmissions = localStorage.getItem('submissions');
    console.log('Stored submissions:', storedSubmissions);
    
    if (storedSubmissions) {
      const parsedSubmissions = JSON.parse(storedSubmissions);
      console.log('Parsed submissions:', parsedSubmissions);
      setSubmissions(parsedSubmissions);
    } else {
      console.log('No submissions found in localStorage');
    }
    
    setIsLoading(false);
  }, [router]);

  const handleLogout = () => {
    console.log('Logging out...');
    localStorage.removeItem('adminToken');
    router.push('/admin/login');
  };

  const getSubmissionTypeLabel = (type: string) => {
    switch (type) {
      case 'contact':
        return 'Kontaktskjema';
      case 'calculator':
        return 'Priskalkulator';
      case 'newsletter':
        return 'Nyhetsbrev';
      default:
        return type;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <button
              onClick={handleLogout}
              className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Logout
            </button>
          </div>

          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {submissions.map((submission) => (
                <li key={submission.id}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <p className="text-sm font-medium text-green-600 truncate">
                          {submission.data.name}
                        </p>
                        <p className="ml-2 text-sm text-gray-500">
                          ({submission.data.email})
                        </p>
                      </div>
                      <div className="ml-2 flex-shrink-0 flex">
                        <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {getSubmissionTypeLabel(submission.type)}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        {submission.data.phone && (
                          <p className="flex items-center text-sm text-gray-500">
                            Telefon: {submission.data.phone}
                          </p>
                        )}
                        {submission.data.projectType && (
                          <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                            Prosjekt: {submission.data.projectType}
                          </p>
                        )}
                        {submission.data.estimatedPrice && (
                          <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                            Estimert pris: {submission.data.estimatedPrice}
                          </p>
                        )}
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <p>
                          Mottatt: {new Date(submission.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    {submission.data.message && (
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">{submission.data.message}</p>
                      </div>
                    )}
                  </div>
                </li>
              ))}
              {submissions.length === 0 && (
                <li className="px-4 py-4 sm:px-6 text-center text-gray-500">
                  Ingen innsendinger ennå
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 