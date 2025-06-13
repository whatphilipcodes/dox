import { useAtom } from 'jotai';
import { useEffect, useRef } from 'react';
import WrapperSVG from './wrapperSVG';
import { registerSlideRefAtom, unmountSlideRefAtom } from '../stores/storeDex';

interface SlideProps {
	layout: 'default';
	displaySVG: boolean;
	children: React.ReactNode;
}

export default function Slide({
	layout,
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
			<WrapperSVG width={1920} height={1080}>
				<div
					ref={ref}
					className="aspect-video bg-neutral-600 break-after-page w-full last:break-after-auto overflow-hidden p-4 text-2xl"
				>
					{children}
				</div>
			</WrapperSVG>
		);
	}
	return (
		<div
			ref={ref}
			className="aspect-video bg-neutral-600 break-after-page w-full last:break-after-auto overflow-hidden p-4 text-2xl"
		>
			{children}
		</div>
	);
}
