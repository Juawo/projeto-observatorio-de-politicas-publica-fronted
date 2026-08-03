import { Routes } from '@angular/router';
import { Home } from "./features/home/home";
import { PostDetail } from "./features/post-detail/post-detail";
import { Posts } from './features/posts/posts';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'posts', component: Posts },
  // { path: 'about', component: SobreComponent },
  { path: 'post/:id', component: PostDetail },
  { path: '**', redirectTo: '' }
];
