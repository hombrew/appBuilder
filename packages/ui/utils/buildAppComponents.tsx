import merge from "lodash/merge";
import reduce from "lodash/reduce";
import { AppSchema } from "../builder";
import { renderChildren } from "./renderChildren";
import type {
  ComponentTypeWithOptionalChildren,
  OptionalChildrenProps,
} from "./renderChildren";

export function buildAppComponents(
  appComponents: AppSchema["appComponents"],
  localComponents: Record<string, ComponentTypeWithOptionalChildren>
) {
  if (!appComponents) {
    return localComponents;
  }

  return reduce(
    appComponents,
    (acc, componentSchema, name) => {
      function Component(props: OptionalChildrenProps) {
        return renderChildren({
          components: localComponents,
          componentSchema,
          key: name,
          extraProps: merge({}, props),
          extraComponents: acc,
        });
      }

      Component.type = name;
      Component.displayName = name;
      acc[name] = Component;
      return acc;
    },
    {} as Record<string, ComponentTypeWithOptionalChildren>
  );
}
