import { Route } from "../../builder";
import { ComponentTypeWithOptionalChildren, renderChildren } from "../../utils";

export type RouteProps = {
  route: Route;
  appComponents: Record<string, ComponentTypeWithOptionalChildren>;
};

export function Route({ route, appComponents }: RouteProps) {
  return renderChildren({
    components: appComponents,
    componentSchema: route.components,
    key: "route",
  });
}
