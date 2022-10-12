import { useRouter } from "next/router";
import { Gym, Sleep, Weight } from "../../../components/dataform";
import { Main } from "../../../layout";

function index() {

  const router = useRouter();
  const { type } = router.query

  return (<Main>
    <span style={{ cursor: "pointer" }} onClick={() => router.back()}>&lt;- back</span>
    <h1 style={{}}>Create Datapoint</h1>
    {type === "gym" && <Gym />}
    {type === "sleep" && <Sleep />}
    {type === "weight" && <Weight />}
  </Main>
  )
}

export default index
