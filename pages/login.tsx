import React, { useState } from "react";
import { Container, Input, Box, Text, FormControl, FormLabel, Button } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";

import { auth } from "../firebase";

const Login = () => {
  const router = useRouter();
  const [user, setUser] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });
  const { email, password } = user;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUser({ ...user, [name]: value });
  };

  const onSubmit = async () => {
    await auth.signInWithEmailAndPassword(email, password).then(() => {
      router.push("/blog");
    });

    setUser({
      email: "",
      password: "",
    });
  };

  return (
    <Container>
      <Box d="flex" flexDirection="column" alignItems="center" minH="100vh" justifyContent="center">
        <Text fontSize="3xl">Login</Text>
        <FormControl id="email" isRequired mt={5}>
          <FormLabel>Email</FormLabel>
          <Input placeholder="Email" onChange={onChange} name="email" value={email} />
        </FormControl>
        <FormControl id="password" isRequired mt={5}>
          <FormLabel>Password</FormLabel>
          <Input placeholder="Password" type="password" name="password" onChange={onChange} value={password} />
        </FormControl>
        <Button colorScheme="teal" size="md" onClick={onSubmit} mt={8}>
          Login
        </Button>
        <Link href="/signup">
          <Text fontSize="sm" mt={5} as="u" color="blue" cursor="pointer">
            Sign Up
          </Text>
        </Link>
      </Box>
    </Container>
  );
};

export default Login;
