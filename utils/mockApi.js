export const projects = [
  {
    id: 1,
    name: "Weather App",
    overview: "A simple application to check weather forecasts.",
    taskCount: 5,
    tasks: [
      {
        id: 1,
        projectId: 1,
        title: "Implement UI",
        status: "To Do",
        deadline: "2024-05-10",
        assignee: "John Doe",
        description: "Design and implement user interface for weather app",
      },
      {
        id: 2,
        projectId: 1,
        title: "Backend Integration",
        status: "In Progress",
        deadline: "2024-05-15",
        assignee: "Jane Smith",
        description: "Integrate backend services with weather app",
      },
      {
        id: 3,
        projectId: 1,
        title: "Database Setup",
        status: "Done",
        deadline: "2024-05-20",
        assignee: "David Johnson",
        description: "Set up database for weather app",
      },
      {
        id: 4,
        projectId: 1,
        title: "Unit Testing",
        status: "Done",
        deadline: "2024-05-25",
        assignee: "Emily Wilson",
        description: "Perform unit testing for weather app",
      },
      {
        id: 5,
        projectId: 1,
        title: "Deployment",
        status: "In Progress",
        deadline: "2024-06-01",
        assignee: "Michael Brown",
        description: "Deploy weather app to production servers",
      },
    ],
    recentActivity: [
      { activity: "Task 1 completed by John Doe" },
      { activity: "Task 3 completed by David Johnson" },
      { activity: "Task 4 completed by Emily Wilson" },
    ],
  },
  {
    id: 2,
    name: "Library Management System",
    overview: "Manage books, patrons, and library transactions.",
    taskCount: 2,
    tasks: [
      {
        id: 6,
        projectId: 2,
        title: "Add CRUD functionality",
        status: "Done",
        deadline: "2024-05-20",
        assignee: "John Doe",
        description: "Implement CRUD operations for library management system",
      },
      {
        id: 7,
        projectId: 2,
        title: "Database Schema Design",
        status: "To Do",
        deadline: "2024-05-25",
        assignee: "Jane Smith",
        description: "Design database schema for library management system",
      },
    ],
    recentActivity: [
      { activity: "Task 6 completed by John Doe" },
    ],
  },
  {
    id: 3,
    name: "E-commerce Platform",
    overview: "An online platform for buying and selling products.",
    taskCount: 2,
    tasks: [
      {
        id: 8,
        projectId: 3,
        title: "Frontend Development",
        status: "In Progress",
        deadline: "2024-06-01",
        assignee: "David Johnson",
        description: "Develop user interface for e-commerce platform",
      },
      {
        id: 9,
        projectId: 3,
        title: "Payment Gateway Integration",
        status: "Done",
        deadline: "2024-06-05",
        assignee: "Emily Wilson",
        description: "Integrate payment gateway with e-commerce platform",
      },
    ],
    recentActivity: [
      { activity: "Task 8 started by David Johnson" },
      { activity: "Task 9 completed by Emily Wilson" },
    ],
  },
  {
    id: 4,
    name: "To-Do List Application",
    overview: "Keep track of tasks and manage your to-do lists.",
    taskCount: 0,
    tasks: [],
    recentActivity: [{ activity: "" }],
  },
  {
    id: 5,
    name: "Chat Application",
    overview: "Real-time messaging and communication platform.",
    taskCount: 0,
    tasks: [],
    recentActivity: [{ activity: "" }],
  },
  {
    id: 6,
    name: "Blog Platform",
    overview: "Publish and manage blog posts and articles.",
    taskCount: 0,
    tasks: [],
    recentActivity: [{ activity: "" }],
  },
  {
    id: 7,
    name: "Music Player",
    overview: "Play, organize, and manage your music library.",
    taskCount: 0,
    tasks: [],
    recentActivity: [{ activity: "" }],
  },
  {
    id: 8,
    name: "Calendar Application",
    overview: "Keep track of events, appointments, and schedules.",
    taskCount: 0,
    tasks: [],
    recentActivity: [{ activity: "" }],
  },
  {
    id: 9,
    name: "Recipe Finder",
    overview: "Discover and save delicious recipes from around the world.",
    taskCount: 0,
    tasks: [],
    recentActivity: [{ activity: "" }],
  },
  {
    id: 10,
    name: "Fitness Tracker",
    overview: "Track your workouts, diet, and fitness progress.",
    taskCount: 0,
    tasks: [],
    recentActivity: [{ activity: "" }],
  },
];

const tasks = projects.reduce((acc, project) => {
  return [...acc, ...project.tasks];
}, []);

const teamMembers = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
  { id: 3, name: "David Johnson" },
  { id: 4, name: "Emily Wilson" },
  { id: 5, name: "Michael Brown" },
  { id: 6, name: "Olivia Taylor" },
  { id: 7, name: "Daniel Martinez" },
  { id: 8, name: "Sophia Anderson" },
  { id: 9, name: "William Lee" },
  { id: 10, name: "Emma Garcia" },
];


export const fetchProjects = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return projects;
};

export const fetchTasksByProjectId = async (projectId) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return tasks.filter((task) => task.projectId === projectId);
};

export const fetchTeamMembers = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return teamMembers;
};

export const fetchRecentActivitiesByProjectId = async (projectId) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const project = projects.find((project) => project.id === parseInt(projectId));
  return project ? project.recentActivity : []; 
  
};

export const fetchProjectDetails = async (projectId) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return projects.find((project) => project.id === parseInt(projectId));
};
