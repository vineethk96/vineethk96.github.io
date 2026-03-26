import { Suspense, useEffect, useState } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, Center } from '@react-three/drei';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { sanityClient } from '../../lib/sanityClient';

const GROQ_QUERY = `*[_type == "project" && slug.current == $projectId][0]{
  "stlUrl": cadModel.asset->url
}`;

function STLMesh({ url }) {
  const geometry = useLoader(STLLoader, url);
  return (
    <Center>
      <mesh geometry={geometry} castShadow>
        <meshStandardMaterial color="#c0c8d0" metalness={0.7} roughness={0.3} />
      </mesh>
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

export function CADModelViewer({ projectId }) {
  const [stlUrl, setStlUrl] = useState(null);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    if (!projectId) {
      setFetched(true);
      return;
    }
    sanityClient
      .fetch(GROQ_QUERY, { projectId })
      .then(data => {
        setStlUrl(data?.stlUrl ?? null);
        setFetched(true);
      })
      .catch(() => setFetched(true));
  }, [projectId]);

  if (!fetched || !stlUrl) {
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
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ width: '100%', height: '100%', minHeight: '360px' }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 10, 5]} intensity={1.2} castShadow />
        <directionalLight position={[-5, -5, -5]} intensity={0.3} />

        <Suspense fallback={<WireframeCube />}>
          <STLMesh url={stlUrl} />
        </Suspense>

        <OrbitControls enableDamping dampingFactor={0.05} />
      </Canvas>
    </div>
  );
}
