// import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
import PocketBase from 'pocketbase';
import { writable } from 'svelte/store';

// export const pb = new PocketBase(PUBLIC_POCKETBASE_URL);
export const pb = new PocketBase('http://104.237.137.240:8090');

export const currentUser = writable(pb.authStore.model);
