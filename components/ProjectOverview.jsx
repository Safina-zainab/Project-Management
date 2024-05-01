import React from "react";
import { Card, Button, Modal, message } from "antd";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { fetchProjects } from "../utils/mockApi";
import Link from 'next/link';

const ProjectOverview = () => {
  const queryClient = useQueryClient();

  const { data: projects, isLoading } = useQuery("projects", fetchProjects);

  const deleteProjectMutation = useMutation(
    (id) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          // Simulate deleting project
          const updatedProjects = projects.filter(
            (project) => project.id !== id
          );
          resolve(updatedProjects);
        }, 1000);
      });
    },
    {
      onSuccess: (data) => {
        queryClient.setQueryData("projects", data);
        message.success("Project deleted successfully!");
      },
      onError: () => {
        message.error("Failed to delete project!");
      },
    }
  );

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Delete Project",
      content: "Are you sure you want to delete this project?",
      onOk: () => {
        deleteProjectMutation.mutate(id);
      },
    });
  };

  const handleEdit = (record) => {
    // Placeholder function for handling edit action
    console.log("Editing project:", record);
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
      {projects &&
        projects.map((project) => (
          <Card
            key={project.id}
            style={{ width: 300, marginBottom: 20 }}
            title={project.name}
            actions={[
              <Link href={`/project/${project.id}`} key="view">
                <Button type="link">View</Button>
              </Link>,
              <Button key="edit" onClick={() => handleEdit(project)}>
                Edit
              </Button>,
              <Button
                key="delete"
                type="danger"
                onClick={() => handleDelete(project.id)}
              >
                Delete
              </Button>,
            ]}
          >
            <p>
              {project.overview && project.overview.length > 50
                ? project.overview.slice(0, 50) + "..."
                : project.overview}
            </p>
          </Card>
        ))}
    </div>
  );
};

export default ProjectOverview;
