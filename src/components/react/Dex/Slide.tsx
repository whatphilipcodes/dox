import { useAtom } from 'jotai';
import { useEffect, useRef } from 'react';
import WrapperSVG from './wrapperSVG';
import { registerSlideRefAtom, unmountSlideRefAtom } from '../stores/storeDex';

interface SlideProps {
	layout: 'default';
	width: number;
	height: number;
	displaySVG: boolean;
	children: React.ReactNode;
}

export default function Slide({
	layout,
	width = 1920,
	height = 1080,
	displaySVG = true,
	children,
}: SlideProps) {
	const ref = useRef<HTMLDivElement>(null);
	const [, setSlideRefs] = useAtom(registerSlideRefAtom);
	const [, unmountSlideRef] = useAtom(unmountSlideRefAtom);

	useEffect(() => {
		setSlideRefs(ref);
		return () => {
			unmountSlideRef(ref);
		};
	}, [setSlideRefs, unmountSlideRef]);

	if (displaySVG) {
		return (
			<div ref={ref} className="absolute w-full h-full">
				<WrapperSVG width={width} height={height}>
					<div
						className="bg-neutral-600 overflow-hidden p-4 text-2xl"
						style={{ aspectRatio: `${width} / ${height}` }}
					>
						{children}
					</div>
				</WrapperSVG>
			</div>
		);
	}
	return (
		<div ref={ref} className="absolute w-full h-full">
			<div
				className="bg-neutral-600 break-after-page last:break-after-auto overflow-hidden p-4 text-2xl"
				style={{ aspectRatio: `${width} / ${height}` }}
			>
				{children}
			</div>
		</div>
	);
}
