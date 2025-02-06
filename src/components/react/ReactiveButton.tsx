interface ButtonProps {
  onClick?: (
    event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
  ) => void;
  variant?: 'bg' | 'border';
  children: React.ReactNode;
  href?: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
  rel?: string;
}
const ReactiveButton = ({
  onClick,
  variant = 'bg',
  children,
  href,
  target,
  rel = target === '_blank' ? 'noopener noreferrer' : undefined,
}: ButtonProps) => {
  switch (variant) {
    case 'border':
      return href ? (
        <a
          href={href}
          target={target}
          rel={rel}
          onClick={onClick}
          className='rounded-md border border-neutral-900 p-2 text-center text-neutral-900 ease-out hover:bg-neutral-300 active:bg-neutral-400 dark:border-mint-500 dark:text-mint-500 dark:hover:bg-mint-500/10 dark:active:bg-mint-500/20'
        >
          {children}
        </a>
      ) : (
        <button
          onClick={onClick}
          className='rounded-md border border-neutral-900 p-2 text-neutral-900 ease-out hover:bg-neutral-300 active:bg-neutral-400 dark:border-mint-500 dark:text-mint-500 dark:hover:bg-mint-500/10 dark:active:bg-mint-500/20'
        >
          {children}
        </button>
      );
    default:
      return href ? (
        <a
          href={href}
          target={target}
          rel={rel}
          onClick={onClick}
          className='rounded-md bg-neutral-300/50 p-2 text-center ease-out [all:unset] hover:bg-neutral-300 active:bg-neutral-400 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:active:bg-neutral-600'
        >
          {children}
        </a>
      ) : (
        <button
          onClick={onClick}
          className='rounded-md bg-neutral-300/50 p-2 ease-out hover:bg-neutral-300 active:bg-neutral-400 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:active:bg-neutral-600'
        >
          {children}
        </button>
      );
  }
};

export default ReactiveButton;
