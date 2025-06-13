// https://react.dev/blog/2024/12/05/react-19#ref-as-a-prop -> passing down a prop
import { useAtom } from 'jotai';
import { useEffect } from 'react';

import { slideRefsAtom } from '../store/storeDex';

type DeckProps = { children: React.ReactNode };

export default function Deck({ children }: DeckProps) {
	const [slideRefs] = useAtom(slideRefsAtom);

	useEffect(() => {
		console.log(slideRefs);
	});

	return (
		<div className="pdf-export print:absolute top-0 left-0 w-full h-full">
			{children}
		</div>
	);
}
