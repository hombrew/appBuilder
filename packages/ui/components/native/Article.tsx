export type ArticleProps = React.HTMLProps<HTMLDivElement>;

export function Article(props: ArticleProps) {
  return <article {...props} />;
}
