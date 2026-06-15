export type DashboardLink = {
  id: string;
  label: string;
  href: string;
  icon?: string;
  accent?: string;
};

export const dashboardLinks: DashboardLink[] = [
  {
    id: "bilibili",
    label: "Bilibili",
    href: "https://www.bilibili.com",
    accent: "#fb7299",
  },
  {
    id: "x",
    label: "X",
    href: "https://x.com/home",
    icon: "/source/twitter.png",
  },
  {
    id: "youtube",
    label: "YouTube",
    href: "https://www.youtube.com",
    icon: "/source/ytb.png",
  },
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/yanfd",
    icon: "/source/github.png",
  },
  {
    id: "xiaohongshu",
    label: "小红书",
    href: "https://www.xiaohongshu.com",
    accent: "#ff2442",
  },
  {
    id: "tieba",
    label: "贴吧",
    href: "https://tieba.baidu.com",
    accent: "#2e7cff",
  },
];
