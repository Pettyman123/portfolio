import { useState, useEffect, Suspense } from 'react';
import Header from '../components/Header';
import ThreeScene from '../components/ThreeScene';
import Projects from '../components/Projects';
import About from '../components/About';
import Skills from '../components/Skills';
import Contact from '../components/Contact';
import { Octokit } from 'octokit';
import { toast } from '../components/ui/use-toast';

// GitHub API token would typically come from an environment variable
// For demo purposes, we'll fetch without auth (rate limited)
const octokit = new Octokit({});

const Index = () => {
  const [repositories, setRepositories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const username = 'Pettyman123'; // Updated with your GitHub username

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await octokit.request('GET /users/{username}/repos', {
          username,
          sort: 'updated',
          per_page: 10
        });
        
        setRepositories(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching repositories:', error);
        toast({
          title: 'Error',
          description: 'Failed to load GitHub repositories',
          variant: 'destructive',
        });
        setIsLoading(false);
      }
    };

    fetchRepos();
  }, []);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const sections = ['home', 'about', 'projects', 'skills', 'contact'];
    
    for (let i = sections.length - 1; i >= 0; i--) {
      const section = document.getElementById(sections[i]);
      if (section && scrollPosition >= section.offsetTop - 200) {
        setActiveSection(sections[i]);
        break;
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* 3D Canvas Background */}
      <div className="canvas-container">
        <Suspense fallback={<div className="h-screen w-full flex items-center justify-center">Loading 3D Environment...</div>}>
          <ThreeScene activeSection={activeSection} />
        </Suspense>
      </div>

      {/* Content */}
      <div className="content-container">
        <Header activeSection={activeSection} />
        
        <main>
          <section id="home" className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
            <div className="glass p-8 max-w-3xl text-center">
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="text-custom-bright-purple">Hello,</span> I'm Gourav Sharma
              </h1>
              <h2 className="text-2xl md:text-3xl mb-8">
                IT & AI Developer | GitHub Enthusiast
              </h2>
              <p className="text-lg md:text-xl mb-10 text-gray-300">
                Passionate about AI & Tech, I build intelligent systems using tools like TensorFlow, MATLAB, and PyTorch. Explore my real-world ML projects — from facial emotion recognition to secure password managers — all crafted with precision and innovation
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="#projects" className="bg-custom-bright-purple hover:bg-custom-purple text-white px-6 py-3 rounded-lg font-medium transition-all duration-300">
                  View Projects
                </a>
                <a href="#contact" className="border border-custom-bright-purple text-custom-bright-purple hover:bg-custom-bright-purple hover:bg-opacity-10 px-6 py-3 rounded-lg font-medium transition-all duration-300">
                  Contact Me
                </a>
                <a href="https://github.com/Pettyman123" target="_blank" rel="noopener noreferrer" className="border border-custom-bright-purple text-custom-bright-purple hover:bg-custom-bright-purple hover:bg-opacity-10 px-6 py-3 rounded-lg font-medium transition-all duration-300">
                  View All Repositories
                </a>
              </div>
            </div>
          </section>

          <About />
          
          <Projects repositories={repositories} isLoading={isLoading} />
          
          <Skills />
          
          <Contact />
        </main>
      </div>
    </div>
  );
};

export default Index;
