
import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Menu } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
}

const Header = ({ activeSection }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Navigation links
  const navItems = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'Contact', href: '#contact', id: 'contact' }
  ];

  // Handle scroll event to change header appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'py-3 glass' : 'py-6 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <a href="#home" className="text-2xl font-bold text-custom-bright-purple">
          <span className="font-code">&lt;</span>
          Portfolio
          <span className="font-code">/&gt;</span>
        </a>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <a 
              key={item.name}
              href={item.href}
              className={`text-sm font-medium hover:text-custom-bright-purple transition-colors ${
                activeSection === item.id ? 'text-custom-bright-purple' : 'text-gray-300'
              }`}
            >
              {item.name}
            </a>
          ))}
        </nav>
        
        {/* Mobile Menu Button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden text-gray-300"
          onClick={toggleMobileMenu}
        >
          <Menu />
        </Button>
      </div>
      
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden glass mt-3 py-4 px-4 mx-4 rounded-lg">
          <nav className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <a 
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm font-medium px-3 py-2 rounded-md transition-colors ${
                  activeSection === item.id 
                    ? 'bg-custom-bright-purple bg-opacity-20 text-custom-bright-purple' 
                    : 'text-gray-300 hover:bg-gray-800'
                }`}
              >
                {item.name}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
