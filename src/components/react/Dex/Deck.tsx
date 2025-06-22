// https://react.dev/blog/2024/12/05/react-19#ref-as-a-prop -> passing down a prop
import { useAtom } from 'jotai';
import { useEffect } from 'react';

import {
	activeSlideAtom,
	slideRefsAtom,
	nextSlideAtom,
	prevSlideAtom,
	setResolutionAtom,
} from '../stores/storeDex';

type DeckProps = { width: number; height: number; children: React.ReactNode };

export default function Deck({
	width = 1920,
	height = 1080,
	children,
}: DeckProps) {
	const [, setResolution] = useAtom(setResolutionAtom);
	const [slideRefs] = useAtom(slideRefsAtom);
	const [activeSlide] = useAtom(activeSlideAtom);
	const [, nextSlide] = useAtom(nextSlideAtom);
	const [, prevSlide] = useAtom(prevSlideAtom);

	useEffect(() => {
		console.log('this should be before mount of slide');
		setResolution({ width: width, height: height });
		slideRefs.forEach((ref, idx) => {
			const el = ref?.current;
			if (!el) return;
			el.style.display = idx === activeSlide ? 'block' : 'none';
		});
	}, [activeSlide, slideRefs, width, height, setResolution]);

	return (
		<div
			className="pdf-export relative print:absolute top-0 left-0 w-full"
			style={{ aspectRatio: `${width} / ${height}` }}
		>
			{children}
			<button
				type="button"
				onClick={prevSlide}
				className="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded"
			>
				Prev
			</button>
			<button
				type="button"
				onClick={nextSlide}
				className="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded"
			>
				Next
			</button>
		</div>
	);
}
