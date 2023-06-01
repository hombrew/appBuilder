import { AppSchema } from "ui";

export const appSchema: AppSchema = {
  config: {
    language: { default: "en" },
    EMBED_HOST: "https://google.com",
  },
  routes: [
    {
      exact: true,
      path: "/",
      components: {
        name: "Div",
        props: {
          style: {
            backgroundColor: "red",
          },
          children: "this is a div",
        },
        components: [
          {
            name: "Portal",
            props: {
              value: { aboutHref: "/about", spanContent: "hello from home" },
            },
            components: [
              {
                name: "Span",
                props: {
                  style: { color: "white" },
                  children: "{{spanContent}}",
                },
              },
              {
                name: "Anchor",
                props: {
                  variant: "local",
                  href: "/about",
                  style: { color: "yellow" },
                  children: "go to about page",
                },
              },
              {
                name: "Button",
                props: {
                  children: "set new context",
                  "setContext:onClick": {
                    spanContent: "hello from new context",
                  },
                },
              },
            ],
          },
        ],
      },
    },
    {
      exact: true,
      path: "/about",
      components: {
        name: "Div",
        props: {
          style: {
            backgroundColor: "green",
            color: "hotpink",
          },
          children: "this is the about page",
        },
        components: [
          {
            name: "Anchor",
            props: {
              variant: "local",
              href: "/",
              style: { color: "white" },
              children: "go home",
            },
          },
          {
            name: "Anchor",
            props: {
              variant: "local",
              href: "/contact",
              style: { color: "white" },
              children: "go to contact",
            },
          },
        ],
      },
    },
    {
      exact: true,
      path: "/contact",
      components: {
        name: "Div",
        props: {
          style: {
            backgroundColor: "blue",
            color: "orange",
            display: "flex",
            flex: 1,
          },
          children: "this is the contact page",
        },
        components: [
          {
            name: "Anchor",
            props: {
              variant: "local",
              href: "/",
              style: { color: "white" },
              children: "go home",
            },
          },
          {
            name: "Anchor",
            props: {
              variant: "local",
              href: "/about",
              style: { color: "white" },
              children: "go to about page",
            },
          },
        ],
      },
    },
  ],
};
