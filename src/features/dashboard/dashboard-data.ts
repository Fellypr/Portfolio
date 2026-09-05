export const dashboardAssets = {
  dashboard: "/dashboard/icon-dashboard.svg",
  projectsNav: "/dashboard/icon-projects-nav.svg",
  stacksNav: "/dashboard/icon-stacks-nav.svg",
  aboutNav: "/dashboard/icon-about-nav.svg",
  contactsNav: "/dashboard/icon-contacts-nav.svg",
  theme: "/dashboard/icon-theme.svg",
  chevronTheme: "/dashboard/chevron-theme.svg",
  plus: "/dashboard/icon-plus.svg",
  projectsCard: "/dashboard/icon-projects-card.svg",
  stacksCard: "/dashboard/icon-stacks-card.svg",
  contactsCard: "/dashboard/icon-contacts-card.svg",
  aboutCard: "/dashboard/icon-about-card.svg",
  chevronFilter: "/dashboard/chevron-filter.svg",
  profile: "/dashboard/icon-profile.svg",
  contactsPanel: "/dashboard/icon-contacts-panel.svg",
} as const;

export const sidebarItems = [
  { label: "Dashboard", icon: dashboardAssets.dashboard },
  { label: "Projetos", icon: dashboardAssets.projectsNav, active: true },
  { label: "Stacks", icon: dashboardAssets.stacksNav },
  { label: "Sobre mim", icon: dashboardAssets.aboutNav },
  { label: "Contatos", icon: dashboardAssets.contactsNav },
];

export const summaryCards = [
  {
    label: "Projetos",
    value: "8",
    description: "projetos publicados",
    icon: dashboardAssets.projectsCard,
    iconBackground: "#29245f",
  },
  {
    label: "Stacks",
    value: "12",
    description: "tecnologias cadastradas",
    icon: dashboardAssets.stacksCard,
    iconBackground: "#172554",
  },
  {
    label: "Contatos",
    value: "4",
    description: "canais de contato",
    icon: dashboardAssets.contactsCard,
    iconBackground: "#143522",
  },
  {
    label: "Sobre mim",
    value: "Atualizado",
    description: "há 3 dias",
    icon: dashboardAssets.aboutCard,
    iconBackground: "#3a2a0b",
    compactValue: true,
  },
];

export type ProjectTag = {
  label: string;
  tone?: "blue" | "purple" | "amber";
};

export type DashboardProject = {
  title: string;
  description: [string, string];
  tags: ProjectTag[];
  status: "Publicado" | "Rascunho";
  thumbnail: "devQuest" | "finance" | "figma";
};

export const projects: DashboardProject[] = [
  {
    title: "Dev Quest",
    description: [
      "Plataforma de desafios para desenvolvedores com",
      "missões, rankings e recompensas.",
    ],
    tags: [
      { label: "React" },
      { label: "TypeScript" },
      { label: "Tailwind" },
      { label: "Node.js" },
    ],
    status: "Publicado",
    thumbnail: "devQuest",
  },
  {
    title: "Gerenciador Financeiro",
    description: [
      "Aplicação para controle financeiro pessoal com",
      "relatórios e gráficos interativos.",
    ],
    tags: [
      { label: "React" },
      { label: "TypeScript" },
      { label: "ASP.NET Core" },
      { label: "PostgreSQL" },
    ],
    status: "Publicado",
    thumbnail: "finance",
  },
  {
    title: "Web Section to Figma",
    description: [
      "Coleção de seções de sites modernas convertidas",
      "para componentes no Figma.",
    ],
    tags: [
      { label: "Figma", tone: "purple" },
      { label: "HTML", tone: "amber" },
      { label: "Tailwind" },
    ],
    status: "Rascunho",
    thumbnail: "figma",
  },
];

export const contacts = [
  { label: "GitHub", value: "github.com/luizemiliano" },
  { label: "LinkedIn", value: "linkedin.com/in/luizemiliano" },
  { label: "E-mail", value: "luiz.emiliano.dev@gmail.com" },
  { label: "WhatsApp", value: "(11) 98765-4321" },
];
