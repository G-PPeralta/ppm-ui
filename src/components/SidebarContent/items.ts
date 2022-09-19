import { IconType } from "react-icons";
import { BsBarChartSteps } from "react-icons/bs";
import {
  FiHome,
  // FiTrendingUp,
  FiEdit2,
  FiBarChart,
  // FiActivity,
  // FiUsers,
  FiFile,
} from "react-icons/fi";

interface LinkItemProps {
  name: string;
  icon: IconType;
  link?: string;
}
export const LinkItems: Array<LinkItemProps> = [
  { name: "Dashboard", icon: FiHome, link: "/" },
  // { name: 'Gantt', icon: BsBarChartSteps, link: '/gantt' },
  { name: "Cadastro Projetos", icon: FiEdit2, link: "/projects-registration" },
  {
    name: "Cadastro Fornecedores",
    icon: FiEdit2,
    link: "/providers-registration",
  },
  // {
  //   name: 'Cadastro de Ações',
  //   icon: FiTrendingUp,
  //   link: '/activities-registration',
  // },
  { name: "Relatórios", icon: FiFile, link: "/reports" },
  { name: "Infográficos", icon: FiBarChart, link: "/infographics" },
  // { name: 'Alterar Permissões', icon: FiUsers, link: '/permissions' },
  // {
  //   name: 'Cronograma de atividades',
  //   icon: FiActivity,
  //   link: '/atividade/:id',
  // },
  {
    name: "Detalhamento Projeto",
    icon: BsBarChartSteps,
    link: "/detalhamento/191",
  },
];
