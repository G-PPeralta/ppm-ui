import { IconType } from "react-icons";
import { AiOutlineBarChart } from "react-icons/ai";
import { BiData } from "react-icons/bi";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import {
  FiHome,
  FiBarChart,
  FiActivity,
  FiFile,
  FiTrash2,
  FiSettings,
} from "react-icons/fi";
import { IoMdPodium } from "react-icons/io";
import { MdPriorityHigh } from "react-icons/md";

interface LinkItemProps {
  name: string;
  icon: IconType;
  link?: string;
  children: any[];
}

interface Children {
  name: string;
  icon: IconType;
  link: string;
}

const childrenCarteiradeProjetos = [
  { name: "Dashboard", icon: FiHome, link: "/" },
  { name: "Projetos", icon: FaRegMoneyBillAlt, link: "/projects" },
  {
    name: "Financeiro",
    icon: FaRegMoneyBillAlt,
    link: "/financeiro-projetos",
  },
  { name: "Relatórios", icon: FiFile, link: "/reports" },
  {
    name: "Priorização Diretores",
    icon: IoMdPodium,
    link: "/priorizacao-diretores",
  },
];

const childrenInfograficos = [
  { name: "Infográficos", icon: FiBarChart, link: "/infographics" },
  { name: "Financeiro", icon: FaRegMoneyBillAlt, link: "/budgets" },
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

const childrenConfiguracoes = [
  { name: "Configurações", icon: FiSettings, link: "/desenvolvimento" },
  { name: "Usuários", icon: FiSettings, link: "/usuarios" },
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
  { name: "Importar Dados", icon: BiData, link: "/upload" },

  {
    name: "Lições Aprendidas",
    icon: FiActivity,
    link: "/licoesAprendidas",
  },
  { name: "Priorização", icon: MdPriorityHigh, link: "/priorizacao" },
  { name: "Lixeira", icon: FiTrash2, link: "/registered-list" },
];

export const LinkItems: Array<LinkItemProps> = [
  {
    name: "Projetos",
    icon: FiHome,
    children: childrenCarteiradeProjetos.sort((a: Children, b: Children) =>
      a.name.localeCompare(b.name)
    ),
  },

  {
    name: "Intervenções",
    icon: FiBarChart,
    children: childrenInfograficos.sort((a: Children, b: Children) =>
      a.name.localeCompare(b.name)
    ),
  },

  {
    name: "Configurações",
    icon: FiSettings,
    children: childrenConfiguracoes.sort((a: Children, b: Children) =>
      a.name.localeCompare(b.name)
    ),
  },
];
