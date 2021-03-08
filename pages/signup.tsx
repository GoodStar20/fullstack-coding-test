import React, { useState } from "react";
import {
  Container,
  Input,
  Box,
  Text,
  FormControl,
  FormLabel,
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
  CloseButton,
} from "@chakra-ui/react";
import Link from "next/link";
import { auth, createUserProfileDocument } from "../firebase";

const Signup = () => {
  const [newUser, setUser] = useState<{ displayName: string; email: string; password: string }>({
    displayName: "",
    email: "",
    password: "",
  });
  const [isError, setError] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const { displayName, email, password } = newUser;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...newUser, [name]: value });
  };

  const onSubmit = async () => {
    setError(false);
    setSuccess(false);
    await auth
      .createUserWithEmailAndPassword(newUser?.email, newUser.password)
      .then(async (res) => {
        await createUserProfileDocument(res.user, { displayName: newUser.displayName });
        setUser({ displayName: "", email: "", password: "" });
        setSuccess(true);
      })
      .catch((err) => {
        setError(true);
      });
  };

  return (
    <Container>
      <Box d="flex" flexDirection="column" alignItems="center" minH="100vh" justifyContent="center">
        <Text fontSize="3xl" mb={2}>
          Sign Up
        </Text>
        {isError && (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle mr={2}>The email address is already in use by another account.</AlertTitle>
            <CloseButton position="absolute" right="8px" top="8px" onClick={() => setError(false)} />
          </Alert>
        )}
        {isSuccess && (
          <Alert status="success">
            <AlertIcon />
            <AlertTitle mr={2}>You have successfully registered.</AlertTitle>
            <CloseButton position="absolute" right="8px" top="8px" onClick={() => setSuccess(false)} />
          </Alert>
        )}
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
