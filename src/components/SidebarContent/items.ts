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
  children: any[];
}
export const LinkItems: Array<LinkItemProps> = [
  {
    name: "Carteira de Projetos",
    icon: FiHome,
    children: [
      { name: "Dashboard", icon: FiHome, link: "/" },
      { name: "Projetos", icon: FaRegMoneyBillAlt, link: "/projects" },
      { name: "Fornecedores", icon: FaRegMoneyBillAlt, link: "/" },
      { name: "Financeiro", icon: FaRegMoneyBillAlt, link: "/" },
      { name: "Importar Dados", icon: BiData, link: "/" },
    ],
  },

  {
    name: "Infográficos",
    icon: FiBarChart,
    children: [
      { name: "Infográficos", icon: FiBarChart, link: "/infographics" },
    ],
  },

  {
    name: "Estatísticas",
    icon: AiOutlineBarChart,
    children: [
      { name: "Estatísticas", icon: AiOutlineBarChart, link: "/" },
      { name: "Gráficos Estatisticos", icon: AiOutlineBarChart, link: "/" },
      { name: "Look Ahead", icon: AiOutlineBarChart, link: "/" },
      { name: "Relatórios", icon: FiFile, link: "/reports" },
    ],
  },

  {
    name: "Lixeira",
    icon: FiTrash2,
    children: [{ name: "Lixeira", icon: FiTrash2, link: "/" }],
  },

  {
    name: "Configurações",
    icon: FiSettings,
    children: [
      { name: "Configurações", icon: FiSettings, link: "/" },
      { name: "Usuários", icon: FiSettings, link: "/" },
      { name: "Perfil", icon: FiSettings, link: "/" },
      { name: "Gestão de Áreas", icon: FiSettings, link: "/" },
      { name: "Configurar Prioridades", icon: FiSettings, link: "/" },
    ],
  },
];
