export const baseUrl =
  import.meta.env.VITE_SERVER_URL || "http://localhost:5000";

export const serverFetch = async (path: string) => {
  const res = await fetch(`${baseUrl}${path}`);
  return res.json();
};

export const serverMutation = async (
  path: string,
  data: unknown,
  method = "POST",
) => {
  const res = await fetch(`${baseUrl}${path}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};
