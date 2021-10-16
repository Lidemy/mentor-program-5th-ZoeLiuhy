import "./App.css";
import styled from "styled-components";
import useTasks from "./useTasks";
import TaskItem from "./TaskItem";

const Wrapper = styled.div`
  margin: 0 auto;
  padding: 5px 25px;
  text-align: center;
  width: 765px;
  width: 100%;
`;

const Title = styled.h1`
  color: #00838f;
  margin: 20px;
`;

const InputBlock = styled.div`
  display: flex;
  margin: 0 auto;
  max-width: 768px;
  width: 100%;
`;

const Input = styled.input`
  flex: 1;
  border-radius: 6px;
  border: 2px #607d8b solid;
  padding: 5px;
  height: 30%;
  width: 50%;
  min-width: 100px;
  margin: 0 auto;
`;

const SubmitBtn = styled.button`
  min-width: 80px;
  margin: 0px 8px;
  border-radius: 6px;
  border: 1px #607d8b solid;
  padding: 6px;
  background-color: #006064;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: white;
    color: #006064;
  }
`;

const TaskList = styled.div``;

const Footer = styled.div`
  display: flex;
  text-align: center;
  justify-content: space-between;
  padding: 5px 50px;
`;

const FilterBtns = styled.div``;

const FilterBtn = styled(SubmitBtn)`
  background-color: transparent;
  color: #006064;
  font-size: 14px;
  border: 1px #ffd600 solid;
  margin: 2px;
  padding: 4px;
  &:hover {
    background-color: #ffd600;
    color: black;
  }
`;

const DeleteAllTasks = styled(SubmitBtn)`
  background: transparent;
  color: #006064;
  font-size: 14px;
  margin: 2px;
  padding: 4px;
  &:hover {
    color: black;
  }
`;

function App() {
  const {
    handleAddTask,
    handleInputChange,
    handleDeleteTask,
    handleMarkFinished,
    updateFilter,
    handleDeleteAllTasks,

    tasks,
    value,
    filter,
  } = useTasks();

  return (
    <Wrapper>
      <Title>To Do List</Title>
      <InputBlock>
        <Input
          placeholder="Create a task ..."
          value={value}
          onChange={handleInputChange}
        ></Input>
        <SubmitBtn onClick={handleAddTask}>Submit</SubmitBtn>
      </InputBlock>
      <TaskList>
        {tasks
          .filter((task) => {
            if (filter === "all") return true;
            if (filter === "unfinished") {
              return !task.finished;
            }
            if (filter === "finished") {
              if (task.finished) return true;
              return false;
            }
          })
          .map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleDeleteTask={handleDeleteTask}
              handleMarkFinished={handleMarkFinished}
            />
          ))}
      </TaskList>
      <Footer>
        <FilterBtns>
          <FilterBtn
            onClick={() => updateFilter("all")}
            isActive={filter === "all"}
          >
            All
          </FilterBtn>
          <FilterBtn
            onClick={() => updateFilter("unfinished")}
            isActive={filter === "unfinished"}
          >
            Unfinished
          </FilterBtn>
          <FilterBtn
            onClick={() => updateFilter("finished")}
            isActive={filter === "finished"}
          >
            Finished
          </FilterBtn>
        </FilterBtns>
        <DeleteAllTasks onClick={handleDeleteAllTasks}>
          Delete all
        </DeleteAllTasks>
      </Footer>
    </Wrapper>
  );
}

export default App;
