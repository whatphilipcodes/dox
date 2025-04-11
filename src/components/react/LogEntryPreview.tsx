import { type FC, useState, useRef, useEffect } from 'react';
import type { CollectionEntry } from 'astro:content';

interface LogEntryPreviewProps {
  log: CollectionEntry<'log'>;
}

const LogEntryPreview: FC<LogEntryPreviewProps> = ({ log }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (event: MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const isInside =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;

      if (isInside) {
        setIsHovering(true);
        setMousePosition({
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        });
      } else {
        setIsHovering(false);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div ref={containerRef} className='relative hidden h-full w-full md:block'>
      <div
        className={`pointer-events-none absolute z-50 w-96 transform rounded-lg bg-neutral-300 p-3 shadow-lg transition-all duration-300 ease-in-out dark:bg-neutral-700 ${isHovering ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}
        style={{
          top: mousePosition.y + 16,
          left: mousePosition.x + 16,
        }}
      >
        <p className='text-neutral-400'>{log.data.description}</p>
      </div>
    </div>
  );
};

export default LogEntryPreview;
