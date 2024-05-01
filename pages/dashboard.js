import ProjectOverview from '../components/ProjectOverview'

const Dashboard = () => {
  return (
    <div style={{ 
      background: 'linear-gradient(to bottom right, #FF6B6B, #C56CD6)',
      minHeight: '100vh',
      padding: '20px',
      boxSizing: 'border-box',
    }}>
      <h1 style={{ textAlign: 'center', color: '#fff', marginBottom: '20px', fontSize: '1.5rem' }}>Project Overview</h1>
      {/* Content of your dashboard */}
      <ProjectOverview />
      
    </div>
  );
};

export default Dashboard;
