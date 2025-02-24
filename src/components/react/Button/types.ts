import type { ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';

export type ButtonBaseProps = {
  variant?: 'primary' | 'secondary';
};

export type ButtonAsButtonProps = ButtonBaseProps &
  ButtonHTMLAttributes<HTMLButtonElement>;
export type ButtonAsAnchorProps = ButtonBaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement>;
