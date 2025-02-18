export function Todos({ todos, setTodos }) {
  const markAsCompleted = (id) => {
    fetch("http://localhost:3001/completed", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id, // Send correct ID
        completed: true, // Ensure the backend updates it correctly
      }),
    })
      .then(async (res) => {
        const json = await res.json();
        if (res.ok) {
          // Update state at the parent level
          setTodos((prevTodos) =>
            prevTodos.map((todo) =>
              todo._id === id ? { ...todo, completed: true } : todo
            )
          );
          alert("Todo marked as Completed");
        } else {
          alert("Failed to update: " + json.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Something went wrong!");
      });
  };

  return (
    <div>
      {todos.map((todo) => (
        <div key={todo._id}>
          <h1>{todo.title}</h1>
          <h2>{todo.description}</h2>
          <button
            onClick={() => markAsCompleted(todo._id)}
            disabled={todo.completed} // Disable button if already completed
          >
            {todo.completed ? "Completed" : "Mark as Complete"}
          </button>
        </div>
      ))}
    </div>
  );
}
