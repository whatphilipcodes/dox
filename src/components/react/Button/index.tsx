import { type FC } from 'react';
import ButtonAsButton from './ButtonAsButton';
import ButtonAsAnchor from './ButtonAsAnchor';
import type { ButtonAsButtonProps, ButtonAsAnchorProps } from './types';

type ButtonProps = ButtonAsButtonProps | ButtonAsAnchorProps;

const Button: FC<ButtonProps> = (props) => {
  if ('href' in props) {
    return <ButtonAsAnchor {...props} />;
  }
  return <ButtonAsButton {...(props as ButtonAsButtonProps)} />;
};

export default Button;
