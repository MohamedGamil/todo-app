import { Routes } from '@angular/router';
import { GuestLayoutComponent } from './layouts/guest-layout/guest-layout.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { authGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        component: UserLayoutComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
            },
        ],
        canActivate: [authGuard],
    },
    {
        path: 'auth',
        component: GuestLayoutComponent,
        loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
    },
];
