
import React, { useState } from 'react';
import { toast } from "sonner";
import SearchBar from '@/components/SearchBar';
import UserProfile from '@/components/UserProfile';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';
import { fetchGithubUser, GithubUser } from '@/utils/githubApi';

const Index: React.FC = () => {
  const [user, setUser] = useState<GithubUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (username: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const userData = await fetchGithubUser(username);
      setUser(userData);
      toast.success(`Found user: ${userData.login}`);
    } catch (err) {
      setUser(null);
      setError(err instanceof Error ? err.message : "An unknown error occurred");
      toast.error(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-github-light/50">
      <header className="bg-github-dark text-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-bold text-center">GitHub User Finder</h1>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="text-center">
            <h2 className="text-xl mb-4">Search for a GitHub User</h2>
            <div className="flex justify-center">
              <SearchBar onSearch={handleSearch} isLoading={isLoading} />
            </div>
          </div>
          
          {isLoading && <LoadingSpinner />}
          
          {error && <ErrorMessage message={error} />}
          
          {user && !isLoading && !error && (
            <div className="flex justify-center">
              <UserProfile user={user} />
            </div>
          )}
          
          {!user && !isLoading && !error && (
            <div className="text-center py-8 text-gray-500">
              <p>Enter a GitHub username to see their profile</p>
            </div>
          )}
        </div>
      </main>
      
      <footer className="bg-github-dark text-white py-4 mt-auto">
        <div className="container mx-auto px-4 text-center text-sm">
          <p>Built with the GitHub API</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
