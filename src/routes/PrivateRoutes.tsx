import { Routes, Route } from 'react-router-dom';

import { Admin } from 'pages/Admin';
import { Favoritos } from 'pages/Favoritos';
import { NotFound } from 'pages/NotFound';

export function PrivateRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Admin />} />
      <Route path="/projects-registration" element={<Favoritos />} />
      <Route path="/share-register" element={<Favoritos />} />
      <Route path="/reports" element={<Favoritos />} />
      <Route path="/infographics" element={<Favoritos />} />
      <Route path="/permissions" element={<Favoritos />} />
      <Route path="/settings" element={<Favoritos />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
