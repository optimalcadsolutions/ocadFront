import { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from 'three';

function CustomCamera({ zoom }: { zoom: number }) {
  const { camera } = useThree();
  const cameraRef = useRef<PerspectiveCamera>(camera as PerspectiveCamera);

  useEffect(() => {
    if (cameraRef.current instanceof PerspectiveCamera) {
      cameraRef.current.fov = zoom;
      cameraRef.current.updateProjectionMatrix();
    }
  }, [zoom]);

  useFrame(() => {
    if (cameraRef.current instanceof PerspectiveCamera) {
      cameraRef.current.updateProjectionMatrix();
    }
  });

  return null;
}

export default CustomCamera;
