import useTaskStore from "../utils/useTaskStore";
import { useState, useEffect } from "react";
import { Modal, DatePicker, Select, Button } from "antd";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import moment from "moment";
import { fetchTeamMembers } from "../utils/mockApi";
import { EyeOutlined, EditOutlined } from '@ant-design/icons'; 

const { Option } = Select;

const TaskManagementPage = ({ projectId, projects }) => {
  const tasks = useTaskStore((state) => state.tasks);
  const setTasks = useTaskStore((state) => state.setTasks);
  const [selectedTask, setSelectedTask] = useState(null);
  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const [filterCriteria, setFilterCriteria] = useState({
    status: "All",
    dueDate: "All",
    assignee: "All",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [teamMembers, setTeamMembers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newTaskData, setNewTaskData] = useState({
    title: "",
    description: "",
    dueDate: null,
    assignee: "",
    status: "",
  });

  useEffect(() => {
    const project = projects.find(
      (project) => project.id === parseInt(projectId)
    );
    if (project) {
      setTasks(project.tasks);
    }
  }, [projectId, projects, setTasks]);

  useEffect(() => {
    const fetchData = async () => {
      const members = await fetchTeamMembers();
      setTeamMembers(members);
    };
    fetchData();
  }, []);

  useEffect(() => {
    let filtered = tasks.filter((task) => {
      if (
        filterCriteria.status !== "All" &&
        task.status !== filterCriteria.status
      ) {
        return false;
      }
      if (
        filterCriteria.dueDate !== "All" &&
        moment(task.deadline).format("YYYY-MM-DD") !== filterCriteria.dueDate
      ) {
        return false;
      }
      if (
        filterCriteria.assignee !== "All" &&
        task.assignee !== filterCriteria.assignee
      ) {
        return false;
      }
      if (
        searchQuery &&
        !task.title.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }
      return true;
    });
    setFilteredTasks(filtered);
  }, [tasks, filterCriteria, searchQuery]);

  // const handleTaskClick = (taskId) => {
  //   const task = tasks.find((task) => task.id === taskId);
  //   setSelectedTask(task);
  // };

  const handleCloseModal = () => {
    setSelectedTask(null);
    setIsModalVisible(false);
  };

  const handleOpenModal = () => {
    setIsModalVisible(true);
    setNewTaskData({
        title: "",
        description: "",
        dueDate: null,
        assignee: "",
        status: "",
    });
};


  const handleFilterChange = (criteriaType, value) => {
    setFilterCriteria({ ...filterCriteria, [criteriaType]: value });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDateFilterChange = (date, dateString) => {
    if (!date) {
      setFilterCriteria({ ...filterCriteria, dueDate: "All" });
    } else {
      setFilterCriteria({ ...filterCriteria, dueDate: dateString });
    }
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const newTasks = [...filteredTasks];
    const [reorderedTask] = newTasks.splice(result.source.index, 1);
    reorderedTask.status = result.destination.droppableId;
    newTasks.splice(result.destination.index, 0, reorderedTask);

    setFilteredTasks(newTasks);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "To Do":
        return "bg-pink-200";
      case "In Progress":
        return "bg-blue-200";
      case "Done":
        return "bg-green-200";
      default:
        return "";
    }
  };

  const handleInputChange = (key, value) => {
    setNewTaskData({
      ...newTaskData,
      [key]: value,
    });
  };

  const handleAddTask = () => {
    const newTask = {
      ...newTaskData,
      id: tasks.length + 1, // Generate a unique ID for the new task
    };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    setIsModalVisible(false);
    setNewTaskData({
      title: "",
      description: "",
      dueDate: null,
      assignee: "",
      status: "",
    });
  };

  // Function to handle viewing a task
  const handleViewTask = (taskId) => {
    const task = tasks.find((task) => task.id === taskId);
    setSelectedTask(task);
    // setIsModalVisible(true);
  };

  // Function to handle editing a task
  const handleEditTask = (taskId) => {
    const task = tasks.find((task) => task.id === taskId);
    // setSelectedTask(task);
    setNewTaskData(task);
    setIsModalVisible(true);
  };

  return (
    <div>
      <div className="flex mb-2 mt-5 ml-5">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="px-2 py-1 border rounded mr-2 w-64"
        />
        <Select
          value={filterCriteria.assignee}
          onChange={(value) => handleFilterChange("assignee", value)}
          style={{ width: 150 }}
          className="mr-2"
        >
          <Option value="All">All</Option>
          {teamMembers.map((member) => (
            <Option key={member.id} value={member.name}>
              {member.name}
            </Option>
          ))}
        </Select>
        <Select
          value={filterCriteria.status}
          onChange={(e) => handleFilterChange("status", e.target.value)}
          style={{ width: 150 }}
          className="mr-2"
        >
          <Option value="All">All</Option>
          <Option value="To Do">To Do</Option>
          <Option value="In Progress">In Progress</Option>
          <Option value="Done">Done</Option>
        </Select>
        <DatePicker onChange={handleDateFilterChange} className="mr-2" />
        <Button type="primary" onClick={handleOpenModal}>
          Add
        </Button>
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
    <div className="flex p-4">
        {["To Do", "In Progress", "Done"].map((status) => (
            <Droppable key={status} droppableId={status}>
                {(provided) => (
                    <div
                        className="flex-1 w-300 h-300 mx-6"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        <h2 className="text-lg font-semibold mb-2">{status}</h2>
                        {filteredTasks.map((task, index) => {
                            if (task.status !== status) return null;
                            return (
                                <Draggable
                                    key={task.id}
                                    draggableId={task.id.toString()}
                                    index={index}
                                >
                                    {(provided) => (
                                        <div
                                            className="bg-white p-4 rounded shadow-md mb-4 cursor-pointer flex flex-col justify-between"
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            ref={provided.innerRef}
                                            style={{
                                                ...provided.draggableProps.style,
                                                height: "100px", 
                                            }}
                                            // onClick={() => handleTaskClick(task.id)}
                                        >
                                            <h3 className="text-sm font-semibold">
                                                {task.title}
                                            </h3>
                                            <div className="flex justify-between items-center">
                                                <EyeOutlined onClick={() => handleViewTask(task.id)} className="mr-2" />
                                                <EditOutlined onClick={() => handleEditTask(task.id)} />
                                            </div>
                                        </div>
                                    )}
                                </Draggable>
                            );
                        })}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        ))}
    </div>
</DragDropContext>

      {selectedTask && (
        <Modal
          title={selectedTask.title}
          visible={true}
          onCancel={handleCloseModal}
          footer={null}
          className="w-80"
        >
          <div className="p-4">
            <p className="mb-2">
              <strong>Description:</strong> {selectedTask.description}
            </p>
            <p className="mb-2">
              <strong>Due:</strong>{" "}
              <span className="bg-red-200 px-2 py-1 rounded">
                {moment(selectedTask.deadline).format("YYYY-MM-DD")}
              </span>
            </p>
            <p className="mb-2">
              <strong>Assignee:</strong> {selectedTask.assignee}
            </p>
            <p className="mb-2">
              <strong>Status:</strong>{" "}
              <span
                className={`px-2 py-1 rounded ${getStatusColor(
                  selectedTask.status
                )}`}
              >
                {selectedTask.status}
              </span>
            </p>
          </div>
        </Modal>
      )}
      {/* Modal for adding tasks */}
      <Modal
        title="Add Task"
        visible={isModalVisible}
        onCancel={handleCloseModal}
        footer={null}
      >
        {/* Add task form component */}
        <AddTaskForm
          teamMembers={teamMembers}
          onChange={handleInputChange}
          onAddTask={handleAddTask}
          onCancel={handleCloseModal}
          formData={newTaskData}
        />
      </Modal>
    </div>
  );
};

// AddTaskForm component
const AddTaskForm = ({
  teamMembers,
  onChange,
  onAddTask,
  onCancel,
  formData,
}) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Task Title"
        value={formData.title}
        onChange={(e) => onChange("title", e.target.value)}
        className="px-2 py-1 border rounded mb-2 w-full"
      />
      <textarea
        placeholder="Description"
        value={formData.description}
        onChange={(e) => onChange("description", e.target.value)}
        className="px-2 py-1 border rounded mb-2 w-full"
      ></textarea>
      <DatePicker
        value={formData.dueDate ? moment(formData.dueDate) : null}
        onChange={(date, dateString) => onChange("dueDate", dateString)}
        className="mb-5 mr-2"
      />
      <Select
        value={formData.assignee}
        onChange={(value) => onChange("assignee", value)}
        className="mb-5 mr-2"
      >
        <Option value="">Select Assignee</Option>
        {teamMembers.map((member) => (
          <Option key={member.id} value={member.name}>
            {member.name}
          </Option>
        ))}
      </Select>
      <Select
        value={formData.status}
        onChange={(value) => onChange("status", value)}
        className="mb-5"
      >
        <Option value="">Select Status</Option>
        <Option value="To Do">To Do</Option>
        <Option value="In Progress">In Progress</Option>
        <Option value="Done">Done</Option>
      </Select>
      <Button type="primary" onClick={onAddTask} className="mr-2">
        Add Task
      </Button>
    </div>
  );
};

export default TaskManagementPage;
