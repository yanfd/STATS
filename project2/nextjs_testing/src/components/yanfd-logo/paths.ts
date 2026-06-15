/** Logo assets — cropped from original PNG, no SVG tracing */
export const YANFD_LOGO_FULL = "/v3/yanfd-logo.png";
export const YANFD_MARK_FULL = "/v3/yanfd-mark-full.png";
export const YANFD_PIECE_F = "/v3/yanfd-piece-f.png";
export const YANFD_PIECE_D = "/v3/yanfd-piece-d.png";

export type YanfdLogoVariant = "chamber" | "rotate" | "diagonal";

export const DEFAULT_YANFD_LOGO_VARIANT: YanfdLogoVariant = "rotate";

export const yanfdLogoVariants: Array<{ id: YanfdLogoVariant; label: string; description: string }> = [
  {
    id: "rotate",
    label: "Rotate",
    description: "两次脉冲缩放 + 180° 换位，结束前 F 左下弹回（上膛感，默认）",
  },
  {
    id: "chamber",
    label: "Chamber",
    description: "缩小成圆角方块 → 放大并交换 F/D ×2，最后 F 左下弹回",
  },
  {
    id: "diagonal",
    label: "Diagonal",
    description: "沿对角线滑移交换 F/D，带轻微缩放脉冲",
  },
];
