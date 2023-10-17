import * as React from 'react';

type Without<T, K> = Pick<T, Exclude<keyof T, keyof K>>;
type ObjT = { [key: string]: any };

export function withContextProps<AllPropsT, ContextPropsT extends ObjT>(
  f: React.FC<AllPropsT>,
  contextProps: ContextPropsT
) {
  return ((p: AllPropsT) => {
    const contextLut = new Map<Function, any>();
    const props = { ...p };

    for (const key of Object.keys(contextProps)) {
      const [useContext, prop] = contextProps[key];
      if (!contextLut.has(useContext)) {
        contextLut.set(useContext, useContext());
      }
      const context = contextLut.get(useContext);
      Object.defineProperty(props, key, {
        get: () => context[prop],
        enumerable: true,
        configurable: true,
      });
    }

    return f(props);
  }) as React.FC<Without<AllPropsT, ContextPropsT>>;
}
