import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Task from './Task';

const TaskDivision = ({ title, tasks, onTaskClick }) => {
  return (
    <div className="task-division">
      <h2>{title}</h2>
      <Droppable droppableId={title}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {tasks.map((task, index) => (
              <Task key={task.id} task={task} onClick={onTaskClick} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TaskDivision;
