import { type FC, useState, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { useSpring, animated } from '@react-spring/three';

import { ArtifactSeed } from './ArtifactSeed';
import Atom from './Atom';

const GRID_SIZE = 10;
const DEFAULT_CELL_SIZE = 0.14;
const DEFAULT_PADDING = 1;
const LAYER_DEPTH = 0.15;
const BASE_LAYER_DEPTH = 0.25;
const LAYER_POSITIONS = [-BASE_LAYER_DEPTH, 0, BASE_LAYER_DEPTH];

interface ArtifactProps {
  svgRef?: string;
  atomSize?: number;
  padding?: number;
  atomPadding?: number;
  rotationAmount?: number;
  depthMultiplier?: number;
}

interface PatternItem {
  x: number;
  y: number;
  z: number;
  type: 'plane' | 'triangle';
  colorIndex: number;
}

function Scene({
  pattern,
  helper,
  rotationAmount,
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
          layerDepth={LAYER_DEPTH}
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
  svgRef,
  atomSize = 0.1,
  padding = DEFAULT_PADDING,
  atomPadding = 0.2,
  rotationAmount = 0.45,
  depthMultiplier = 1,
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

  const baseAtomSize = DEFAULT_CELL_SIZE * (atomSize / 0.12);
  const cellSize = baseAtomSize * (1 + atomPadding);
  const gridOffset = ((GRID_SIZE - 1) * cellSize) / 2;
  const usableStart = padding;
  const usableEnd = GRID_SIZE - padding;

  useEffect(() => {
    const svgHelper = new ArtifactSeed();
    svgHelper
      .loadSVG(new URL(svgRef ?? '/favicon.svg', window.location.origin))
      .then(() => {
        setHelper(svgHelper);
        // console.log(
        //   'Colors loaded:',
        //   svgHelper.getColors().map((c) => c.getHexString()),
        // );
      });
  }, []);

  useEffect(() => {
    if (!helper) return;

    const newPattern = [];
    const holes = new Set<string>();
    const numHoles = 28;

    while (holes.size < numHoles) {
      const x =
        usableStart +
        Math.floor(helper.getRandom() * (GRID_SIZE - 2 * padding));
      const y =
        usableStart +
        Math.floor(helper.getRandom() * (GRID_SIZE - 2 * padding));
      holes.add(`${x},${y}`);
    }

    for (let x = usableStart; x < usableEnd; x++) {
      for (let y = usableStart; y < usableEnd; y++) {
        if (!holes.has(`${x},${y}`)) {
          const colorIndex = Math.floor(helper.getRandom() * 3);
          newPattern.push({
            x: x * cellSize - gridOffset,
            y: y * cellSize - gridOffset,
            z: LAYER_POSITIONS[colorIndex],
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
  ]);

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
