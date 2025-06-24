import type { AnchorHTMLAttributes, ButtonHTMLAttributes, FC } from 'react';
import { twMerge } from 'tailwind-merge';
import { wrapRawNodes } from './utils';

const baseStyles =
	'twd cursor-pointer flex flex-row flex-nowrap justify-center gap-2 items-center rounded-md py-2 px-4 no-underline!';
const variantStyles = {
	primary:
		'twd dark:border-primary-500 dark:text-primary-500 dark:hover:bg-primary-500/10 dark:active:bg-primary-500/20 border border-neutral-900 text-neutral-900 ease-out hover:bg-neutral-300 active:bg-neutral-400',
	secondary:
		'twd bg-neutral-300/50 ease-out hover:bg-neutral-300 active:bg-neutral-400 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:active:bg-neutral-600',
};

type ButtonVariant = keyof typeof variantStyles;
type ButtonBaseProps = {
	variant?: ButtonVariant;
};

type ButtonProps =
	| (ButtonBaseProps & ButtonHTMLAttributes<HTMLButtonElement>)
	| (ButtonBaseProps & AnchorHTMLAttributes<HTMLAnchorElement>);

const Button: FC<ButtonProps> = ({
	variant = 'primary',
	className,
	children,
	...props
}) => {
	const mergedStyles = twMerge(baseStyles, variantStyles[variant], className);
	if ('href' in props) {
		const { ...aProps } = props as AnchorHTMLAttributes<HTMLAnchorElement>;
		return (
			<a className={mergedStyles} {...aProps}>
				{wrapRawNodes(children)}
			</a>
		);
	}
	const { type, ...buttonProps } =
		props as ButtonHTMLAttributes<HTMLButtonElement>;
	return (
		<button type={type} className={mergedStyles} {...buttonProps}>
			{wrapRawNodes(children)}
		</button>
	);
};

export default Button;
