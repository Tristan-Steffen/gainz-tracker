import { AuthenticationForm } from "components";
import { Main } from "layout";
import { withSessionSsr } from "lib/auth";
import Link from "next/link";

export const getServerSideProps = withSessionSsr(async function getServerSideProps({ req }) {

  if (req.session.user) {
    return {
      props: {},
      redirect: {
        destination: "/home"
      }
    }
  }

  return {
    props: {
    }, // Will be passed to the page component as props
  };
})

export default function Login() {
  return <Main>
    <div style={{ display: "grid", placeItems: "center", height: "100vh" }}>
      <div>
        <h1 style={{ marginTop: 0 }}>Login</h1>
        <AuthenticationForm actionProp="/api/session"></AuthenticationForm>
        <br />
        <Link href="/auth/register">register</Link>
      </div>
    </div>
  </Main>
};
