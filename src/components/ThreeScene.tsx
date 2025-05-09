
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, useGLTF, Float } from '@react-three/drei';
import { useRef, useMemo, useState, useEffect } from 'react';
import * as THREE from 'three';

const CustomGeometryParticles = ({ count = 5000 }) => {
  // This reference will give us direct access to the points
  const points = useRef<THREE.Points>(null);
  
  // Generate random positions with useMemo so it doesn't change on re-renders
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 35;
      const y = (Math.random() - 0.5) * 35;
      const z = (Math.random() - 0.5) * 35;
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }
    
    return positions;
  }, [count]);
  
  // Animation for the particles
  useFrame((state) => {
    const time = state.clock.getElapsedTime() * 0.1;
    if (points.current) {
      points.current.rotation.x = time * 0.05;
      points.current.rotation.y = time * 0.05;
    }
  });
  
  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={particlesPosition}
          itemSize={3}
          count={particlesPosition.length / 3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.05}
        color="#9b87f5"
        sizeAttenuation
        transparent
        opacity={0.8}
      />
    </points>
  );
};

const Cube = ({ position, scale = 1, wireframe = false, color = "#9b87f5" }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(time * 0.3) * 0.2;
      meshRef.current.rotation.y = Math.sin(time * 0.5) * 0.2;
    }
  });
  
  return (
    <mesh ref={meshRef} position={new THREE.Vector3(position[0], position[1], position[2])}>
      <boxGeometry args={[scale, scale, scale]} />
      <meshStandardMaterial color={color} wireframe={wireframe} />
    </mesh>
  );
};

const Sphere = ({ position, scale = 1, color = "#33C3F0" }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(time) * 0.2;
    }
  });
  
  return (
    <mesh ref={meshRef} position={new THREE.Vector3(position[0], position[1], position[2])}>
      <sphereGeometry args={[scale, 32, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const BackgroundObjects = ({ activeSection }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  // Animations based on active section
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (groupRef.current) {
      if (activeSection === 'home') {
        groupRef.current.rotation.y = time * 0.05;
      } else if (activeSection === 'projects') {
        groupRef.current.rotation.y = time * 0.1;
      } else if (activeSection === 'skills') {
        groupRef.current.rotation.z = Math.sin(time * 0.2) * 0.1;
      }
    }
  });
  
  return (
    <group ref={groupRef}>
      <Cube position={[-4, 2, -5]} color="#9b87f5" />
      <Cube position={[5, -3, -9]} wireframe={true} scale={1.5} />
      <Sphere position={[3, 4, -6]} scale={0.7} />
      <Sphere position={[-5, -2, -7]} scale={0.5} color="#6E59A5" />
      <Float speed={2} rotationIntensity={0.5}>
        <Cube position={[0, 0, -10]} wireframe={true} scale={2} color="#6E59A5" />
      </Float>
    </group>
  );
};

const ThreeScene = ({ activeSection }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
      <color attach="background" args={['#1A1F2C']} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      
      <Stars 
        radius={50} 
        depth={50} 
        count={1000} 
        factor={4} 
        saturation={0} 
        fade 
        speed={1}
      />
      
      <CustomGeometryParticles count={isMobile ? 2000 : 5000} />
      <BackgroundObjects activeSection={activeSection} />
      
      <OrbitControls 
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.5}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </Canvas>
  );
};

export default ThreeScene;
