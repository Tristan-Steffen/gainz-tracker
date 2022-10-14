import { withSessionSsr } from "lib/auth";

export const getServerSideProps = withSessionSsr(async function getServerSideProps({ req }) {
  req.session.destroy()
  return {
    props: {},
    redirect: {
      destination: "/"
    }
  }
})

function Logout() {
  return <></>
}

export default Logout;
