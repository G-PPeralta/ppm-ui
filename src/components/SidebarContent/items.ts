import { IconType } from 'react-icons';
import {
  FiHome,
  FiTrendingUp,
  FiEdit2,
  FiSettings,
  FiBarChart,
  FiUsers,
  FiFile,
} from 'react-icons/fi';

interface LinkItemProps {
  name: string;
  icon: IconType;
  link?: string;
}
export const LinkItems: Array<LinkItemProps> = [
  { name: 'Inicio', icon: FiHome, link: '/' },
  { name: 'Cadastro Projetos', icon: FiEdit2, link: '/projects-registration' },
  { name: 'Cadastro de Ações', icon: FiTrendingUp, link: '/share-register' },
  { name: 'Relatórios', icon: FiFile, link: '/reports' },
  { name: 'Infográficos', icon: FiBarChart, link: '/infographics' },
  { name: 'Alterar Permissões', icon: FiUsers, link: '/permissions' },
  { name: 'Configurações', icon: FiSettings, link: '/settings' },
];
