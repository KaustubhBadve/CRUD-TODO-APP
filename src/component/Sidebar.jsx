import { Box, Button, color, Flex, Stack, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthReducer } from "../Redux/Store";
import { useSearchParams } from "react-router-dom";
import { logout, profile } from "../Redux/AuthReducer/Action";

const Sidebar = () => {
  const isAuth = useSelector((state) => state.AuthReducer.isAuth);
  const [searchParams, setSearchparams] = useSearchParams();
  const [selectedTag, setSelectedTag] = useState(searchParams.getAll("tags") || []);
  const dispatch= useDispatch();
  const Profile=useSelector((state)=>state.AuthReducer.profile)


  useEffect(() => {
    let username=localStorage.getItem("username")
    let token=localStorage.getItem("token")  
    dispatch(profile(username,token))
  }, [])

  const tasks = useSelector((state) => state.AppReducer.tasks);
  

  
  const PersonalTask = tasks.filter((item) => item.tags.includes("personal"));
  const OfficialTask = tasks.filter((item) => item.tags.includes("official"));
  const OtherTask = tasks.filter((item) => item.tags.includes("others"))
   

  const HandleTagChange = (tag) => {
    const newSelectedTags = [...selectedTag];
    if (newSelectedTags.includes(tag)) {
      newSelectedTags.splice(newSelectedTags.indexOf(tag), 1);
    } else {
      newSelectedTags.push(tag);
    }
    setSelectedTag(newSelectedTags);
  };

  useEffect(() => {
    if (selectedTag) {
      setSearchparams({ tags: selectedTag });
    }
  }, [selectedTag, setSearchparams]);


  const logoutHandler=()=>{
    dispatch(logout())
  }


  return (
    <Box bg="blackAlpha.300" width="350px" height="100vh" p="9px" borderRadius="10px" >
      <Stack direction="column" gap="20px">
        <Box lineHeight="40px" bg="gray.200" height="40vh" p="5px" borderRadius="15px" mt="10px">
          <Box fontSize="18px" textAlign="center" fontStyle="italic" fontWeight="600">User Details </Box>
          <Text fontSize="14px"> User Name : <span style={{fontSize:"16px", fontWeight:"600"}}>{Profile?.name}</span> </Text>
          <Text  fontSize="14px">Username :  <span style={{fontSize:"16px", fontWeight:"600"}}>{Profile?.username}</span> </Text>
          <Text  fontSize="14px">Email :  <span style={{fontSize:"16px", fontWeight:"600"}}>{Profile?.email}</span> </Text>
          <Text  fontSize="14px">Mobile no. :  <span style={{fontSize:"16px", fontWeight:"600"}}>{Profile?.mobile}</span> </Text>
          <Text  fontSize="14px">About :  <span style={{fontSize:"16px", fontWeight:"600"}}>{Profile?.description}</span> </Text>
        </Box>
        <Box height="35vh" pt="20px"  borderRadius="15px" bg="gray.400">
      
        <Box fontSize="18px" mb="20px" textAlign="center" fontStyle="italic" fontWeight="600">Filter By tags </Box>

          <Flex direction="column" gap="15px" m="5px">
            
            <Box
              border="2px solid skyblue"
              borderRadius="10px"
              backgroundColor={
                selectedTag.includes("All") ? "blue.400" : "blue.100"
              }
              cursor="pointer"
              onClick={() => HandleTagChange("All")}
              pr="30px"
              pl="20px"
            >
              <Flex padding="0 10px">
                <Text>All</Text>
                <Text ml="auto">{tasks.length}</Text>
              </Flex>
            </Box>

            <Box
              border="2px solid skyblue"
              borderRadius="10px"
              backgroundColor={
                selectedTag.includes("personal") ? "green.400" : "green.100"
              }
              cursor="pointer"
              onClick={() => HandleTagChange("personal")}
              pr="30px"
              pl="20px"
            >
              <Flex padding="0 10px">
                <Text>Personal</Text>
                <Text ml="auto">{PersonalTask.length}</Text>
              </Flex>
            </Box>

            <Box
             border="2px solid skyblue"
             borderRadius="10px"
              backgroundColor={
                selectedTag.includes("official") ? "purple.400" : "purple.100"
              }
              cursor="pointer"
              onClick={() => HandleTagChange("official")}
              pr="30px"
              pl="20px"
            >
              <Flex padding="0 10px">
                <Text>Official</Text>
                <Text ml="auto">{OfficialTask.length}</Text>
              </Flex>
            </Box>

            <Box
              border="2px solid skyblue"
              borderRadius="10px"
              backgroundColor={
                selectedTag.includes("others") ? "orange.400" : "orange.100"
              }
              cursor="pointer"
              onClick={() => HandleTagChange("others")}
              pr="30px"
              pl="20px"
            >
              <Flex padding="0 10px">
                <Text>Others</Text>
                <Text ml="auto">{OtherTask.length}</Text>
              </Flex>
            </Box>
          </Flex>
        </Box>
        <Box height="3vh" display="flex" pt="40px" justifyContent="center">
          <Button onClick={logoutHandler} bg="gray.500" color="white" fontWeight="600" fontSize="20px" _hover={{color:"black"}} width="95%">{isAuth ? "Logout" : ""}</Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default Sidebar;
