import { IconType } from "react-icons";
import { AiOutlineBarChart } from "react-icons/ai";
import { BiData } from "react-icons/bi";
import { BsCalendarWeek } from "react-icons/bs";
import {
  FaChartArea,
  FaProjectDiagram,
  FaRegMoneyBillAlt,
  FaSitemap,
} from "react-icons/fa";
import {
  FiHome,
  FiBarChart,
  FiActivity,
  //  FiFile,
  FiTrash2,
  FiSettings,
} from "react-icons/fi";
import { IoMdPodium } from "react-icons/io";
import { MdPriorityHigh } from "react-icons/md";
import { TbGauge } from "react-icons/tb";

interface LinkItemProps {
  name: string;
  icon: IconType;
  link?: string;
  children: any[];
}

type Children = {
  name: string;
  icon: IconType;
  link: string;
};

interface ChildrenI {
  name: string;
  icon: IconType;
  link: string;
}

const reactURL = process.env.REACT_APP_API_URL;

const childrenCarteiradeProjetos: ChildrenI[] = [
  { name: "Dashboard", icon: TbGauge, link: "/" },
  { name: "Carteira de Projetos", icon: FaProjectDiagram, link: "/projetos" },
  {
    name: "Financeiro",
    icon: FaRegMoneyBillAlt,
    link: "/financeiro-projetos",
  },
  { name: "Relatórios", icon: FaChartArea, link: "/relatorios" },
  {
    name: "Priorização Diretores",
    icon: IoMdPodium,
    link: "/priorizacao-diretores",
  },
];

const childrenInfograficos: ChildrenI[] = [
  { name: "Campanhas", icon: FaSitemap, link: "/campanhas" },
  {
    name: "Cronogramas",
    icon: AiOutlineBarChart,
    link: "/estatisticas",
  },
  {
    name: "Financeiro",
    icon: FaRegMoneyBillAlt,
    link: "/financeiro-intervencoes",
  },
  { name: "Look Ahead", icon: AiOutlineBarChart, link: "/lookahead" },
  {
    name: "Gráficos Estatisticos",
    icon: AiOutlineBarChart,
    link: "/graficos-estatisticos",
  },
  {
    name: "Gantt Campanha",
    icon: AiOutlineBarChart,
    link: "/gantt-campanha",
  },
];

const childrenConfiguracoes: ChildrenI[] = [
  { name: "Configurações", icon: FiSettings, link: "/desenvolvimento" },
  { name: "Usuários", icon: FiSettings, link: "/usuarios" },
  { name: "Perfil", icon: FiSettings, link: "/perfil" },
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
    link: "/licoes-aprendidas",
  },
  { name: "Priorização", icon: MdPriorityHigh, link: "/priorizacao" },
  { name: "Lixeira", icon: FiTrash2, link: "/lixeira" },
  { name: "Feriados", icon: BsCalendarWeek, link: "/feriados" },
];

const enviroment1 = [
  {
    name: "Intervenções",
    icon: FiBarChart,
    children: childrenInfograficos.sort((a: ChildrenI, b: ChildrenI) =>
      a.name.localeCompare(b.name)
    ),
  },
];

const enviroment2 = [
  {
    name: "Projetos",
    icon: FiHome,
    children: childrenCarteiradeProjetos.sort((a: ChildrenI, b: ChildrenI) =>
      a.name.localeCompare(b.name)
    ),
  },

  {
    name: "Intervenções",
    icon: FiBarChart,
    children: childrenInfograficos.sort((a: ChildrenI, b: ChildrenI) =>
      a.name.localeCompare(b.name)
    ),
  },

  {
    name: "Configurações",
    icon: FiSettings,
    children: childrenConfiguracoes.sort((a: ChildrenI, b: ChildrenI) =>
      a.name.localeCompare(b.name)
    ),
  },
];

function environmentURL(): LinkItemProps[] {
  if (reactURL && reactURL === "https://ppmapi-hmg.iktech.com.br") {
    return enviroment1;
  }
  return enviroment2;
}

// console.log(environmentURL());

export const LinkItems: Array<LinkItemProps> = environmentURL();

export const LinkItemss: Array<LinkItemProps> = [
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

// console.log("Como era", LinkItemss);
