import { provideRouter, RouterConfig }  from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { NewWorkspaceComponent } from './views/new-workspace.component';

const routes: RouterConfig = [
	{
		path: 'dashboard',
		component: DashboardComponent
	},
	{
		path: 'new-workspace',
		component: NewWorkspaceComponent
	},
	{
		path: '',
		redirectTo: '/dashboard',
		pathMatch: 'full'
	}
];

export const appRouterProviders = [
	provideRouter(routes)
];