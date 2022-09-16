export default ({ actionProp }: { actionProp: string }) => {
  return (
    <form action={actionProp} method="post">
      <label htmlFor="first">Username</label>
      <input type="text" id="first" name="username" />
      <label htmlFor="last">Password</label>
      <input type="password" id="last" name="password" />
      <button type="submit">Submit</button>
    </form>
  );
};
