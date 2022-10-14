import { Main } from "layout";
import { withSessionSsr } from "lib/auth";
import { UserData } from "lib/types";
import Link from "next/link";

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
      <Link href="/auth/logout">logout</Link>
    </> : <>
      <Link href="/auth/login">login</Link>
      <br />
      <Link href="/auth/register">register</Link>
    </>
    }
  </Main>
}

export default Index;
