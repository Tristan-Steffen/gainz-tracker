import Form from "../Form";

function Gym() {
  return (
    <Form action="/api/data/gym" >

      <h2 style={{ marginTop: 0 }}>Gym</h2>

      <label htmlFor="type">Type </label>
      <br />
      <select style={{ width: "100%" }} id="type" name="type" >
        <option value="butterfly">Butterfly</option>
        <option value="bench_press">Bench Press</option>
        <option value="deadlifts">Dead Lifts</option>
      </select>
      <br />
      <br />

      <label htmlFor="reps">Repeats</label>
      <br />
      <input style={{ width: "100%" }} type="number" id="reps" name="reps" defaultValue="10" min="1" max="500" />
      <br />
      <br />


      <label htmlFor="weight">Weight (Kilos)</label>
      <br />
      <input style={{ width: "100%" }} type="number" id="weight" min="0" max="500" defaultValue="50" step="0.5" name="weight" />
      <br />
      <br />

      <button type="submit">create</button>
    </Form>
  );
}

export default Gym
