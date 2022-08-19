import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { login } from "../Redux/AuthReducer/Action";
import { LOGIN_SUCCESS } from "../Redux/AuthReducer/ActionType";
import {AuthReducer} from '../Redux/Store'



export default function Login() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const isLoading = useSelector((state) => state.AuthReducer.isLoading);
  const dispatch=useDispatch()
  const navigate=useNavigate()

useEffect(() => {
  if(username){
    localStorage.setItem("username",username)
  }
}, [username])

 

const LoginHandler=()=>{
  if(username && password){
    let payload={
    username,
    password
    }
    dispatch(login(payload)).then((r)=>{
      if(r===LOGIN_SUCCESS)
      {
    navigate("/", {replace:true})
      }
    })
  } 
}

  return (
    <Flex
      minH={"100vh"}
      width="1500px"
      ml="-190px"
      align={"center"}
      justify={"center"}
      // bg={useColorModeValue("gray.50", "gray.800")}
      bg="whiteAlpha.900"
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading mt="-20px" pb="30px" fontSize="40px" fontStyle="italic" width="800px" textAlign="center">A better offline to-do list app for work</Heading>
          <Text fontSize="23px" width="700px" color={"gray.600"} textAlign="center" pb="30px">We makes it easier for a team or individual to plan their work by using offline to-do lists</Text>
          <Heading fontSize={"3xl"}>To get started, Login</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            & enjoy all of our cool <Link color={"blue.400"}>features</Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="username">
              <FormLabel>User Name</FormLabel>
              <Input type="text" value={username} onChange={(e)=>setusername(e.target.value)} />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" value={password} onChange={(e)=>setpassword(e.target.value)} />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Link color={"blue.400"}>Forgot password?</Link>
              </Stack>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={LoginHandler}
                isLoading={isLoading}
              >
                Login
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Don't have an account{" "}
                <RouterLink to="/signup" style={{color:"blue"}} >
                  Signup
                </RouterLink>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
