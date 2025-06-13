import { atom } from 'jotai';

export const slideRefsAtom = atom<React.RefObject<HTMLDivElement | null>[]>([]);
