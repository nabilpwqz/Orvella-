import {
  DashboardIcon,
  UserIcon,
  HeartIcon,
  PlusIcon,
  BottleIcon,
  UsersIcon,
} from "../common/Icons";

export const userNavLinks = [
  {
    title: "Overview",
    path: "/dashboard",
    icon: DashboardIcon,
  },
  {
    title: "Profile",
    path: "/dashboard/profile",
    icon: UserIcon,
  },
  {
    title: "Curated Wishlist",
    path: "/dashboard/wishlist",
    icon: HeartIcon,
  },
];

export const adminNavLinks = [
  {
    title: "Overview",
    path: "/dashboard",
    icon: DashboardIcon,
  },
  {
    title: "Profile",
    path: "/dashboard/profile",
    icon: UserIcon,
  },
  {
    title: "Add Fragrance",
    path: "/dashboard/add-perfume",
    icon: PlusIcon,
  },
  {
    title: "Manage Catalog",
    path: "/dashboard/manage-perfumes",
    icon: BottleIcon,
  },
  {
    title: "Client Registry",
    path: "/dashboard/manage-users",
    icon: UsersIcon,
  },
];

export const dashboardNavLinks = {
  user: userNavLinks,
  admin: adminNavLinks,
};
