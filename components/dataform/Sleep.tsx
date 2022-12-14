import Form from "../Form";

function Sleep() {
  return (
    <Form action="/api/data/sleep" >


      <h2 style={{ marginTop: 0 }}>Sleep</h2>

      <label htmlFor="Start">Sleep Start</label>
      <br />
      <input style={{ width: "100%" }} type="datetime-local" id="start" defaultValue={new Date().toISOString().replace(/.{8}$/, "")} name="start" />
      <br />
      <br />
      <label htmlFor="amount">Amount (Hours)</label>
      <br />
      <input style={{ width: "100%" }} type="number" id="amount" step="0.5" min="0" max="24" name="amount" />
      <br />
      <br />
      <button type="submit">create</button>
    </Form>
  );
}

export default Sleep
