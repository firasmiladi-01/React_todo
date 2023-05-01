import {React , useState}from "react";
import { TextField, Button, Stack, Input } from "@mui/material";
export const EditTodoForm = (props) => {
  const [value, setValue] = useState(props.todo.task);
  const handleSubmit = (e) => {
    e.preventDefault();
    props.editTodo(props.todo.id , value);
 
    
    
  };
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <form onSubmit={handleSubmit} className="TodoForm">
      
        <Input
          className="todo-input"
          value={value}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" size="large" className='todo-btn'>
          update
        </Button>
    </form>
  )
}