import React, { useState, useEffect, useRef } from "react";

const styles = {
  container: { textAlign: "center", maxWidth: "400px", margin: "auto", padding: "20px" },
  input: { padding: "8px", marginRight: "5px", width: "60%" },
  button: { padding: "8px 12px", margin: "5px", cursor: "pointer", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px" },
  task: (completed) => ({
    textDecoration: completed ? "line-through" : "none",
    cursor: "pointer",
    display: "inline-block",
    width: "70%",
    padding: "5px",
    color: completed ? "gray" : "black",
  }),
  filterButton: { padding: "6px 10px", margin: "5px", cursor: "pointer", border: "1px solid #007bff", borderRadius: "5px", backgroundColor: "white", color: "#007bff" },
  taskList: { listStyle: "none", padding: 0 },
};

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const inputRef = useRef(null);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    const text = inputRef.current.value.trim();
    if (text === "") return;

    setTasks([...tasks, { id: Date.now(), text, completed: false }]);
    inputRef.current.value = "";
    inputRef.current.focus();
  };

  const toggleTask = (taskId) => {
    setTasks(tasks.map(task => (task.id === taskId ? { ...task, completed: !task.completed } : task)));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === "Completed") return task.completed;
    if (filter === "Pending") return !task.completed;
    return true;
  });

  return (
    <div style={styles.container}>
      <h2>To-Do List</h2>
      <input ref={inputRef} type="text" placeholder="Enter task" style={styles.input} />
      <button onClick={addTask} style={styles.button}>Add</button>

      <div>
        <button onClick={() => setFilter("All")} style={styles.filterButton}>All</button>
        <button onClick={() => setFilter("Completed")} style={styles.filterButton}>Completed</button>
        <button onClick={() => setFilter("Pending")} style={styles.filterButton}>Pending</button>
      </div>

      <ul style={styles.taskList}>
        {filteredTasks.map(task => (
          <li key={task.id}>
            <span style={styles.task(task.completed)} onClick={() => toggleTask(task.id)}>
              {task.text}
            </span>
            <button onClick={() => deleteTask(task.id)} style={styles.button}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
