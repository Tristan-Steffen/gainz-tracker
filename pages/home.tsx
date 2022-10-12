import Head from "next/head";
import Link from "next/link";
import { GooeyButton } from "../components";
import { Main } from "../layout";
import { ensureSessionSsr } from "../lib/auth";
import { UserData } from "../lib/types";

export const getServerSideProps = ensureSessionSsr;

const Home = ({ user }: { user: UserData }) => {
  return (
    <Main>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Gainz App</h1>
      <h3>Hi {user.username}</h3>

      <Link href="/logout">logout</Link>

      <div style={{ position: "absolute", right: "10px", bottom: "30px" }}>
        <GooeyButton />
      </div>
    </Main>
  );
};

export default Home;