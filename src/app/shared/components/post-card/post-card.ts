import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface Post {
  id: number;
  title: string;
  author: string;
  date: string;
  category: string;
  imageUrl: string;
}

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './post-card.html',
  styleUrl: './post-card.scss',
})

export class PostCard{
  @Input({ required: true }) post!: Post;

  getCategoryClass(category: string): string {
    if (!category) return 'tag-default';

    const slug = category
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '-');

    return `tag-${slug}`
  }
}
