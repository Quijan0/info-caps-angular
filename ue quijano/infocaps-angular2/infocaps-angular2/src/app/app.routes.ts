import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { LoginComponent } from './auth/login/login';
import { SignupComponent } from './auth/signup/signup';
import { AccountingCourseComponent } from './courses/accounting-course/accounting-course';
import { FinanceCourseComponent } from './courses/finance-course/finance-course';
import { MarketingCourseComponent } from './courses/marketing-course/marketing-course';
import { EntrepreneurshipCourseComponent } from './courses/entrepreneurship-course/entrepreneurship-course';
import { SubscriptionFormComponent } from './subscriptions/subscription-form/subscription-form';
import { CourseDetailComponent } from './courses/course-detail/course-detail';
import { AuthGuard } from '../app/core/guards/guards/auth-guard';
import { SubscriptionGuard } from '../app/core/guards/guards/subscription-guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { 
    path: 'contabilidad', 
    component: AccountingCourseComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'finanzas', 
    component: FinanceCourseComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'marketing', 
    component: MarketingCourseComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'emprendimiento', 
    component: EntrepreneurshipCourseComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'lesson/:category/:id',
    component: CourseDetailComponent,
    canActivate: [AuthGuard, SubscriptionGuard]
  },
  { 
    path: 'subscription', 
    component: SubscriptionFormComponent,
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '' }
];