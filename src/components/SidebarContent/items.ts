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

// interface Children {
//   name: string;
//   icon: IconType;
//   link: string;
// }

const childrenCarteiradeProjetos = [
  { name: "Dashboard", icon: FiHome, link: "/" },
  { name: "Projetos", icon: FaRegMoneyBillAlt, link: "/projects" },
  {
    name: "Financeiro",
    icon: FaRegMoneyBillAlt,
    link: "/financeiro-projetos",
  },
  { name: "Importar Dados", icon: BiData, link: "/upload" },

  {
    name: "Lições Aprendidas",
    icon: FiActivity,
    link: "/licoesAprendidas",
  },
  { name: "Priorização", icon: MdPriorityHigh, link: "/priorizacao" },
];

const childrenInfograficos = [
  { name: "Infográficos", icon: FiBarChart, link: "/infographics" },
  { name: "Financeiro", icon: FaRegMoneyBillAlt, link: "/budgets" },
];

const childrenEstatisticas = [
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
  { name: "Look Ahead", icon: AiOutlineBarChart, link: "/lookahead" },
];

const childrenRelatoriosPorProjetos = [
  { name: "Relatórios", icon: FiFile, link: "/reports" },
];

const childrenLixeira = [
  { name: "Lixeira", icon: FiTrash2, link: "/desenvolvimento" },
];

const childrenConfiguracoes = [
  { name: "Configurações", icon: FiSettings, link: "/desenvolvimento" },
  { name: "Usuários", icon: FiSettings, link: "/profile" },
  { name: "Perfil", icon: FiSettings, link: "/profile" },
  { name: "Gestão de Áreas", icon: FiSettings, link: "/desenvolvimento" },
  {
    name: "Configurar Prioridades",
    icon: FiSettings,
    link: "/desenvolvimento",
  },
  {
    name: "Fornecedores",
    icon: FiActivity,
    link: "/fornecedores",
  },
];

export const LinkItems: Array<LinkItemProps> = [
  {
    name: "Carteira de Projetos",
    icon: FiHome,
    children: childrenCarteiradeProjetos,
  },

  {
    name: "Infográficos",
    icon: FiBarChart,
    children: childrenInfograficos,
  },
  {
    name: "Estatísticas",
    icon: AiOutlineBarChart,
    children: childrenEstatisticas,
  },

  {
    name: "Lixeira",
    icon: FiTrash2,
    children: childrenLixeira,
  },

  {
    name: "Relatórios por Projetos",
    icon: FiFile,
    children: childrenRelatoriosPorProjetos,
  },

  {
    name: "Configurações",
    icon: FiSettings,
    children: childrenConfiguracoes,
    // .sort((a: Children, b: Children) =>
    //   a.name.localeCompare(b.name)
    // ),
  },
];
