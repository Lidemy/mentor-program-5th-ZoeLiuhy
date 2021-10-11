import { useState, useRef } from "react";

function useTasks() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      content: "example",
      finished: false,
    },
  ]);

  const [value, setValue] = useState("");
  const id = useRef(2);
  const handleAddTask = () => {
    setTasks([
      {
        id: id.current,
        content: value,
        finished: false,
      },
      ...tasks,
    ]);
    setValue("");
    id.current++;
  };

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleMarkFinished = (id) => {
    setTasks(
      tasks.map((task) => {
        if (task.id !== id) return task;
        return {
          ...task,
          finished: !task.finished,
        };
      })
    );
  };

  const handleDeleteAllTasks = () => {
    setTasks([]);
  };

  const [filter, setFilter] = useState("all");

  const updateFilter = (newFilter) => {
    setFilter(newFilter);
  };

  return {
    handleAddTask,
    handleInputChange,
    handleDeleteTask,
    handleMarkFinished,
    updateFilter,
    handleDeleteAllTasks,

    tasks,
    value,
    filter,
  };
}

export default useTasks;
