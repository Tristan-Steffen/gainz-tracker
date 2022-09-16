import { useState } from "react";
import { AuthenticationForm, Button } from "../components";

export async function getServerSideProps(context: any) {
  console.log(context);

  return {
    props: {
      test: true,
    }, // Will be passed to the page component as props
  };
}

export default () => {
  return <AuthenticationForm actionProp="/api/user"></AuthenticationForm>;
};
