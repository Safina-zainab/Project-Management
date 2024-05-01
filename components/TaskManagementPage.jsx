import { useEffect } from "react";
import useTaskStore from "../utils/useTaskStore";
import { fetchTasksByProjectId } from "../utils/mockApi";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const TaskManagementPage = ({ projectId }) => {
  const tasks = useTaskStore((state) => state.tasks); 

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksForProject = await fetchTasksByProjectId(projectId);
        useTaskStore.setState({ tasks: tasksForProject });
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [projectId]);

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination || destination.index === source.index) {
      return;
    }

    const draggedTask = tasks.find((task) => task.id === draggableId);
    const updatedTask = { ...draggedTask, status: destination.droppableId };
    const updatedTasks = tasks.map((task) => (task.id === draggableId ? updatedTask : task));

    useTaskStore.setState({ tasks: updatedTasks });
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex justify-around p-4">
        {['To Do', 'In Progress', 'Done'].map((status) => (
          <Droppable droppableId={status} key={status}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="flex flex-col items-center"
                style={{
                  backgroundColor: snapshot.isDraggingOver ? '#f0f0f0' : 'transparent',
                  padding: '8px',
                  minWidth: '200px',
                  minHeight: '200px',
                }}
              >
                <h2 className="text-lg font-semibold mb-2">{status}</h2>
                {tasks
                  .filter((task) => task.status === status)
                  .map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="bg-white p-4 rounded shadow-md mb-4"
                          style={{ ...provided.draggableProps.style, width: '100%' }}
                        >
                          <h3 className="text-md font-semibold">{task.title}</h3>
                          <p className="text-sm">Due: {task.deadline}</p>
                        </div>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default TaskManagementPage;
