
import { useRef, useState } from 'react';
import { Progress } from './ui/progress';
import { Card, CardContent } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

const SkillBar = ({ name, level, color }: { name: string; level: number; color: string }) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between mb-2">
        <span className="font-medium text-sm">{name}</span>
        <span className="text-xs text-gray-400">{level}%</span>
      </div>
      <Progress value={level} className="h-2" 
        style={{ 
          backgroundColor: 'rgba(255,255,255,0.1)',
          '--progress-background': color 
        } as React.CSSProperties} 
      />
    </div>
  );
};

const Skills = () => {
  const [activeTab, setActiveTab] = useState('technical');
  
  const skillCategories = [
    {
      id: 'technical',
      title: 'Technical',
      skills: [
        
        { name: 'Python', level: 95, color: '#3776ab' },
        { name: 'Machine Learning', level: 85, color: '#ff6b6b' },
        { name: 'Deep Learning', level: 85, color: '#ff6b6b' },
        { name: 'Natural Language Processing', level: 85, color: '#ff6b6b' },
        { name: 'Cloud Services', level: 60, color: '#0ea5e9' },
        { name: 'IOT', level: 80, color: '#0ea5e9' },
        { name: 'JavaScript/TypeScript', level: 50, color: '#f7df1e' },
        { name: 'React', level: 50, color: '#61dafb' },
      ]
    },
    {
      id: 'frameworks',
      title: 'Frameworks',
      skills: [
        
        { name: 'TensorFlow', level: 75, color: '#ff6f00' },
        { name: 'PyTorch', level: 75, color: '#ff6f00' },
        { name: 'Django', level: 80, color: '#092e20' },
        { name: 'Numpy', level: 80, color: '#092e20' },
        { name: 'CUDA', level: 70, color: '#092e20' },
        { name: 'MPI', level: 70, color: '#092e20' },
        { name: 'Express.js', level: 50, color: '#888888' },
        { name: 'Three.js', level: 50, color: '#049ef4' },
        { name: 'OpenCV', level: 85, color: '#049ef4' },
        { name: 'Next.js', level: 85, color: '#000000' },
      ]
    },
    {
      id: 'tools',
      title: 'Tools',
      skills: [
        { name: 'Git & GitHub', level: 90, color: '#f05032' },
        { name: 'Docker', level: 75, color: '#2496ed' },
        { name: 'AWS', level: 80, color: '#ff9900' },
        { name: 'CI/CD', level: 70, color: '#4caf50' },
        { name: 'VS Code', level: 95, color: '#007acc' },
        { name: 'Jupyter Notebook', level: 95, color: '#007acc' },
        { name: 'Anaconda', level: 80, color: '#007acc' },
        { name: 'SIEM', level: 70, color: '#007acc' },
        { name: 'WireShark', level: 70, color: '#007acc' },
        { name: 'Kali Linux', level: 85, color: '#007acc' },
        { name: 'Nmap', level: 85, color: '#007acc' },
        { name: 'MatLab', level: 85, color: '#007acc' },

      ]
    },
  ];
  
  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="glass p-8 mb-12">
          <h2 className="text-4xl font-bold mb-3 text-center">
            My <span className="text-custom-bright-purple">Skills</span>
          </h2>
          <p className="text-lg text-center text-gray-300 mb-12">
            Technologies and tools I work with
          </p>
          
          <Tabs defaultValue="technical" className="w-full" 
            onValueChange={(value) => setActiveTab(value)}
          >
            <div className="flex justify-center mb-8">
              <TabsList className="bg-gray-800">
                {skillCategories.map((category) => (
                  <TabsTrigger 
                    key={category.id}
                    value={category.id}
                    className={activeTab === category.id ? 
                      'data-[state=active]:bg-custom-bright-purple data-[state=active]:text-white' : 
                      'text-gray-400'}
                  >
                    {category.title}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            
            {skillCategories.map((category) => (
              <TabsContent key={category.id} value={category.id} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div>
                    {category.skills.slice(0, Math.ceil(category.skills.length / 2)).map((skill, index) => (
                      <SkillBar 
                        key={index}
                        name={skill.name}
                        level={skill.level}
                        color={skill.color}
                      />
                    ))}
                  </div>
                  <div>
                    {category.skills.slice(Math.ceil(category.skills.length / 2)).map((skill, index) => (
                      <SkillBar 
                        key={index}
                        name={skill.name}
                        level={skill.level}
                        color={skill.color}
                      />
                    ))}
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
          
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {['React', 'Node.js', 'Python', 'AWS', 'TensorFlow', 'Git', 'Docker', 'VS Code', 'JavaScript', 'TypeScript'].map((tech) => (
              <Card key={tech} className="bg-gray-800 border-gray-700">
                <CardContent className="flex items-center justify-center p-6">
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 bg-gray-700 rounded-full flex items-center justify-center">
                      {/* Placeholder for tech logo */}
                      <span className="text-xs font-code">{tech.substring(0, 2)}</span>
                    </div>
                    <p className="text-sm font-medium">{tech}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
