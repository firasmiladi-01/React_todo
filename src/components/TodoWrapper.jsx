import React, { useEffect, useState } from "react";
import { TodoForm } from "./TodoForm";
import { EditTodoForm } from "./EditTodoForm";
import { Todo } from "./Todo";
import { Box, List } from "@mui/material";
export const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    const fetchTodos = async () => {
      const response = await fetch(
        "https://todoreact-e2c96-default-rtdb.firebaseio.com/todos.json"
      );
      const data = await response.json();
      const loadedTodos = [];
      for (const key in data) {
        loadedTodos.push({
          id: key,
          task: data[key].task,
          completed: data[key].completed,
          isEditing: false,
        });
      }
      setTodos(loadedTodos);
    };
    fetchTodos();
  }, []);
  const addTodo = (task, id) => {
    const todo = { id: id, task, completed: false, isEditing: false };
    setTodos([...todos, { ...todo }]);
  };
  const toggleCompletedDB = async (id, todo) => {
    const response = await fetch(
      `https://todoreact-e2c96-default-rtdb.firebaseio.com/todos/${id}.json`,
      {
        method: "PUT",
        body: JSON.stringify({ ...todo, completed: !todo.completed }),
      }
    );
    if (!response.ok) {
      console.log(response.status);
      throw new Error("Failed to update data");
    }
  };
  const toggleCompleted = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          toggleCompletedDB(id, { completed: todo.completed, task: todo.task });
          return { ...todo, completed: !todo.completed };
        } else return todo;
      })
    );
  };
  const DeleteTodoFromDataBase = async (id) => {
    const response = await fetch(
      `https://todoreact-e2c96-default-rtdb.firebaseio.com/todos/${id}.json`,
      { method: "DELETE" }
    );
    if (!response.ok) {
      throw new Error("Failed to delete data from Firebase database");
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    DeleteTodoFromDataBase(id);
  };
  const toggleEdit = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };
  const editTodoDB = async (id, todo) => {
    const response = await fetch(
      `https://todoreact-e2c96-default-rtdb.firebaseio.com/todos/${id}.json`,
      { method: "PUT", body: JSON.stringify(todo) }
    );
    if (!response.ok) {
      throw new Error("Failed to update data");
    }
  };
  const editTodo = (id, task) => {
    let completed;
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          completed = todo.completed;
          editTodoDB(id, { task, completed });
          return { ...todo, isEditing: !todo.isEditing, task };
        } else return todo;
      })
    );
  };
  const addTodoToDataBase = async (todo) => {
    let id;
    const response = await fetch(
      "https://todoreact-e2c96-default-rtdb.firebaseio.com/todos.json",
      { method: "POST", body: JSON.stringify(todo) }
    );
    if (!response.ok) {
      throw new Error("Failed to add data to Firebase database");
    } else {
      const data = await response.json();
      id = data.name;
      return id;
    }
  };
  return (
    <Box className="TodoWrapper">
      <TodoForm addTodo={addTodo} addTodoToDataBase={addTodoToDataBase} />
      <List>
        {todos.slice().reverse().map((todo) => {
          return todo.isEditing ? (
            <EditTodoForm editTodo={editTodo} key={todo.id} todo={todo} />
          ) : (
            <Todo
              key={todo.id}
              todo={todo}
              toggleCompleted={toggleCompleted}
              deleteTodo={deleteTodo}
              toggleEdit={toggleEdit}
            />
          );
        })}
      </List>
    </Box>
  );
};
