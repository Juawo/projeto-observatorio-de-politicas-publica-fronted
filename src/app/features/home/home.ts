import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PostCard, Post } from '../../shared/components/post-card/post-card';

@Component({
  selector: 'app-home',
  imports: [CommonModule, PostCard],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})

export class Home {
  postExample: Post[] = [
    {
        id: 1,
        title: 'Ações afirmativas no IFPI: análise 2023–2024',
        author: 'João Mendes',
        date: '12 jun. 2025',
        category: 'Antirracismo',
        imageUrl: 'https://picsum.photos/400/250?random=1'
      },
      {
        id: 2,
        title: 'Políticas de permanência estudantil no campus',
        author: 'Ana Costa',
        date: '03 jun. 2025',
        category: 'Educação',
        imageUrl: 'https://picsum.photos/400/250?random=2'
      }
    ];
}
