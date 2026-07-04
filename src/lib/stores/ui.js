import { writable } from 'svelte/store';

export const activeNav = writable('dashboard');
export const activeMode = writable('Client');
export const activePeriod = writable('ALL');
export const sidebarOpen = writable(false);
