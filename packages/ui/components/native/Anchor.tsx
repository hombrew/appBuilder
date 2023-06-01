import Link, { LinkProps } from "next/link";
import type * as React from "react";

export type AnchorProps =
  | ({ variant: "external" } & React.HTMLProps<HTMLAnchorElement>)
  | ({ variant: "local" } & LinkProps);

export function Anchor(props: AnchorProps) {
  return props.variant === "external" ? <a {...props} /> : <Link {...props} />;
}
