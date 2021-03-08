import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Box,
  Text,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";

import { fire } from "../firebase";

const Blog = () => {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [state, setState] = useState("add");
  const [blogImage, setBlogImage] = useState("");
  const [blogTitle, setBlogTitle] = useState("");
  const [blogs, setBlogs] = useState([]);

  const createBlog = () => {
    fire
      .firestore()
      .collection("blog")
      .add({
        image: blogImage,
        title: blogTitle,
      })
      .then(() => {
        getBlogs();
      });
    setBlogImage("");
    setBlogTitle("");
    onClose();
  };
  const logout = () => {
    fire
      .auth()
      .signOut()
      .then(() => {
        router.push("/login");
      });
  };

  const openBlog = (blog) => {
    setState("view");
    setBlogImage(blog.image);
    setBlogTitle(blog.title);
    onOpen();
  };
  const addBlog = () => {
    setBlogImage("");
    setBlogTitle("");
    setState("add");
    onOpen();
  };

  const getBlogs = () => {
    fire
      .firestore()
      .collection("blog")
      .onSnapshot((snap) => {
        const blogs = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBlogs(blogs);
      });
  };
  useEffect(() => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true);
        getBlogs();
      } else {
        router.push("/login");
        setLoggedIn(false);
      }
    });
  }, []);

  return (
    <Container maxW="container.lg">
      <Box>
        <Text fontSize="3xl" textAlign="center" mt={5}>
          Blog Page
        </Text>
        <Box textAlign="right">
          <Button mt={4} onClick={addBlog} colorScheme="teal">
            Add Blog
          </Button>
          <Button mt={4} onClick={logout} ml={3} colorScheme="pink" variant="outline">
            Logout
          </Button>
        </Box>

        <Grid templateColumns="repeat(4, 1fr)" gap={5} mt={8}>
          {blogs.length > 0 &&
            blogs.map((blog, index) => (
              <Box w="100%" onClick={() => openBlog(blog)} key={index}>
                <Image src={blog.image} alt="Blog Image" objectFit="cover" height="180px" width="100%" />
                <Text
                  fontSize="lg"
                  textAlign="center"
                  w="100%"
                  overflow="hidden"
                  whiteSpace="nowrap"
                  textOverflow="ellipsis"
                  mt={3}>
                  {blog.title}
                </Text>
              </Box>
            ))}
        </Grid>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        {state === "add" ? (
          <ModalContent>
            <ModalHeader>Add a Blog</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl id="image" isRequired mt={5}>
                <FormLabel>Blog Image</FormLabel>
                <Input
                  placeholder="Image"
                  onChange={(e) => setBlogImage(e.target.value)}
                  name="image"
                  value={blogImage}
                />
              </FormControl>
              <FormControl id="title" isRequired mt={5}>
                <FormLabel>Blog Title</FormLabel>
                <Input
                  placeholder="Title"
                  name="title"
                  onChange={(e) => setBlogTitle(e.target.value)}
                  value={blogTitle}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={createBlog}>
                Add
              </Button>
            </ModalFooter>
          </ModalContent>
        ) : (
          <ModalContent>
            <ModalHeader>View a Blog</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Image src={blogImage} alt="Segun Adebayo" objectFit="cover" height="220px" width="100%" />
              <Text fontSize="lg" textAlign="center" mt={3}>
                {blogTitle}
              </Text>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        )}
      </Modal>
    </Container>
  );
};

export default Blog;
