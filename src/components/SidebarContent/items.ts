import { IconType } from 'react-icons';
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
} from 'react-icons/fi';

interface LinkItemProps {
  name: string;
  icon: IconType;
  link?: string;
}
export const LinkItems: Array<LinkItemProps> = [
  { name: 'Inicio', icon: FiHome, link: '/admin' },
  { name: 'Cadastro Projetos', icon: FiTrendingUp, link: '/trending' },
  { name: 'Cadastro de Ações', icon: FiCompass, link: '/explorer' },
  { name: 'Relatórios', icon: FiStar, link: '/favorites' },
  { name: 'Configurações', icon: FiSettings, link: '/configurate' },
];
