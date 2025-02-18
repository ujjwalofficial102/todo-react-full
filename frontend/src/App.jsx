import { useState, useEffect } from "react";
import "./App.css";
import { CreateTodo } from "./components/CreateTodo";
import { Todos } from "./components/Todos";

function App() {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    try {
      const res = await fetch("http://localhost:3001/todos");
      if (!res.ok) {
        throw new Error("Failed to fetch todos");
      }
      const json = await res.json();
      setTodos(json.todos);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
      <CreateTodo refreshTodos={fetchTodos} />
      <Todos todos={todos} setTodos={setTodos} />
    </div>
  );
}

export default App;
