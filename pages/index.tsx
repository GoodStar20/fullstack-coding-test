import React, { useState, useRef } from "react";
import Head from "next/head";
import { Container, Input, Box } from "@chakra-ui/react";
// import styles from "../styles/Home.module.css";
import DynamicText from "../components/DynamicText";

const Home = () => {
  const dynamicRef = useRef(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dynamicRef.current.changeValue(e.target.value);
  };
  return (
    <Container>
      <Head>
        <title>Coding Test</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box d="flex" flexDirection="column" alignItems="center" minH="100vh" justifyContent="center">
        <DynamicText ref={dynamicRef} />
        <Input onChange={onChange} placeholder="Please input text" />
      </Box>
    </Container>
  );
};

export default Home;
