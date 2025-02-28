import * as THREE from 'three';
import { type FC, useState, useEffect } from 'react';
import { Canvas, type ThreeEvent, useThree } from '@react-three/fiber';
import { useSpring, animated } from '@react-spring/three';

import { ArtifactSeed } from './ArtifactSeed';
import Atom from './Atom';

const GRID_SIZE = 11; // 9x9 usable + 1 padding on each side
const DEFAULT_CELL_SIZE = 0.14; // Reduced from 0.175
const DEFAULT_PADDING = 1;
const LAYER_DEPTH = 0.15; // Distance between color layers
const BASE_LAYER_DEPTH = 0.25;
const LAYER_POSITIONS = [-BASE_LAYER_DEPTH, 0, BASE_LAYER_DEPTH]; // Add this

interface ArtifactProps {
  atomSize?: number; // Individual atom scale
  padding?: number; // Grid padding (in grid cells)
  atomPadding?: number;
  rotationAmount?: number;
  depthMultiplier?: number; // Add new prop
}

interface PatternItem {
  x: number;
  y: number;
  z: number; // Add z position
  type: 'plane' | 'triangle';
  colorIndex: number;
}

function Scene({
  pattern,
  helper,
  rotationAmount,
  atomPadding,
}: {
  pattern: PatternItem[];
  helper: ArtifactSeed;
  rotationAmount: number;
  atomPadding: number;
}) {
  const { gl } = useThree();
  const [{ rotation }, api] = useSpring(() => ({
    rotation: [0, 0, 0],
    config: { mass: 1, tension: 20, friction: 15 },
  }));

  const resetRotation = () => {
    api.start({
      rotation: [0, 0, 0],
      config: { mass: 1, tension: 20, friction: 20 },
    });
  };

  useEffect(() => {
    const canvas = gl.domElement;

    const onMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      // Check if mouse is within canvas bounds
      if (x < 0 || x > rect.width || y < 0 || y > rect.height) {
        resetRotation();
        return;
      }

      const normalizedX = ((x / rect.width) * 2 - 1) * rotationAmount;
      const normalizedY = ((y / rect.height) * 2 - 1) * rotationAmount;

      api.start({ rotation: [-normalizedY, normalizedX, 0] });
    };

    const onMouseLeave = () => resetRotation();

    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);

    return () => {
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [gl]);

  return (
    <animated.group rotation={rotation}>
      {pattern.map((item, index) => (
        <Atom
          key={index}
          position={[item.x, item.y, item.z]}
          color={helper.getColors()[item.colorIndex]}
          type={item.type}
        />
      ))}
    </animated.group>
  );
}

const Artifact: FC<ArtifactProps> = ({
  atomSize = 0.1,
  padding = DEFAULT_PADDING,
  atomPadding = 0.2, // Now represents space between atoms
  rotationAmount = 0.45,
  depthMultiplier = 1, // Default to no change
}) => {
  const [helper, setHelper] = useState<ArtifactSeed>();
  const [pattern, setPattern] = useState<
    Array<{
      x: number;
      y: number;
      z: number;
      type: 'plane' | 'triangle';
      colorIndex: number;
    }>
  >();

  // Adjust cell size to include padding between atoms
  const baseAtomSize = DEFAULT_CELL_SIZE * (atomSize / 0.12);
  const cellSize = baseAtomSize * (1 + atomPadding);
  const gridOffset = ((GRID_SIZE - 1) * cellSize) / 2;
  const usableStart = padding;
  const usableEnd = GRID_SIZE - padding;

  useEffect(() => {
    const svgHelper = new ArtifactSeed();
    // Fix: use correct public path
    svgHelper
      .loadSVG(new URL('/favicon.svg', window.location.origin))
      .then(() => {
        setHelper(svgHelper);
        console.log(
          'Colors loaded:',
          svgHelper.getColors().map((c) => c.getHexString()),
        );
      });
  }, []);

  useEffect(() => {
    if (!helper) return;

    const newPattern = [];
    const holes = new Set<string>();
    const numHoles = 28;

    // Generate random holes (only in usable area)
    while (holes.size < numHoles) {
      const x =
        usableStart +
        Math.floor(helper.getRandom() * (GRID_SIZE - 2 * padding));
      const y =
        usableStart +
        Math.floor(helper.getRandom() * (GRID_SIZE - 2 * padding));
      holes.add(`${x},${y}`);
    }

    // Create pattern for only the usable area (skip padding)
    for (let x = usableStart; x < usableEnd; x++) {
      for (let y = usableStart; y < usableEnd; y++) {
        if (!holes.has(`${x},${y}`)) {
          const colorIndex = Math.floor(helper.getRandom() * 3);
          newPattern.push({
            x: x * cellSize - gridOffset,
            y: y * cellSize - gridOffset,
            z: LAYER_POSITIONS[colorIndex], // Use predefined layer positions
            type:
              helper.getRandom() > 0.5
                ? ('plane' as 'plane')
                : ('triangle' as 'triangle'),
            colorIndex,
          });
        }
      }
    }

    setPattern(newPattern);
  }, [
    helper,
    padding,
    cellSize,
    gridOffset,
    usableStart,
    usableEnd,
    depthMultiplier,
  ]); // Add dependency

  return (
    <div className='aspect-square h-80'>
      <Canvas camera={{ position: [0, 0, 2.5], fov: 40 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[1, 1, 3]} intensity={0.7} />
        <pointLight position={[-2, 2, 2]} intensity={0.3} />
        {pattern && helper && (
          <Scene
            pattern={pattern}
            helper={helper}
            rotationAmount={rotationAmount}
            atomPadding={atomPadding}
          />
        )}
      </Canvas>
    </div>
  );
};

export default Artifact;
