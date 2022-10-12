import Link from "next/link"
import { Main } from "../../layout"

function Index() {
  return (<Main>

    <Link href="/home">-- Back</Link><br />
    <br />
    <h1>Add</h1>
    <Link href="/add/sleep">Sleep</Link><br />
    <Link href="/add/weight">Weight</Link><br />
    <Link href="/add/gym">Gym</Link><br />
  </Main>
  )
}

export default Index
