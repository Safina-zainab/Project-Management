# Project Management Dashboard

## Objective
Develop a dashboard for a project management application that allows users to manage tasks and projects.

## Features
- **Authentication Page:**
  - Create a login form with validation using Ant Design for the form elements and validation feedback.
  - Mock response for successful and unsuccessful logins.

- **Projects Overview Page:**
  - Display a list of projects with options to view, edit, or delete.
  - Use React Query to fetch project data from a mock API.

- **Project Details Page:**
  - Show detailed information including tasks, team members, and recent activities after selecting a project.
  - Functionalities to add new tasks and assign team members.

- **Task Management:**
  - Add, edit, or mark tasks as completed.
  - Detailed view for each task with descriptions, deadlines, and assigned members.
  - Implement drag-and-drop feature to change the status of tasks (e.g., To Do, In Progress, Done) using Zustand to manage state.

- **Task Filters and Search Functionality:**
  - Allow users to filter tasks by status, due date, or assignee.
  - Provide a search bar to find tasks quickly.

- **Interactive Dashboard:**
  - Use Ant Design for creating modals, dropdowns, and tooltips to enhance interactivity.
  - Ensure all components are responsive with Tailwind CSS.

## Technical Requirements
- **Framework:** Next.js for routing and server-side rendering.
- **State Management:** Zustand for managing the global state.
- **Data Fetching:** Use React Query for handling asynchronous data fetching, state management, and cache management.
- **UI Components:** Utilize Ant Design for pre-built UI components that enhance user experience.
- **Styling:** Implement Tailwind CSS for responsive design and custom styling needs.

## Initial Setup Steps
1. **Setup Next.js Project:** Install Next.js globally or create a new Next.js project using `npx create-next-app`.
2. **Install Dependencies:** Install necessary dependencies such as React Query, Zustand, Ant Design, and Tailwind CSS.
3. **Configure Tailwind CSS:** Follow the official documentation to configure Tailwind CSS with Next.js.
4. **Setup Ant Design:** Follow the Ant Design documentation to setup Ant Design with Next.js.
5. **Create Mock API:** Create a mock API to simulate fetching project and task data. Use JSON Server or any other mock API tool.
6. **Create Authentication Page:** Develop an authentication page with a login form using Ant Design for form elements and validation feedback.
7. **Create Projects Overview Page:** Design a page to display a list of projects with options to view, edit, or delete. Fetch project data from the mock API using React Query.
8. **Create Project Details Page:** Create a page to show detailed information about a selected project including tasks, team members, and recent activities. Add functionalities to add new tasks and assign team members.
9. **Implement Task Management:** Implement functionalities to add, edit, or mark tasks as completed. Create a detailed view for each task with descriptions, deadlines, and assigned members. Utilize Zustand for state management and implement drag-and-drop feature using React Query.
10. **Implement Task Filters and Search Functionality:** Allow users to filter tasks by status, due date, or assignee. Provide a search bar to find tasks quickly.
11. **Enhance Interactive Dashboard:** Use Ant Design components such as modals, dropdowns, and tooltips to enhance interactivity and user experience.
12. **Test and Debug:** Test the application thoroughly to ensure all features work as expected. Debug any issues that arise during testing.
13. **Deploy:** Deploy the project management dashboard to your desired hosting platform. You can use Vercel, Netlify, or any other platform that supports Next.js applications.

