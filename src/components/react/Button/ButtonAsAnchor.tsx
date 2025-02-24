import { type FC } from 'react';
import { type ButtonAsAnchorProps } from './types';
import { wrapRawNodes } from './utils';

const ButtonAsAnchor: FC<ButtonAsAnchorProps> = ({
  variant = 'primary',
  children,
  ...props
}) => {
  const wrappedChildren = wrapRawNodes(children);
  switch (variant) {
    case 'primary':
      return (
        <a
          className={
            'dark:border-mint-500 dark:text-mint-500 dark:hover:bg-mint-500/10 dark:active:bg-mint-500/20 flex flex-row flex-nowrap justify-center gap-2 rounded-md border border-neutral-900 p-2 text-neutral-900 ease-out hover:bg-neutral-300 active:bg-neutral-400'
          }
          {...props}
        >
          {wrappedChildren}
        </a>
      );

    default:
      return (
        <a
          className={
            'flex flex-row flex-nowrap justify-center gap-2 rounded-md bg-neutral-300/50 p-2 ease-out hover:bg-neutral-300 active:bg-neutral-400 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:active:bg-neutral-600'
          }
          {...props}
        >
          {wrappedChildren}
        </a>
      );
  }
};

export default ButtonAsAnchor;
