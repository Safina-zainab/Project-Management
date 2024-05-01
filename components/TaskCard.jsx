import React from 'react';

const TaskCard = ({ task }) => {
  return (
    <div className="task-card">
      <h3>{task.name}</h3>
      <p>Due Date: {task.dueDate}</p>
      <p>Assigned to: {task.assignee}</p>
      <p>Description: {task.description}</p>
    </div>
  );
};

export default TaskCard;
