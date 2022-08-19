import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import TaskCard from "../component/TaskCard";
import { getTask } from "../Redux/AppReduce/Action";
import { AppReducer } from "../Redux/Store";

const HomePage = () => {
  const [searchParams] = useSearchParams();
  const tasks = useSelector((state) => state.AppReducer.tasks);
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const getTaskHandler = useCallback(() => {
    dispatch(getTask());
  }, [dispatch]);

  useEffect(() => {
    if (tasks.length == 0) {
      getTaskHandler();
    }
  }, [getTaskHandler, tasks.length]);

  const filterByparamsTags = (task) => {
    let paramTags = searchParams.getAll("tags");

    if (paramTags.includes("All") || paramTags.length === 0) {
      return task;
    }

    let data = task.tags.filter((tags) => {
      if (paramTags.includes(tags)) {
        return true;
      } else {
        return false;
      }
    });
    if (data.length) {
      return task;
    } else {
      return false;
    }
    console.log("data", data);
  };

  return (
    <Box bg="facebook.100" width="100%">
      <Flex justifyContent="space-around">
        {/* todo */}

        <Box
          borderRadius="5px"
          bg="facebook.200"
          pt="20px"
          height="100vh"
          width="300px"
        >
          <Box>
            <Text
              fontSize="23px"
              fontWeight="600"
              fontStyle="italic"
              textDecoration="underline"
              mb="20px"
              textAlign="center"
            >
              TODO
            </Text>
          </Box>
          {tasks.length > 0 &&
            tasks
              .filter((item) => item.task_status === "todo")
              .filter((task) => filterByparamsTags(task))
              .map((item) => {
                return <TaskCard key={item.id} {...item} colorScheme="green" />;
              })}
        </Box>

        {/* in-progrss */}

        <Box
          borderRadius="5px"
          bg="facebook.200"
          pt="20px"
          height="100vh"
          width="300px"
        >
          <Box>
            <Text
              fontSize="23px"
              fontWeight="600"
              fontStyle="italic"
              textDecoration="underline"
              mb="20px"
              textAlign="center"
            >
              TODO-IN-PROGRESS
            </Text>
          </Box>
          {tasks.length > 0 &&
            tasks
              .filter((item) => item.task_status === "in-progress")
              .filter((task) => filterByparamsTags(task))
              .map((item) => {
                return (
                  <TaskCard key={item.id} {...item} colorScheme="yellow" />
                );
              })}
        </Box>

        {/* done */}

        <Box
          borderRadius="5px"
          bg="facebook.200"
          height="100vh"
          pt="20px"
          width="300px"
        >
          <Box>
            <Text
              fontSize="23px"
              fontWeight="600"
              fontStyle="italic"
              textDecoration="underline"
              mb="20px"
              textAlign="center"
            >
              Done
            </Text>
          </Box>
          {tasks.length > 0 &&
            tasks
              .filter((item) => item.task_status === "done")
              .filter((task) => filterByparamsTags(task))
              .map((item) => {
                return <TaskCard key={item.id} {...item} colorScheme="blue" />;
              })}
        </Box>

        <Box
          width="60px"
          textAlign="center"
          _hover={{color:"black", bg:"facebook.400"}}
          pr="5px"
          fontSize="33px"
          color="white"
          fontWeight="600"
          fontStyle="italic"
          style={{ writingMode: "vertical-rl" }}
          bg="facebook.700"
          cursor="pointer"
          height="100vh"
          mr="-10"
          onClick={()=>navigate("/newtask")}
        >
          Create New Task
        </Box>
      </Flex>
    </Box>
  );
};

export default HomePage;
