export type ButtonProps = React.HTMLProps<HTMLButtonElement>;

export function Button(props: ButtonProps) {
  // @ts-expect-error
  return <button {...props} />;
}
