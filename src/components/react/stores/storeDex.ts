import { atom } from 'jotai';

export const slideRefsAtom = atom<React.RefObject<HTMLDivElement | null>[]>([]);
export const registerSlideRefAtom = atom(
	null,
	(get, set, newRef: React.RefObject<HTMLDivElement | null>) => {
		const current = get(slideRefsAtom);
		set(slideRefsAtom, [...current, newRef]);
	},
);
export const unmountSlideRefAtom = atom(
	null,
	(get, set, target: React.RefObject<HTMLDivElement | null>) => {
		const current = get(slideRefsAtom);
		set(
			slideRefsAtom,
			current.filter((ref) => ref !== target),
		);
	},
);

interface Resolution {
	width: number;
	height: number;
}
export const resolutionAtom = atom<Resolution>({
	width: 1920,
	height: 1080,
});
export const setResolutionAtom = atom(null, (get, set, newRes: Resolution) => {
	set(resolutionAtom, newRes);
});

export const activeSlideAtom = atom<number>(0);
export const nextSlideAtom = atom(null, (get, set) => {
	const active = get(activeSlideAtom);
	const slides = get(slideRefsAtom);
	if (active < slides.length - 1) set(activeSlideAtom, active + 1);
});
export const prevSlideAtom = atom(null, (get, set) => {
	const active = get(activeSlideAtom);
	if (active >= 1) set(activeSlideAtom, active - 1);
});
