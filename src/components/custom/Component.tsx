import { type FC } from 'react';

interface ComponentProps {
  alertMessage: string;
}

const Component: FC<ComponentProps> = ({ alertMessage }) => {
  return (
    <button
      className='bg-cynder-500 hover:bg-cynder-400 active:bg-cynder-200 dark:bg-mint-500 dark:hover:bg-mint-600 dark:active:bg-mint-800 h-12 w-32 cursor-pointer rounded-md text-neutral-800'
      onClick={() => alert(alertMessage)}
    >
      show alert
    </button>
  );
};
export default Component;
