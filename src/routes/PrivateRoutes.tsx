import { Routes, Route } from 'react-router-dom';

import { ActivitiesRegistration } from 'pages/ActivitiesRegistration';
import { GanttPage } from 'pages/Gantt';
import { Home } from 'pages/Home';
import { Infographics } from 'pages/Infographics';
import { NotFound } from 'pages/NotFound';
import { Permissions } from 'pages/Permissions';
import { PermissionsList } from 'pages/PermissionsList';
import { Profile } from 'pages/Profile';
import { ProjectsRegistration } from 'pages/ProjectsRegistration';
import { Reports } from 'pages/Reports';
import { Settings } from 'pages/Settings';
import { ShareRegister } from 'pages/ShareRegister';

export function PrivateRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects-registration" element={<ProjectsRegistration />} />
      <Route
        path="/activities-registration"
        element={<ActivitiesRegistration />}
      />
      <Route path="/share-register" element={<ShareRegister />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/infographics" element={<Infographics />} />
      <Route path="/permissions" element={<PermissionsList />} />
      <Route path="permissions/:id" element={<Permissions />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/gantt" element={<GanttPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
