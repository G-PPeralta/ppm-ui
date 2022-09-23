import { IconType } from "react-icons";
import { AiOutlineBarChart } from "react-icons/ai";
import { BiData } from "react-icons/bi";
// import { BsBarChartSteps } from "react-icons/bs";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import {
  FiHome,
  // FiTrendingUp,
  // FiEdit2,
  FiBarChart,
  // FiActivity,
  // FiUsers,
  FiFile,
  // FiGrid,
  FiTrash2,
  FiSettings,
} from "react-icons/fi";

interface LinkItemProps {
  name: string;
  icon: IconType;
  link?: string;
}
export const LinkItems: Array<LinkItemProps> = [
  { name: "Carteira de Projetos", icon: FiHome, link: "/" },
  // { name: 'Gantt', icon: BsBarChartSteps, link: '/gantt' },
  // { name: "Cadastro Projetos", icon: FiEdit2, link: "/projects-registration" },
  // {
  //   name: "Cadastro Fornecedores",
  //   icon: FiEdit2,
  //   link: "/providers-registration",
  // },
  { name: "Dashboard", icon: FiHome, link: "/" },
  { name: "Projetos", icon: FaRegMoneyBillAlt, link: "/projects" },
  { name: "Fornecedores", icon: FaRegMoneyBillAlt, link: "/" },
  { name: "Financeiro", icon: FaRegMoneyBillAlt, link: "/" },
  { name: "Importar Dados", icon: BiData, link: "/" },
  // {
  //   name: 'Cadastro de Ações',
  //   icon: FiTrendingUp,
  //   link: '/activities-registration',
  // },

  { name: "Infográficos", icon: FiBarChart, link: "/infographics" },

  { name: "Estatísticas", icon: AiOutlineBarChart, link: "/" },
  { name: "Gráficos Estatisticos", icon: AiOutlineBarChart, link: "/" },
  { name: "Look Ahead", icon: AiOutlineBarChart, link: "/lookahead" },
  { name: "Relatórios", icon: FiFile, link: "/reports" },
  // { name: 'Alterar Permissões', icon: FiUsers, link: '/permissions' },

  { name: "Lixeira", icon: FiTrash2, link: "/" },

  { name: "Configurações", icon: FiSettings, link: "/" },
  { name: "Usuários", icon: FiSettings, link: "/" },
  { name: "Perfil", icon: FiSettings, link: "/" },
  { name: "Gestão de Áreas", icon: FiSettings, link: "/" },
  { name: "Configurar Prioridades", icon: FiSettings, link: "/" },

  // {
  //   name: "Fornecedores",
  //   icon: FiActivity,
  //   link: "/fornecedores",
  // },
  // {
  //   name: "Detalhamento Projeto",
  //   icon: BsBarChartSteps,
  //   link: "/detalhamento/191",
  // },
  // {
  //   name: "Projetos",
  //   icon: FiGrid,
  //   link: "/projects/",
  // },
];
