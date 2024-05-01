import React from 'react';

const TaskModal = ({ task, onClose }) => {
  return (
    <div className="task-modal">
      <h2>Task Details</h2>
      <h3>{task.name}</h3>
      <p>Due Date: {task.dueDate}</p>
      <p>Assigned to: {task.assignee}</p>
      <p>Description: {task.description}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default TaskModal;
