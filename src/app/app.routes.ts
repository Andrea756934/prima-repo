import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ClassroomComponent } from './pages/classroom/classroom.component';
import { authGuard } from './utils/auth.guard';
import { AssignmentComponent } from './pages/assignment/assignment.component';
import { ListaCompletamentoComponent } from './pages/lista-completamento/lista-completamento.component';

export const routes: Routes = [
    {
        path: 'classroom',
        component: ClassroomComponent,
        canActivate: [authGuard]
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'classroom/:classroomId/assignment',
        component: AssignmentComponent,
        canActivate: [authGuard]
    },
    {
        path: 'classroom/:classroomId/assignment/:assignmentId',
        component: ListaCompletamentoComponent,
        canActivate: [authGuard]
    },
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    }
];