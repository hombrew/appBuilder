import { Router } from "../components/core";
import { AppSchema } from "./types";

type AppBuilderProps = {
  path: string;
  schema: AppSchema;
};

export function AppBuilder({ path, schema }: AppBuilderProps) {
  const { messages, ...props } = schema;
  return <Router path={path} {...props} />;
}
