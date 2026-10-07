import { serverFetch } from "../core/server";

export interface OrvellaPatronItem {
  _id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  createdAt: string;
}

const FALLBACK_USERS: OrvellaPatronItem[] = [
  {
    _id: "usr-001",
    name: "Eleanor Vance",
    email: "eleanor.vance@orvella.com",
    emailVerified: true,
    createdAt: "2026-03-15T10:00:00Z",
  },
  {
    _id: "usr-002",
    name: "Julian Mercer",
    email: "julian.mercer@orvella.com",
    emailVerified: true,
    createdAt: "2026-05-20T14:30:00Z",
  },
  {
    _id: "usr-003",
    name: "Clara Beauchamp",
    email: "clara.b@orvella.com",
    emailVerified: true,
    createdAt: "2026-07-04T09:15:00Z",
  },
  {
    _id: "usr-004",
    name: "Henri Delaunay",
    email: "henri.d@orvella.com",
    emailVerified: false,
    createdAt: "2026-08-11T16:45:00Z",
  },
];

export const getUsers = async (): Promise<OrvellaPatronItem[]> => {
  try {
    const res = await serverFetch("/api/user");
    if (res && Array.isArray(res) && res.length > 0) {
      return res;
    }
    if (res?.data && Array.isArray(res.data) && res.data.length > 0) {
      return res.data;
    }
  } catch (error) {
    console.info("Using Orvella patron registry fallback", error);
  }
  return FALLBACK_USERS;
};
