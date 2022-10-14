import Form from "../Form";

function Weight() {
  return (
    <Form action="/api/data/weight" >

      <h2 style={{ marginTop: 0 }}>Weight</h2>

      <label htmlFor="weight">Weight (Kilos)</label>
      <br />
      <input style={{ width: "100%" }} type="number" id="weight" min="0" max="1000" step="0.1" name="weight" />
      <br />
      <br />

      <label htmlFor="fat">Body Fat (Percent)</label>
      <br />
      <input style={{ width: "100%" }} type="number" id="fat" min="0" max="100" name="fat_percent" />
      <br />
      <br />


      <label htmlFor="muscle">Muscle (Percent)</label>
      <br />
      <input style={{ width: "100%" }} type="number" id="muscle" min="0" max="100" name="muscle_percent" />
      <br />
      <br />

      <button type="submit">create</button>
    </Form>
  );
}

export default Weight
