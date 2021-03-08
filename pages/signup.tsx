import React, { useState } from "react";
import { Container, Input, Box, Text, FormControl, FormLabel, Button } from "@chakra-ui/react";
import Link from "next/link";
import { auth, createUserProfileDocument } from "../firebase";

const Signup = () => {
  const [newUser, setUSer] = useState<{ displayName: string; email: string; password: string }>({
    displayName: "",
    email: "",
    password: "",
  });

  const { displayName, email, password } = newUser;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUSer({ ...newUser, [name]: value });
  };

  const onSubmit = async () => {
    const { user } = await auth.createUserWithEmailAndPassword(newUser?.email, newUser.password);
    if (user) {
      await createUserProfileDocument(user, { displayName: newUser.displayName });
      setUSer({ displayName: "", email: "", password: "" });
    }
  };

  return (
    <Container>
      <Box d="flex" flexDirection="column" alignItems="center" minH="100vh" justifyContent="center">
        <Text fontSize="3xl">Sign Up</Text>
        <FormControl id="displayName" isRequired mt={8}>
          <FormLabel>Full Name</FormLabel>
          <Input placeholder="User name" onChange={onChange} name="displayName" value={displayName} />
        </FormControl>
        <FormControl id="email" isRequired mt={5}>
          <FormLabel>Email</FormLabel>
          <Input placeholder="Email" onChange={onChange} name="email" value={email} />
        </FormControl>
        <FormControl id="password" isRequired mt={5}>
          <FormLabel>Password</FormLabel>
          <Input placeholder="Password" type="password" name="password" onChange={onChange} value={password} />
        </FormControl>
        <Button colorScheme="teal" size="md" onClick={onSubmit} mt={8}>
          Sign Up
        </Button>
        <Link href="/login">
          <Text fontSize="sm" mt={5} as="u" color="blue" cursor="pointer">
            Login
          </Text>
        </Link>
      </Box>
    </Container>
  );
};

export default Signup;
