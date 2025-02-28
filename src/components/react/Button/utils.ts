import React, { Children, type ReactNode } from 'react';

export const wrapRawNodes = (children: ReactNode) => {
  return Children.map(children, (child) => {
    if (typeof child === 'string' || typeof child === 'number') {
      return React.createElement('span', null, child);
    }
    return child;
  });
};
