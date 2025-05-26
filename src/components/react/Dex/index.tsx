import type { FC } from 'react';

type ViewerProps = {
	children: React.ReactNode;
};

const Viewer: FC<ViewerProps> = ({ children }) => {
	return (
		<div className="pdf-export print:absolute top-0 left-0 w-full h-full">
			{children}
		</div>
	);
};

export default Viewer;
