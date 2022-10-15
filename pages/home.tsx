import { GooeyButton } from "components";
import { Main } from "layout";
import { withSessionSsr } from "lib/auth";
import { getAllForUser } from "lib/data";
import { AllDataPoints, UserData } from "lib/types";
import Head from "next/head";
import Link from "next/link";
import Router from "next/router";
import styles from "styles/Home.module.css";
import { Barbell, Bed, Fish } from "tabler-icons-react";

export const getServerSideProps = withSessionSsr(async function({ req }) {
  const user = req.session?.user || null;

  if (!user) {
    return {
      props: {},
      redirect: {
        destination: "/auth/login"
      }
    }
  }

  const datapoints = await getAllForUser(user.id);

  return {
    props: {
      user,
      datapoints
    }
  }
})

const Home = ({ user, datapoints }: { user: UserData, datapoints: AllDataPoints[] }) => {
  return (
    <Main>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Gainz App</h1>
      <h3>Hi {user.username}</h3>

      {datapoints.map((d, i) => {
        return <pre key={i}>{JSON.stringify(d)}</pre>
      })}

      <Link href="/auth/logout">logout</Link>

      <div style={{ position: "fixed", right: "10px", bottom: "30px" }}>
        <GooeyButton startAngle={-100} endAngle={70} onClick={() => Router.push("/add")}>
          <button className={styles.button} onClick={() => Router.push("/add/sleep")}><Bed /></button>
          <button className={styles.button} onClick={() => Router.push("/add/weight")}><Barbell /></button>
          <button className={styles.button} onClick={() => Router.push("/add/gym")}><Fish /></button>
        </GooeyButton>
      </div>
    </Main>
  );
};

export default Home;
