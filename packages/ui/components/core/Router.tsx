import React from "react";
import { AppSchema } from "../../builder";
import { buildAppComponents } from "../../utils";
import * as localComponents from "../";
import { Route } from "./Route";

export type RouterProps = { path: string } & Omit<AppSchema, "messages">;

export function Router({ path, routes, appComponents }: RouterProps) {
  const computedAppComponents = React.useMemo(
    () => buildAppComponents(appComponents, localComponents),
    [appComponents]
  );

  const route = routes.find((route) =>
    route.exact ? route.path === path : route.path.includes(path)
  );

  if (!route) {
    return <>not found</>;
  }

  return <Route appComponents={computedAppComponents} route={route} />;
}
