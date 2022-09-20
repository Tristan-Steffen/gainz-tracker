import { AuthenticationForm } from "../components";

export async function getServerSideProps() {
  return {
    props: {
      test: true,
    }, // Will be passed to the page component as props
  };
}

export default function Register() {
  return <AuthenticationForm actionProp="/api/user"></AuthenticationForm>;
};
