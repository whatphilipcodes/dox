import type { FC } from 'react';

type ViewerProps = {
	children: React.ReactNode;
};
const Slide: FC<ViewerProps> = ({ children }) => {
	return (
		<div className="aspect-video bg-secondary-500 break-after-page w-full h-full last:break-after-auto overflow-clip">
			{children}
		</div>
	);
};
export default Slide;
