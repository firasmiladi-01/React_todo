import React, { useState } from "react";
import { TextField, Button, Stack, Input, InputBase, Typography } from "@mui/material";
export const TodoForm = (props) => {
  const [value, setValue] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (value) {
      const id = await props.addTodoToDataBase({
        task: value,
        completed: false,
      });
      props.addTodo(value, id);
    }
    setValue("");
  };
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <form onSubmit={handleSubmit} className="TodoForm">
      <Typography variant="h5" color="#fff">Get Things Done!</Typography>
      <Input
        id="filled-basic"
        placeholder="What is the task today ?"
        value={value}
        onChange={handleChange}
       className="todo-input"
       sx={{
        ':after': { borderBottomColor: '#8758ff' },
      }}
       
      />
      <Button
        className="todo-btn"
        type="submit"
        variant="contained"
        size="large"
      >
        Add Task
      </Button>
    </form>
  );
};
