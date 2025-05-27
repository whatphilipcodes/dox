import type { FC } from 'react';

type ViewerProps = {
	layout: 'default';
	children: React.ReactNode;
};
const Slide: FC<ViewerProps> = ({ children }) => {
	return (
		<div className="aspect-video bg-neutral-600 break-after-page w-full last:break-after-auto overflow-hidden p-4 text-2xl">
			{children}
		</div>
	);
};
export default Slide;
