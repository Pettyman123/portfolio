import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Skeleton } from './ui/skeleton';
import { ArrowRight, Github } from 'lucide-react';

interface Repository {
  id: number;
  name: string;
  html_url: string;
  description: string;
  language: string;
  stargazers_count: number;
  topics: string[];
  updated_at: string;
}

interface ProjectsProps {
  repositories: Repository[];
  isLoading: boolean;
}

const Projects = ({ repositories, isLoading }: ProjectsProps) => {
  // Function to get a color for a programming language
  const getLanguageColor = (language: string) => {
    const colors = {
      JavaScript: 'bg-yellow-400',
      TypeScript: 'bg-blue-400',
      Python: 'bg-green-400',
      Java: 'bg-red-400',
      'C#': 'bg-purple-400',
      PHP: 'bg-indigo-400',
      Go: 'bg-cyan-400',
      Ruby: 'bg-red-500',
      Rust: 'bg-orange-400',
      // Add more languages as needed
      default: 'bg-gray-400'
    };
    
    return colors[language] || colors.default;
  };
  
  // Function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="glass p-8 mb-12">
          <h2 className="text-4xl font-bold mb-3 text-center">
            <span className="text-custom-bright-purple">GitHub</span> Projects
          </h2>
          <p className="text-lg text-center text-gray-300 mb-12">
            Explore my latest repositories and contributions
          </p>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="glass border-gray-700">
                  <CardHeader className="space-y-2">
                    <Skeleton className="h-6 w-2/3 bg-gray-700" />
                    <Skeleton className="h-4 w-full bg-gray-700" />
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Skeleton className="h-4 w-full bg-gray-700" />
                    <Skeleton className="h-4 w-3/4 bg-gray-700" />
                    <div className="flex gap-2">
                      <Skeleton className="h-6 w-16 rounded-full bg-gray-700" />
                      <Skeleton className="h-6 w-16 rounded-full bg-gray-700" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : repositories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {repositories.map((repo) => (
                <Card key={repo.id} className="project-card glass border-gray-700 overflow-hidden">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl font-bold text-custom-bright-purple">
                        {repo.name}
                      </CardTitle>
                      <Badge variant="outline" className="text-xs">
                        {repo.stargazers_count} ★
                      </Badge>
                    </div>
                    <CardDescription className="text-sm text-gray-400">
                      Updated on {formatDate(repo.updated_at)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-sm text-gray-300">
                      {repo.description || "No description available"}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {repo.language && (
                        <Badge className={`${getLanguageColor(repo.language)} text-black`}>
                          {repo.language}
                        </Badge>
                      )}
                      {repo.topics && repo.topics.slice(0, 3).map((topic) => (
                        <Badge key={topic} variant="outline" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                    <a 
                      href={repo.html_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <Button variant="outline" size="sm" className="w-full">
                        <Github className="mr-2 h-4 w-4" />
                        View Repository
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-gray-400">
                Loading repositories from GitHub...
              </p>
              <p className="text-sm text-gray-500 mt-2">
                If repositories don't appear, please check your network connection or try refreshing the page.
              </p>
            </div>
          )}
          
          <div className="mt-12 text-center">
            <a 
              href="https://github.com/Pettyman123" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-custom-bright-purple hover:underline"
            >
              View all repositories on GitHub
              <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
