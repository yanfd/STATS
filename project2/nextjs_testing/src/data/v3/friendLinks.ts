/**
 * 友链配置 — 只改这个文件即可
 *
 * avatar：图片放在 public/ 下，填路径，例如 "/v3/friends/alice.jpg"
 * href：点击 VISIT 跳转的外链
 */

export type FriendLink = {
  name: string;
  href: string;
  avatar: string;
  description: string;
};

export const friendsAnnouncement = {
  logo: "/v3/glitchgl-logo.png",
  logoAlt: "almost human gallery",
  badge: "YANFD©",
  title: "thanks for everyone of you, it's a great journey.",
  subtitle: "we would live a better world together.",
};

export const friendLinks: FriendLink[] = [
  {
    name: "YANFD Blog",
    href: "https://www.yanfd.cn/",
    avatar: "/source/profilepic.jpg",
    description: "Essays, notes, and digital fragments.",
  },
  {
    name: "Almost Human Gallery",
    href: "https://gallery.yanfd.cn/",
    avatar: "/almosthuman.PNG",
    description: "Photography & lost media archive.",
  },
  {
    name: "STATS",
    href: "https://stats.yanfd.cn/hooray/",
    avatar: "/source/github.png",
    description: "Experiments, stats, and side quests.",
  },
  {
    name: "熊谷凌的博客",
    href: "https://furryr.is-a.dev/",
    avatar: "https://furryr.is-a.dev/favicon.avif",
    description: "何卒よろしくお願いします。",
  },
  {
    name: "ookamitai",
    href: "https://blog.ookamitai.com/",
    avatar: "/ookamitai.jpg",
    description: "Only my humble memories and sentiments...",
  },
  
];
