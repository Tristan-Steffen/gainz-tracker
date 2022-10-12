import Link from "next/link";
import { Main } from "../layout";
import { withSessionSsr } from "../lib/auth";
import { UserData } from "../lib/types";

export const getServerSideProps = withSessionSsr(async function getServerSideProps({ req }) {
  const user = req.session?.user || null;
  return {
    props: {
      user
    }
  }
})

function Index({ user }: { user: UserData }) {
  return <Main>
    <h1>Gainz</h1>
    {user ? <>
      <Link href="/home">Home</Link>
      <br />
      <Link href="/logout">logout</Link>
    </> : <>
      <Link href="/login">login</Link>
      <br />
      <Link href="/register">register</Link>
    </>
    }
  </Main>
}

export default Index;
