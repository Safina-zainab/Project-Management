import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { fetchProjectDetails, fetchRecentActivitiesByProjectId } from "../../utils/mockApi";
import { ArrowLeftOutlined, BellOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import TaskManagementPage from "@/components/TaskManagementPage";
import { projects } from "../../utils/mockApi";

const ProjectDetailsPage = () => {
  const router = useRouter();
  const { projectId } = router.query;
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recentActivities, setRecentActivities] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Fetch project details and recent activities based on projectId
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (projectId) {
          const projectData = await fetchProjectDetails(projectId);
          const activities = await fetchRecentActivitiesByProjectId(projectId);

          setProject(projectData);
          setRecentActivities(activities);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching project details:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [projectId]);

  // Handlers for navigation and modal
  const handleGoBack = () => {
    router.push("/dashboard");
  };

  const handleNotificationClick = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  // If loading, display loading message
  if (loading) return <div>Loading...</div>;

  // If project not found, display message
  if (!project) return <div>Project not found</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-400 via-purple-500 to-blue-300">
      <header className="flex justify-between items-center p-4 bg-white shadow-md">
        <div className="flex items-center">
          <ArrowLeftOutlined
            className="text-lg mr-2 cursor-pointer"
            onClick={handleGoBack}
          />
          <span
            className="text-lg font-semibold cursor-pointer"
            onClick={handleGoBack}
          >
            Back to Dashboard
          </span>
        </div>
        <div className="text-right flex-grow">
          <div className="flex items-center justify-end">
            <div className="flex items-center">
              <h1 className="text-3xl font-semibold mr-2">{project.name}</h1>
            </div>
            <BellOutlined
              className="text-xl cursor-pointer"
              onClick={handleNotificationClick}
              style={{ padding: "0.5rem", border: "1px solid #000", borderRadius: "50%" }}
            />
          </div>
          <h3 className="text-lg">{project.overview}</h3>
        </div>
      </header>
      <Modal
        title="Recent Activity"
        visible={showModal}
        onCancel={handleModalClose}
        footer={null}
      >
        <ul>
          {recentActivities.map((activity, index) => (
            <li key={index}>{activity.activity}</li>
          ))}
        </ul>
      </Modal>
      <TaskManagementPage projectId={projectId} projects={projects} />

    </div>
  );
};

export default ProjectDetailsPage;
