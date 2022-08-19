import { DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Editable,
  EditablePreview,
  EditableTextarea,
  Flex,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams,useNavigate } from "react-router-dom";
import {
  addSubTask,
  deleteSubTask,
  getTask,
  updateTask,
} from "../Redux/AppReduce/Action";

const Editpage = () => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskStatus, setTaskStatus] = useState("");
  const [taskTag, setTaskTag] = useState([]);
  const [currentSubTask, setcurrentSubTask] = useState("");
  const [subTask, setSubTask] = useState([]);
  const [checkBox, setCheckBox] = useState([]);
  const navigate=useNavigate()
  const { id } = useParams();
  const dispatch = useDispatch();

  const task = useSelector((state) => state.AppReducer.tasks);

  useEffect(() => {
    if (task) {
      const currentTask = task.find((item) => item.id === Number(id));

      if (currentTask) {
        setTaskDescription(currentTask.description);
        setTaskTitle(currentTask.title);
        setTaskStatus(currentTask.task_status);
        setTaskTag(currentTask.tags);
        setSubTask(currentTask.subTask);
        let data = currentTask.subTask
          .filter((item) => {
            return item.status && item.subTaskTitle;
          })
          .map((item) => item.subTaskTitle);
        setCheckBox(data);
      }
    }
  }, [task, id]);

  useEffect(() => {
    if (task.length == 0) {
      dispatch(getTask());
    }
  }, []);

  const updateHandler = (type, value) => {
    if (type === "textAndDescription") {
      dispatch(
        updateTask(id, {
          title: taskTitle,
          description: taskDescription,
        })
      ).then(() => {
        dispatch(getTask());
      });
    } else if (type === "taskStatus") {
      dispatch(
        updateTask(id, {
          task_status: value,
        })
      ).then(() => {
        dispatch(getTask());
      });
    } else if (type === "taskTags") {
      dispatch(
        updateTask(id, {
          tags: value,
        })
      ).then(() => {
        dispatch(getTask());
      });
    }
  };


  const Handledelete=(title)=>{
    const newData=subTask.filter((item)=>item.subTaskTitle!==title)

    dispatch(deleteSubTask(id,{subTask:newData})).then(()=>{
      dispatch(getTask())
    })
  }

  const AddSubTask = (e) => {
    e.preventDefault();
    if (currentSubTask) {
      const newSubTasks = [
        ...subTask,
        { subTaskTitle: currentSubTask, status: false },
      ];

      dispatch(addSubTask(id, { subTask: newSubTasks }))
        .then(() => {
          dispatch(getTask());
        })
        .then(() => {
          setcurrentSubTask("");
        });
    }
  };

  const updateSubTaskStatus = (checkBoxValues) => {
    let newData = subTask.map((item) => {
      if (checkBoxValues.includes(item.subTaskTitle)) {
        return {
          ...item,
          status: true,
        };
      } else {
        return { ...item, status: false };
      }
    });
    dispatch(addSubTask(id, { subTask: newData })).then(() => {
      getTask();
    });
  };

  const HandleBackHome=()=>{
     navigate("/")
  }

  return (
    <Box width="100%" bg="whatsapp.200" borderRadius="10px">
      <Flex justifyContent="space-around">
        <Box  pt="30px" height="100vh" width="500px" borderRadius="8px" p="15px" bg="cyan.400">
          <Box>
            <Stack direction="column">
              <Text fontSize="17px" fontWeight="600" >Edit Task Name : </Text>
              <Input
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                outline="blue.600"
               bg="white"
              />
              <Text pt="30px"  fontSize="17px" fontWeight="600">Edit Description :</Text>
              <Editable value={taskDescription}>
                <EditablePreview  height="130px" border="2px solid black" width="95%" bg="white" p="10px"/>
                <EditableTextarea
                 bg="white"
                 height="130px"
                 p="10px"
                  value={taskDescription}
                  onChange={(e) => {
                    setTaskDescription(e.target.value);
                  }}
                />
              </Editable>
           
            </Stack>
          </Box>
          
          <Text fontSize="19px" pt="70px" pb="20px" fontWeight="600">Edit Task Status</Text>

          <Box fontSize="18px" fontWeight="600">
            <RadioGroup
              onChange={(value) => (
                setTaskStatus(value), updateHandler("taskStatus", value)
              )}
              value={taskStatus}
            >
              <Stack direction="row" justifyContent="space-evenly" ml="-70px" mb="40px">
                <Radio  value="todo">Todo</Radio>
                <Radio  value="in-progress">In-Progress</Radio>
                <Radio  value="done">Done</Radio>
              </Stack>
            </RadioGroup>
          </Box>

          <Text fontSize="19px" pb="20px" fontWeight="600">Edit Tag</Text>
          <Box fontSize="18px" fontWeight="600">
            <CheckboxGroup
              colorScheme="green"
              value={taskTag}
              onChange={(value) => {
                setTaskTag(value);
                updateHandler("taskTags", value);
              }}
            >
              <Stack spacing={[1, 5]} direction="row" justifyContent="space-evenly" ml="-70px" mb="40px">
                <Checkbox _hover={{color:"white", fontSize:"26px"}} value="official">Official</Checkbox>
                <Checkbox _hover={{color:"white", fontSize:"26px"}} value="personal">Personal</Checkbox>
                <Checkbox _hover={{color:"white", fontSize:"26px"}} value="others">Others</Checkbox>
              </Stack>
            </CheckboxGroup>
          </Box>

          <Stack pt="40px" pb="50px" align='center'>
              <Button width="60%"         
                onClick={() => {
                  updateHandler("textAndDescription");
                }}
              >
                UPDATE
              </Button>
              </Stack>
        </Box>

        {/* {Sub Task} */}
       
        <Box  pt="30px" height="100vh" width="500px" borderRadius="8px" p="15px" bg="cyan.400">
          <form onSubmit={AddSubTask}>
          <Text fontSize="19px" fontWeight="600" pb="20px" > Delete / Add New Sub_Task</Text>
            <Flex>
              <Input
                placeholder="Add new subtask"
                value={currentSubTask}
                onChange={(e) => setcurrentSubTask(e.target.value)}
                outline="blue.600"
                bg="white"
                mb="40px"
              />
             
            </Flex>
          </form>

          <Flex fontSize="20px"  direction="column" p="1rem" gap="1rem">
            <CheckboxGroup
              value={checkBox}
              onChange={(value) => {
                setCheckBox(value);
                updateSubTaskStatus(value);
              }}
            >
              {subTask.length &&
                subTask.map((item, index) => {
                  return (
                    <Flex  justifyContent="space-between" key={index}>
                      <Checkbox key={index} size="md" value={item.subTaskTitle}>
                      <Text fontSize="19px"> {item.subTaskTitle}</Text> 
                      </Checkbox>
                      <DeleteIcon
                        onClick={() => Handledelete(item.subTaskTitle)}
                        cursor="pointer"
                      />
                    </Flex>
                  );
                })}
            </CheckboxGroup>
          </Flex>
         
          <Box  direction='row' pt="40px" align="center">
          <Button onClick={ AddSubTask}   width="60%" type="submit">Add</Button>
          </Box>

          <Box  direction='row' pt="140px" align="center">
          <Button onClick={HandleBackHome} height="80px" fontSize="20px" bg="cyan.600"  width="60%" type="submit">Back to Home Page</Button>
          </Box>
        </Box>

        {/* Create New */}

        {/* <Box mt="3vh" height="95vh" width="250px" border="1px solid blue"></Box> */}
      </Flex>
    </Box>
  );
};

export default Editpage;
