import Link from "next/link";
import { AuthenticationForm } from "../components";
import { withSessionSsr } from "../lib/auth";

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
      user: req.session.user,
    }, // Will be passed to the page component as props
  };
})

export default function Register() {

  return <div style={{ display: "grid", placeItems: "center", height: "100vh" }}>
    <div>
      <h1 style={{ marginTop: 0 }}>Register</h1>
      <AuthenticationForm actionProp="/api/user"></AuthenticationForm>
      <br />
      <Link href="/login">login</Link>
    </div>
  </div>
};
