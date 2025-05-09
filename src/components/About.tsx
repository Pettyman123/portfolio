import { Button } from './ui/button';

const About = () => {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="glass p-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                About <span className="text-custom-bright-purple">Me</span>
              </h2>
              
              <p className="text-lg mb-6 text-gray-300">
                Hi there! I'm Gourav Sharma, an IT professional and AI enthusiast with a passion for creating innovative solutions using code. As a final year Information Technology Engineering student, I specialize in building applications that are both functional and user-friendly.
              </p>
              
              <p className="text-lg mb-6 text-gray-300">
                My expertise spans across various domains including web development, artificial intelligence, machine learning, and IoT. I'm constantly exploring new technologies and methodologies to enhance my skillset.
              </p>
              
              <p className="text-lg mb-8 text-gray-300">
                When I'm not coding, you can find me contributing to open source projects, working on IoT projects, or experimenting with new programming languages and frameworks.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <a href="public/resume.pdf" target="_blank" rel="noopener noreferrer" download>
                  <Button className="bg-custom-bright-purple hover:bg-custom-purple">
                    Download Resume
                  </Button>
                </a>
                <a href="#contact">
                  <Button variant="outline" className="border-custom-bright-purple text-custom-bright-purple">
                    Get in Touch
                  </Button>
                </a>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square w-full max-w-md mx-auto overflow-hidden rounded-lg border-4 border-custom-bright-purple shadow-xl">
                <img 
                  src="public/me.png" 
                  alt="Gourav Sharma" 
                  className="w-full h-full object-cover"
                />
                
                {/* Experience badges */}
                <div className="absolute -bottom-5 -right-5 bg-custom-bright-purple text-white py-2 px-4 rounded-lg shadow-lg">
                  <span className="font-bold">4+ Years</span> Experience
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
