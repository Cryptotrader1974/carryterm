import { QueryClient } from "@tanstack/react-query";

// __PORT_5000__ is replaced by deploy_website with the real proxy path at deploy time.
// Locally (dev server), this is an empty string so paths resolve relative to the origin.
export const API_BASE: string = '__PORT_5000__'.startsWith('__') ? '' : '__PORT_5000__';

export async function apiRequest(method: string, url: string, body?: any) {
  const fullUrl = `${API_BASE}${url}`;
  const res = await fetch(fullUrl, {
    method,
    headers: body ? { "Content-Type": "application/json" } : {},
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json();
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async ({ queryKey }) => {
        const url = Array.isArray(queryKey) ? queryKey[0] as string : queryKey as string;
        return apiRequest("GET", url);
      },
      staleTime: 25_000,
      retry: 2,
    },
  },
});
