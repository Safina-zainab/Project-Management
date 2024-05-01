import React from 'react';

const Task = ({ task, onClick }) => {
  return (
    <div className="task" onClick={() => onClick(task)}>
      <h3>{task.name}</h3>
      <p>Due Date: {task.dueDate}</p>
    </div>
  );
};

export default Task;
