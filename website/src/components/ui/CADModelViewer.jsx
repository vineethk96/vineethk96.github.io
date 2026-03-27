import { Suspense, useEffect, useMemo } from 'react';
import { Canvas, useLoader, useThree } from '@react-three/fiber';
import { OrbitControls, Center } from '@react-three/drei';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { Vector3 } from 'three';

const CAMERA_POSITIONS = {
  'iso-top-front-right':    [ 1,  1,  1],
  'iso-top-front-left':     [-1,  1,  1],
  'iso-top-back-right':     [ 1,  1, -1],
  'iso-top-back-left':      [-1,  1, -1],
  'iso-bottom-front-right': [ 1, -1,  1],
  'iso-bottom-front-left':  [-1, -1,  1],
  'iso-bottom-back-right':  [ 1, -1, -1],
  'iso-bottom-back-left':   [-1, -1, -1],
  'front':  [ 0,  0,  1],
  'back':   [ 0,  0, -1],
  'right':  [ 1,  0,  0],
  'left':   [-1,  0,  0],
  'top':    [ 0,  1,  0],
  'bottom': [ 0, -1,  0],
};
const DEFAULT_CAMERA_POSITION = [1, 1, 1];

// X = green, Y = red, Z = blue
function AxisLines({ size }) {
  const xPos = useMemo(() => new Float32Array([0, 0, 0, size, 0, 0]), [size]);
  const yPos = useMemo(() => new Float32Array([0, 0, 0, 0, size, 0]), [size]);
  const zPos = useMemo(() => new Float32Array([0, 0, 0, 0, 0, size]), [size]);

  return (
    <group>
      <line>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" array={xPos} count={2} itemSize={3} />
        </bufferGeometry>
        <lineBasicMaterial color="#00cc44" />
      </line>
      <line>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" array={yPos} count={2} itemSize={3} />
        </bufferGeometry>
        <lineBasicMaterial color="#ff3333" />
      </line>
      <line>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" array={zPos} count={2} itemSize={3} />
        </bufferGeometry>
        <lineBasicMaterial color="#3399ff" />
      </line>
    </group>
  );
}

function STLMesh({ url, cameraPosition, modelRotation }) {
  const geometry = useLoader(STLLoader, url);
  const { camera } = useThree();

  const xRad = ((modelRotation?.x ?? 0) * Math.PI) / 180;
  const yRad = ((modelRotation?.y ?? 0) * Math.PI) / 180;
  const zRad = ((modelRotation?.z ?? 0) * Math.PI) / 180;

  geometry.computeBoundingSphere();
  const axisSize = (geometry.boundingSphere?.radius ?? 1) * 1.5;

  useEffect(() => {
    const radius = geometry.boundingSphere.radius;
    const fovRad = (camera.fov * Math.PI) / 180;
    const distance = (radius / Math.tan(fovRad / 2)) * 1.4;

    const dir = new Vector3(...cameraPosition).normalize();
    camera.position.copy(dir.multiplyScalar(distance));
    camera.lookAt(0, 0, 0);
    camera.near = distance / 100;
    camera.far = distance * 100;
    camera.updateProjectionMatrix();
  }, [geometry, camera, cameraPosition]);

  return (
    <Center>
      <group rotation={[xRad, yRad, zRad]}>
        <mesh geometry={geometry} castShadow>
          <meshStandardMaterial color="#c0c8d0" metalness={0.7} roughness={0.3} />
        </mesh>
        <AxisLines size={axisSize} />
      </group>
    </Center>
  );
}

function WireframeCube() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#3a4a5a" wireframe />
    </mesh>
  );
}

export function CADModelViewer({ modelUrl, cameraView, modelRotation }) {
  const cameraPosition = CAMERA_POSITIONS[cameraView] ?? DEFAULT_CAMERA_POSITION;

  if (!modelUrl) {
    return (
      <div className="relative min-h-[360px] technic-module overflow-hidden blueprint-bg flex flex-col items-center justify-center gap-4">
        <p className="font-mono text-xs text-accent tracking-widest uppercase">
          CAD_Model // TBD
        </p>
        <span className="font-mono text-[10px] text-primary/40 border border-primary/20 px-3 py-1 rounded">
          INTERACTIVE_MODEL // COMING_SOON
        </span>
      </div>
    );
  }

  return (
    <div className="relative min-h-[360px] technic-module overflow-hidden">
      <Canvas
        camera={{ position: cameraPosition, fov: 50 }}
        style={{ width: '100%', height: '100%', minHeight: '360px' }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 10, 5]} intensity={1.2} castShadow />
        <directionalLight position={[-5, -5, -5]} intensity={0.3} />

        <Suspense fallback={<WireframeCube />}>
          <STLMesh url={modelUrl} cameraPosition={cameraPosition} modelRotation={modelRotation} />
        </Suspense>

        <OrbitControls enableDamping dampingFactor={0.05} />
      </Canvas>
    </div>
  );
}
