interface WrapperProps {
	width: number;
	height: number;
	title?: string;
	children: React.ReactNode;
}

export default function WrapperSVG({
	width,
	height,
	title = 'slide preview',
	children,
}: WrapperProps) {
	return (
		<svg
			viewBox={`0 0 ${width} ${height}`}
			width="100%"
			height="100%"
			className="block"
		>
			<title>{title}</title>
			<foreignObject width={width} height={height}>
				{children}
			</foreignObject>
		</svg>
	);
}
