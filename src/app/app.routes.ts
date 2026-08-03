import { Routes } from '@angular/router';
import { Home } from "./features/home/home";
import { PostDetail } from "./features/post-detail/post-detail";
import { Posts } from './features/posts/posts';
import { About } from './features/about/about';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'posts', component: Posts },
  { path: 'about', component: About },
  { path: 'post/:id', component: PostDetail },
  { path: '**', redirectTo: '' }
];
