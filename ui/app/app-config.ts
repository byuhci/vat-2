import { OpaqueToken } from '@angular/core';

export interface AppConfig {
  title: string;
}

export const DEFAULT_CONFIG: AppConfig = {
  title: 'VAT'
};

export let APP_CONFIG = new OpaqueToken('app.config');