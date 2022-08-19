import {
  Badge,
  Box,
  Checkbox,
  CheckboxGroup,
  Flex,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { EditIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { Link } from "react-router-dom";

const TaskCard = ({
  id,
  title,
  description,
  tags,
  subTask,
  colorScheme = "green",
}) => {
  const [checkbox, setCheckbox] = useState(() => {
    let data = subTask
      .filter((item) => {
        return item.subTaskTitle && item.status;
      })
      .map((item) => item.subTaskTitle);
    return data;
  });
  console.log(checkbox);
  return (
    <Box
      lineHeight="30px"
      fontSize="16px"
      bg="facebook.400"
      color="white"
      borderRadius="8px"
      ml="9px"
      width="280px"
      padding="8px"
      mb="10px"
    >
      <Flex justifyContent="space-between">
        <Text>{title}</Text>
        <Link to={`/task/${id}`}>
          <EditIcon />{" "}
        </Link>
      </Flex>
      <Box>
        <Stack direction="row">
          {tags.length &&
            tags.map((item, index) => {
              return (
                <Badge
                  borderRadius="5px"
                  fontSize="12px"
                  height="25px"
                  key={index}
                  colorScheme={colorScheme}
                >
                  {item}
                </Badge>
              );
            })}
        </Stack>
      </Box>
      {description}
      <Flex fontStyle="italic" direction="column" >
        <CheckboxGroup   value={checkbox}>
          {subTask.length &&
            subTask.map((item, index) => {
              return (
                <Checkbox  key={index} size="md" value={item.subTaskTitle}>
                 <Text fontSize="13px">{item.subTaskTitle}</Text> 
                </Checkbox>
              );
            })}
        </CheckboxGroup>
      </Flex>
    </Box>
  );
};

export default TaskCard;
