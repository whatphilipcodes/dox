import type { FC } from 'react';
import Button from '../react/Button';

interface ComponentProps {
	alertMessage: string;
}

const Component: FC<ComponentProps> = ({ alertMessage }) => {
	return (
		<Button className="w-32" onClick={() => alert(alertMessage)}>
			show alert
		</Button>
	);
};
export default Component;
