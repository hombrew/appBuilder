import * as React from "react";
import type { ValueKeyIteratee } from "lodash";
import map from "lodash/map";
import reduce from "lodash/reduce";
import omitBy from "lodash/omitBy";
import pickBy from "lodash/pickBy";
import get from "lodash/get";
import { Context, portalContext } from "../components/core";
import { deepMap } from "../utils";

function createIterator(context: Omit<Context, "setContext">) {
  return function <T>(item: T): T {
    if (typeof item !== "string") return item;
    return item.replace(/\{\{(.{1,}?)\}\}/g, (match, ...params) => {
      return get(context, params[0], match);
    }) as T;
  };
}

function mapInteractions(
  interactionMap: Record<string, any>,
  setContext: Context["setContext"]
) {
  return reduce(
    interactionMap,
    (acc, current, key) => {
      const method = String(key).split(":")[1];
      acc[method] = () => setContext(current);
      return acc;
    },
    {} as Record<string, (input: any) => void>
  );
}

export function portalHoc(Component: React.ComponentType<any>) {
  return function PortalComponent(props: Record<string, any>) {
    const fullContext = React.useContext(portalContext);

    const iteratee: ValueKeyIteratee<any> = (_, key) =>
      key.includes("setContext");

    let interactions = pickBy(props, iteratee);
    let componentProps = omitBy(props, iteratee);

    if (fullContext) {
      const context = omitBy(fullContext, iteratee);
      const setContext = pickBy(fullContext, iteratee)
        .setContext as Context["setContext"];
      const { children, ...rest } = componentProps;
      const iterator = createIterator(context);
      componentProps = {
        ...deepMap(rest, iterator),
        ...(children && { children: map(children, iterator) }),
        ...mapInteractions(interactions, setContext),
      };
    }

    return <Component {...componentProps} />;
  };
}
