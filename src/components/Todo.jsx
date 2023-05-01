import React from "react";
import {
  ListItem,
  ListItemText,
  IconButton,
  ListItemButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
export const Todo = (props) => {
  return (
    <ListItem className="Todo">
      <ListItemButton
        dense
        onClick={() => props.toggleCompleted(props.todo.id)}
      >
        <ListItemText
          primary={props.todo.task}
          sx={{ textDecoration: props.todo.completed ? "line-through" : "" }}
        />
      </ListItemButton>
      <IconButton
        aria-label="comments"
        onClick={() => props.toggleEdit(props.todo.id)}
      >
        <EditIcon />
      </IconButton>
      <IconButton
        edge="end"
        aria-label="comments"
        onClick={() => props.deleteTodo(props.todo.id)}
      >
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
};
