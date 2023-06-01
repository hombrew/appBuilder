import * as React from "react";

type BaseContext = Record<string, any>;

export type Context = BaseContext & {
  setContext: React.Dispatch<React.SetStateAction<Record<string, BaseContext>>>;
};

export const portalContext = React.createContext<Context | null>(null);

type PortalProps = React.PropsWithChildren<{ value: Record<string, any> }>;

export function Portal({ value, ...props }: PortalProps) {
  const [baseContext, setContext] = React.useState(value);
  const context = React.useMemo(
    () => ({ ...baseContext, setContext }),
    [baseContext, value]
  );
  return <portalContext.Provider {...props} value={context} />;
}
