import Form from "./Form";

export default function AuthenticationForm({ actionProp }: { actionProp: string; }) {
  return (
    <Form action={actionProp}>
      <label htmlFor="first">Username</label>
      <br />
      <input type="text" id="first" name="username" />
      <br />
      <br />
      <label htmlFor="last">Password</label>
      <br />
      <input type="password" id="last" name="password" />
      <br />
      <br />
      <button type="submit">Submit</button>
    </Form>
  );
};
