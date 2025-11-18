import { createApiInstance } from "./APIRepositories";

export const dashboard = createApiInstance(process.env.NEXT_PUBLIC_BACKEND_DASHBOARD);
export const person = createApiInstance(process.env.NEXT_PUBLIC_BACKEND_USER_MANAGEMENT);
export const geo = createApiInstance(process.env.NEXT_PUBLIC_BACKEND_GEO_DIVISION);
