# withContextProps

An alternative way to provide properties to React components:

- Property descriptors are defined in a plain typescript object;
- Every property descriptor is the combination of a useContext function
  and the name of a field inside this context.
- When several property descriptors refer to the same useMyContext function then the
  corresponding property values will be based on a single shared context value.
- Every property descriptor is cast to a typescript type that will be used as the
  type of the corresponding property value.

## Synopsis

```ts
import { withContextProps, stub } from 'react-default-props-context';

type PropsT = { name: string };

const ContextProps = {
  // props.textColor will be a string: useMyContext().color
  textColor: [useMyContext, 'color'] as unknown as string,
  // props.textSize will be a number: useMyContext().size
  textSize: [useMyContext, 'size'] as unknown as number,
  // Since both property descriptors refer to the same useMyContext function,
  // this context will be created once and used for both descriptors.
};

const MyComponent = withContextProps(
  //
  (props: PropsT & typeof ContextProps) => {
    return <text color={props.textColor}>{`Hello ${props.name}`}</text>;
  },
  ContextProps
);
```
