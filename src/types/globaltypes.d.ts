
declare module '@react-three/drei' {
  export function OrbitControls(props: any): JSX.Element;
  export function Stars(props: any): JSX.Element;
  export function useGLTF(path: string): any;
  export function Float(props: any): JSX.Element;
}

declare module '@react-three/fiber' {
  import { Camera, Object3D, Scene } from 'three';
  import { ReactNode, RefObject } from 'react';
  
  export type ThreeEvent<T> = T & {
    object: Object3D;
    eventObject: Object3D;
  };
  
  export interface RenderProps {
    children: ReactNode;
    scene?: Scene;
    camera?: Camera;
    gl?: THREE.WebGLRenderer;
  }
  
  export interface BufferAttributeProps {
    attach: string;
    count?: number;
    array: Float32Array | number[];
    itemSize: number;
  }
  
  export interface MaterialProps {
    color?: string | number;
    wireframe?: boolean;
    size?: number;
    sizeAttenuation?: boolean;
    transparent?: boolean;
    opacity?: number;
  }

  export interface ThreeCanvasProps {
    children: ReactNode;
    camera?: object;
  }
  
  export function Canvas(props: ThreeCanvasProps): JSX.Element;
  export function useFrame(callback: (state: any) => void): void;
}

declare module 'three' {
  export class Vector3 {
    constructor(x?: number, y?: number, z?: number);
    x: number;
    y: number;
    z: number;
    set(x: number, y: number, z: number): this;
  }

  export interface Object3D {
    position: Vector3;
    rotation: {
      x: number;
      y: number;
      z: number;
    };
  }

  export class Points extends Object3D {
    material: any;
    geometry: any;
  }
  
  export class Mesh extends Object3D {
    material: any;
    geometry: any;
  }
  
  export class Group extends Object3D {
    add(...objects: Object3D[]): this;
    remove(...objects: Object3D[]): this;
  }
}
