import { Routes, RouterModule }  from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { NewWorkspaceComponent } from './views/new-workspace.component';

const appRoutes: Routes = [
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

export const routing = RouterModule.forRoot(appRoutes);