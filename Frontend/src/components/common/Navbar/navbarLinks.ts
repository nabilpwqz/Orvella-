export interface NavLinkItem {
  path: string;
  label: string;
}

export const navbarLinks: NavLinkItem[] = [
  {
    path: "/",
    label: "Maison",
  },
  {
    path: "/all-perfumes",
    label: "Collection",
  },
  {
    path: "/about",
    label: "Philosophy",
  },
  {
    path: "/contact",
    label: "Private Atelier",
  },
  {
    path: "/dashboard",
    label: "Atelier Suite",
  },
];
