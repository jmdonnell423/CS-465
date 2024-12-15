import { InjectionToken } from '@angular/core';

// Define the InjectionToken for Browser Storage
export const BROWSER_STORAGE = new InjectionToken<Storage>('Browser Storage', {
    providedIn: 'root',
    factory: () => localStorage, // Use localStorage as the default storage
});

