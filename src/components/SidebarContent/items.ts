import { IconType } from "react-icons";
import { AiOutlineBarChart } from "react-icons/ai";
import { BiData } from "react-icons/bi";
import { BsBarChartSteps } from "react-icons/bs";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import {
  FiHome,
  // FiTrendingUp,
  // FiEdit2,
  FiBarChart,
  FiActivity,
  // FiUsers,
  FiFile,
  // FiGrid,
  FiTrash2,
  FiSettings,
} from "react-icons/fi";
import { MdPriorityHigh } from "react-icons/md";

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
      // {
      //   name: "Fornecedores",
      //   icon: FaRegMoneyBillAlt,
      //   link: "/desenvolvimento",
      // },
      { name: "Financeiro", icon: FaRegMoneyBillAlt, link: "/desenvolvimento" },
      { name: "Importar Dados", icon: BiData, link: "/upload" },
      {
        name: "Fornecedores",
        icon: FiActivity,
        link: "/fornecedores",
      },
      {
        name: "Lições Aprendidas",
        icon: FiActivity,
        link: "/licoesAprendidas",
      },
      {
        name: "Detalhamento Projeto",
        icon: BsBarChartSteps,
        link: "/detalhamento/191",
      },
      { name: "Priorização", icon: MdPriorityHigh, link: "/priorizacao" },
    ],
  },

  {
    name: "Infográficos",
    icon: FiBarChart,
    children: [
      { name: "Infográficos", icon: FiBarChart, link: "/infographics" },
      { name: "Financeiro", icon: FaRegMoneyBillAlt, link: "/budgets" },
    ],
  },

  {
    name: "Estatísticas",
    icon: AiOutlineBarChart,
    children: [
      {
        name: "Estatísticas",
        icon: AiOutlineBarChart,
        link: "/estatisticas",
      },
      {
        name: "Gráficos Estatisticos",
        icon: AiOutlineBarChart,
        link: "/graficos",
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
      { name: "Usuários", icon: FiSettings, link: "/profile" },
      { name: "Perfil", icon: FiSettings, link: "/profile" },
      { name: "Gestão de Áreas", icon: FiSettings, link: "/desenvolvimento" },
      {
        name: "Configurar Prioridades",
        icon: FiSettings,
        link: "/desenvolvimento",
      },
    ],
  },
];
