export type Component = {
  name: string;
  props?: { [key: string]: any };
  components?: Component[];
};

export type Message = {
  error: string;
  message: string;
  className: string;
};

export type Route = {
  layout?: string;
  exact: boolean;
  path: string;
  components: Component;
};

export type AppSchema = {
  appComponents?: { [key: string]: Component };
  config: {
    language: {
      default: string;
    };
    EMBED_HOST: string;
  };
  layouts?: { [key: string]: Component };
  messages?: { [key: string]: Message[] };
  routes: Route[];
};
