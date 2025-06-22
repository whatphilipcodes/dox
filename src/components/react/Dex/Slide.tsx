import { useAtom } from 'jotai';
import { useEffect, useRef } from 'react';
import WrapperSVG from './wrapperSVG';
import {
	registerSlideRefAtom,
	unmountSlideRefAtom,
	resolutionAtom,
} from '../stores/storeDex';

interface SlideProps {
	layout: 'default';
	preview: boolean;
	children: React.ReactNode;
}

export default function Slide({
	layout,
	preview = true,
	children,
}: SlideProps) {
	const ref = useRef<HTMLDivElement>(null);
	const [res] = useAtom(resolutionAtom);
	const [, setSlideRefs] = useAtom(registerSlideRefAtom);
	const [, unmountSlideRef] = useAtom(unmountSlideRefAtom);

	useEffect(() => {
		setSlideRefs(ref);
		return () => {
			unmountSlideRef(ref);
		};
	}, [setSlideRefs, unmountSlideRef]);

	if (preview) {
		return (
			<div ref={ref} className="w-full h-full">
				<WrapperSVG width={res.width} height={res.height}>
					<div
						className="bg-neutral-600 overflow-hidden p-4 text-2xl"
						style={{ aspectRatio: `${res.width} / ${res.height}` }}
					>
						{children}
					</div>
				</WrapperSVG>
			</div>
		);
	}
	return (
		<div ref={ref} className="w-full h-full">
			<div
				className="bg-neutral-600 break-after-page last:break-after-auto overflow-hidden p-4 text-2xl"
				style={{ aspectRatio: `${res.width} / ${res.height}` }}
			>
				{children}
			</div>
		</div>
	);
}
