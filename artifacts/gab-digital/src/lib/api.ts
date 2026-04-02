const BASE = (import.meta.env.VITE_API_URL as string | undefined) ?? "";

async function apiFetch(path: string, init?: RequestInit): Promise<Response> {
  return fetch(`${BASE}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });
}

export async function getSiteData<T>(key: string, fallback: T): Promise<T> {
  try {
    const res = await apiFetch(`/api/site-data/${encodeURIComponent(key)}`);
    if (!res.ok) return fallback;
    const json = (await res.json()) as { value: T };
    return json.value ?? fallback;
  } catch {
    return fallback;
  }
}

export async function setSiteData<T>(key: string, value: T): Promise<void> {
  try {
    await apiFetch(`/api/site-data/${encodeURIComponent(key)}`, {
      method: "POST",
      body: JSON.stringify({ value }),
    });
  } catch {
  }
}

export async function postContactMessage(data: {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}): Promise<boolean> {
  try {
    const res = await apiFetch("/api/contact-messages", {
      method: "POST",
      body: JSON.stringify({
        ...data,
        date: new Date().toLocaleDateString("ar-DZ"),
        status: "Unread",
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function postProjectRequest(data: {
  fullName: string;
  email: string;
  phone?: string;
  businessType?: string;
  requestedService?: string;
  budget?: string;
  description?: string;
  websiteLink?: string;
  preferredStartDate?: string;
}): Promise<boolean> {
  try {
    const res = await apiFetch("/api/project-requests", {
      method: "POST",
      body: JSON.stringify({
        ...data,
        date: new Date().toLocaleDateString("ar-DZ"),
        status: "New",
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function getContactMessages(): Promise<unknown[]> {
  try {
    const res = await apiFetch("/api/contact-messages");
    if (!res.ok) return [];
    return (await res.json()) as unknown[];
  } catch {
    return [];
  }
}

export async function patchContactMessage(id: number, status: string): Promise<void> {
  try {
    await apiFetch(`/api/contact-messages/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
  } catch {
  }
}

export async function deleteContactMessage(id: number): Promise<void> {
  try {
    await apiFetch(`/api/contact-messages/${id}`, { method: "DELETE" });
  } catch {
  }
}

export async function getProjectRequests(): Promise<unknown[]> {
  try {
    const res = await apiFetch("/api/project-requests");
    if (!res.ok) return [];
    return (await res.json()) as unknown[];
  } catch {
    return [];
  }
}

export async function patchProjectRequest(id: number, status: string): Promise<void> {
  try {
    await apiFetch(`/api/project-requests/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
  } catch {
  }
}

export async function deleteProjectRequest(id: number): Promise<void> {
  try {
    await apiFetch(`/api/project-requests/${id}`, { method: "DELETE" });
  } catch {
  }
}
