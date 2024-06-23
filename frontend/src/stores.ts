import { writable, readable } from "svelte/store";

export const analysisStore = writable<any>(null);
export const showReport = writable(false);
export const showDashboards = writable(true);

export const zipCode = writable('91768');
export const region = writable('California');
export const powerConsumption = writable('123');
