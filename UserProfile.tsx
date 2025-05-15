
import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { GithubUser } from '../utils/githubApi';

interface UserProfileProps {
  user: GithubUser;
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  return (
    <Card className="w-full max-w-2xl animate-fade-in shadow-lg">
      <CardHeader className="pb-2">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="flex-shrink-0">
            <img 
              src={user.avatar_url} 
              alt={`${user.login}'s avatar`} 
              className="w-24 h-24 rounded-full border-4 border-github-light"
            />
          </div>
          
          <div className="flex-1">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
              <div>
                <h2 className="text-2xl font-bold">{user.name || user.login}</h2>
                <a 
                  href={user.html_url} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-github-blue hover:underline"
                >
                  @{user.login}
                </a>
              </div>
              
              <Button 
                size="sm"
                variant="outline"
                className="border-github-blue text-github-blue hover:bg-github-blue hover:text-white"
                onClick={() => window.open(user.html_url, '_blank')}
              >
                View on GitHub
              </Button>
            </div>
            
            {user.bio && (
              <p className="mt-2 text-gray-600">{user.bio}</p>
            )}
          </div>
        </div>
      </CardHeader>
      
      <Separator />
      
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <Badge variant="secondary" className="bg-github-light text-github-dark">
                Followers: {user.followers}
              </Badge>
              <Badge variant="secondary" className="bg-github-light text-github-dark">
                Following: {user.following}
              </Badge>
            </div>
            
            <div className="flex gap-2">
              <Badge variant="secondary" className="bg-github-light text-github-dark">
                Repos: {user.public_repos}
              </Badge>
              <Badge variant="secondary" className="bg-github-light text-github-dark">
                Gists: {user.public_gists}
              </Badge>
            </div>
          </div>
          
          <div className="space-y-1">
            {user.location && (
              <p className="text-sm">
                <span className="font-medium">Location:</span> {user.location}
              </p>
            )}
            {user.company && (
              <p className="text-sm">
                <span className="font-medium">Company:</span> {user.company}
              </p>
            )}
            {user.blog && (
              <p className="text-sm truncate">
                <span className="font-medium">Website:</span>{' '}
                <a 
                  href={/^https?:\/\//.test(user.blog) ? user.blog : `https://${user.blog}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-github-blue hover:underline"
                >
                  {user.blog}
                </a>
              </p>
            )}
            {user.twitter_username && (
              <p className="text-sm">
                <span className="font-medium">Twitter:</span>{' '}
                <a 
                  href={`https://twitter.com/${user.twitter_username}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-github-blue hover:underline"
                >
                  @{user.twitter_username}
                </a>
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfile;
