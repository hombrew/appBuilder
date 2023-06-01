import { useRouter } from "next/router";
import * as React from "react";
import { AppBuilder } from "ui";
import type { AppSchema } from "ui";
import { appSchema } from "../data";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps<{
  schema: AppSchema;
}> = async () => {
  return { props: { schema: appSchema } };
};

export default function Page({
  schema,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const _path = useRouter().query.path;

  const path = Array.isArray(_path) ? _path.join("/") : _path ? _path : "";

  return <AppBuilder path={`/${path}`} schema={schema} />;
}
