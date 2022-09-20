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
      {
        name: "Fornecedores",
        icon: FaRegMoneyBillAlt,
        link: "/desenvolvimento",
      },
      { name: "Financeiro", icon: FaRegMoneyBillAlt, link: "/desenvolvimento" },
      { name: "Importar Dados", icon: BiData, link: "/upload" },
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
      {
        name: "Estatísticas",
        icon: AiOutlineBarChart,
        link: "/desenvolvimento",
      },
      {
        name: "Gráficos Estatisticos",
        icon: AiOutlineBarChart,
        link: "/desenvolvimento",
      },
      { name: "Look Ahead", icon: AiOutlineBarChart, link: "/desenvolvimento" },
      { name: "Relatórios", icon: FiFile, link: "/reports" },
    ],
  },

  {
    name: "Lixeira",
    icon: FiTrash2,
    children: [{ name: "Lixeira", icon: FiTrash2, link: "/desenvolvimento" }],
  },

  {
    name: "Configurações",
    icon: FiSettings,
    children: [
      { name: "Configurações", icon: FiSettings, link: "/desenvolvimento" },
      { name: "Usuários", icon: FiSettings, link: "/desenvolvimento" },
      { name: "Perfil", icon: FiSettings, link: "/desenvolvimento" },
      { name: "Gestão de Áreas", icon: FiSettings, link: "/desenvolvimento" },
      {
        name: "Configurar Prioridades",
        icon: FiSettings,
        link: "/desenvolvimento",
      },
    ],
  },
];
