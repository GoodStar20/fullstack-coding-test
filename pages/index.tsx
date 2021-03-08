import React, { useRef } from "react";
import Head from "next/head";
import { Container } from "@chakra-ui/react";
import Login from "./login";

const Home = () => {
  return (
    <Container>
      <Head>
        <title>Coding Test</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Login />
    </Container>
  );
};

export default Home;
