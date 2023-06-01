import * as React from "react";
import merge from "lodash/merge";
import { Component } from "../builder";
import { portalContext } from "../components/core";
import { portalHoc } from "../hocs";

export type OptionalChildrenProps = {
  children?: React.ReactNode;
} & React.ComponentProps<any>;

export type ComponentTypeWithOptionalChildren =
  React.ComponentType<OptionalChildrenProps>;

type RenderChildrenParams = {
  components: Record<string, ComponentTypeWithOptionalChildren>;
  componentSchema: Component;
  extraProps?: Record<string, any>;
  extraComponents?: Record<string, ComponentTypeWithOptionalChildren>;
  key: string;
};

export function renderChildren({
  components,
  extraComponents,
  componentSchema,
  extraProps,
  key,
}: RenderChildrenParams) {
  const componentMap = merge({}, components, extraComponents);
  const Component = componentMap[componentSchema.name];

  if (!Component) return null;

  const props = merge({}, componentSchema.props, extraProps);
  const children = props?.children ? props.children : null ?? null;

  const PortalComponent = portalHoc(Component);

  return (
    <PortalComponent key={key} {...props}>
      {children}
      {(componentSchema.components ?? []).map((componentSchema, index) =>
        renderChildren({
          components: componentMap,
          componentSchema,
          key: `${key}-${componentSchema.name}-${index}`,
        })
      )}
    </PortalComponent>
  );
}
