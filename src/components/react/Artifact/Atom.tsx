import * as THREE from 'three';
import { type ThreeElements, type ThreeEvent } from '@react-three/fiber';
import { useState } from 'react';
import { useSpring, animated } from '@react-spring/three';

type AtomProps = ThreeElements['mesh'] & {
  color: THREE.Color;
  type: 'plane' | 'triangle';
  layerDepth: number;
  baseScale?: number;
};

const Atom = ({
  color,
  type,
  layerDepth,
  baseScale = 0.12,
  ...props
}: AtomProps) => {
  const [hovered, setHovered] = useState(false);
  const initialPosition = Array.isArray(props.position)
    ? props.position
    : [0, 0, 0];

  const getHoverZ = (currentZ: number): number => {
    if (currentZ < -layerDepth / 2) return 0; // back -> middle
    if (currentZ > layerDepth / 2) return 0; // front -> middle
    return layerDepth; // middle -> front
  };

  const { position, scale } = useSpring({
    position: [
      initialPosition[0],
      initialPosition[1],
      hovered ? getHoverZ(initialPosition[2]) : initialPosition[2],
    ],
    scale: baseScale,
    config: {
      tension: hovered ? 170 : 60,
      friction: 12,
    },
  });

  const meshProps = {
    ...props,
    position: position as any, // type assertion needed for r3f
    scale: scale as any,
    onPointerEnter: (e: ThreeEvent<PointerEvent>) => {
      e.stopPropagation();
      setHovered(true);
    },
    onPointerLeave: (e: ThreeEvent<PointerEvent>) => {
      e.stopPropagation();
      setHovered(false);
    },
  };

  if (type === 'plane') {
    return (
      <animated.mesh {...meshProps}>
        <planeGeometry args={[1, 1]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          side={THREE.DoubleSide}
        />
      </animated.mesh>
    );
  }

  const vertices = new Float32Array([
    -0.5, -0.5, 0, 0.5, -0.5, 0, -0.5, 0.5, 0,
  ]);

  const normals = new Float32Array([0, 0, 1, 0, 0, 1, 0, 0, 1]);

  return (
    <animated.mesh {...meshProps}>
      <bufferGeometry>
        <bufferAttribute
          attach='attributes-position'
          count={3}
          array={vertices}
          itemSize={3}
          args={[vertices, 3]}
        />
        <bufferAttribute
          attach='attributes-normal'
          count={3}
          array={normals}
          itemSize={3}
          args={[normals, 3]}
        />
      </bufferGeometry>
      <meshStandardMaterial color={color} side={THREE.DoubleSide} />
    </animated.mesh>
  );
};

export default Atom;
