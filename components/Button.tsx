function Button({ children, type }: { children: JSX.Element; type: "button" | "submit"; }): JSX.Element {
  return <button type={type}>{children}</button>;
}
export default Button;
