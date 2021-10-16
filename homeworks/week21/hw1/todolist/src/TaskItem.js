import styled from "styled-components";
import { useCallback } from "react";

const Task = styled.div`
  display: flex;
  border-bottom: 2px #00838f solid;
  margin: 20px 60px;
  justify-content: space-between;
  align-items: center;
`;

const TaskContent = styled.div`
  ${(props) =>
    props.finished &&
    `
text-decoration: line-through
`}
`;

const TaskBtns = styled.div``;

const MarkFinishedBtn = styled.button`
  min-width: 80px;
  margin: 10px 5px;
  border-radius: 6px;
  border: 1px #607d8b solid;
  padding: 6px;
  background-color: #ffd600;
  color: #006064;
  cursor: pointer;
  &:hover {
    background-color: #006064;
    color: white;
  }
`;

const DeleteBtn = styled(MarkFinishedBtn)`
  margin: 0px 8px;
  background-color: white;
`;

function TaskItem({ task, handleDeleteTask, handleMarkFinished }) {
  const handleDeleteBtnClick = useCallback(() => {
    handleDeleteTask(task.id);
  }, [handleDeleteTask, task]);

  const handleMarkFinishedBtnToggle = useCallback(() => {
    handleMarkFinished(task.id);
  }, [handleMarkFinished, task]);

  return (
    <Task data-task-id={task.id}>
      <TaskContent finished={task.finished}>{task.content}</TaskContent>
      <TaskBtns>
        <MarkFinishedBtn onClick={handleMarkFinishedBtnToggle}>
          {task.finished ? "Unfinished" : "Finished"}
        </MarkFinishedBtn>
        <DeleteBtn onClick={handleDeleteBtnClick}>Delete</DeleteBtn>
      </TaskBtns>
    </Task>
  );
}

export default TaskItem;
