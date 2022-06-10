import { Routes, Route } from 'react-router-dom';

import { Admin } from 'pages/Admin';
import { Favoritos } from 'pages/Favoritos';
import { Home } from 'pages/Home';
import { NotFound } from 'pages/NotFound';

export function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/favorites" element={<Favoritos />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
