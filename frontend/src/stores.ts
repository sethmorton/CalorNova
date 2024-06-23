import { writable, readable } from "svelte/store";

export const analysisStore = writable<any>(null);
export const showReport = writable(false);
export const showDashboards = writable(true);
