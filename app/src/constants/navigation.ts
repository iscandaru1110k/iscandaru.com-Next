import { CONTACT_FORM_URL, TIKTOK_PROFILE_URL } from "@/constants/links";

export type NavItem = {
  href: string;
  label: string;
};

export type ExternalNavItem = NavItem & {
  ariaLabel: string;
};

export const PRIMARY_NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/profile", label: "Profile" },
  { href: "/labo", label: "LABO" },
];

export const PRIVACY_NAV_ITEM: NavItem = {
  href: "/privacy",
  label: "Privacy Policy",
};

export const EXTERNAL_NAV_ITEMS: ExternalNavItem[] = [
  {
    href: TIKTOK_PROFILE_URL,
    label: "TikTok",
    ariaLabel: "TikTokを新しいタブで開く",
  },
  {
    href: CONTACT_FORM_URL,
    label: "Contact",
    ariaLabel: "Contact Googleフォームを新しいタブで開く",
  },
];
