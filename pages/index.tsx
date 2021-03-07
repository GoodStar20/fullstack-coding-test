import React, { useState, useRef } from "react";
import Head from "next/head";
import { Container, Input, Box } from "@chakra-ui/react";
// import styles from "../styles/Home.module.css";
import DynamicText from "../components/DynamicText";

const Home = () => {
  // const [textValue, setTextValue] = useState("");
  const dynamicRef = useRef();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setTextValue(e.target.value);
    // console.log("dynamicRef======>", dynamicRef);
  };

  return (
    <Container>
      <Head>
        <title>Coding Test</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box d="flex" flexDirection="column" alignItems="center" minH="100vh" justifyContent="center">
        <DynamicText />
        <Input onChange={onChange} placeholder="Please input text" />
      </Box>
    </Container>
  );
};

export default Home;
