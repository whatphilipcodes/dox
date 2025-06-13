import { atom } from 'jotai';

export const slideRefsAtom = atom<React.RefObject<HTMLDivElement | null>[]>([]);

export const registerSlideRefAtom = atom(
	null,
	(get, set, newRef: React.RefObject<HTMLDivElement | null>) => {
		const current = get(slideRefsAtom);
		set(slideRefsAtom, [...current, newRef]);
	},
);
