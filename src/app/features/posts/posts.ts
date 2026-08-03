import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostCard, Post } from '../../shared/components/post-card/post-card';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule, FormsModule, PostCard],
  templateUrl: './posts.html',
  styleUrl: './posts.scss',
})
export class Posts implements OnInit {
  searchTerm: string = '';
  selectedCategory: string = 'All';

  categories: string[] = [
    'All',
    'Antirracismo',
    'Educação',
    'Saúde',
    'Social',
    'Sustentabilidade',
    'Políticas Públicas'
  ];

  allPosts: Post[] = [
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
    },
    {
      id: 3,
      title: 'Programa de saúde mental para servidores',
      author: 'Carlos Lima',
      date: '28 mai. 2025',
      category: 'Saúde',
      imageUrl: 'https://picsum.photos/400/250?random=3'
    },
    {
      id: 4,
      title: 'Inclusão de PcD: levantamento de acessibilidade',
      author: 'Rita Sousa',
      date: '20 mai. 2025',
      category: 'Social',
      imageUrl: 'https://picsum.photos/400/250?random=4'
    },
    {
      id: 5,
      title: 'Sustentabilidade no IFPI: práticas e desafios',
      author: 'Marcos Silva',
      date: '15 mai. 2025',
      category: 'Sustentabilidade',
      imageUrl: 'https://picsum.photos/400/250?random=5'
    },
    {
      id: 6,
      title: 'Gestão democrática e participação social',
      author: 'Juliana Oliveira',
      date: '10 mai. 2025',
      category: 'Políticas Públicas',
      imageUrl: 'https://picsum.photos/400/250?random=6'
    }
  ];

  filteredPosts: Post[] = [];

  ngOnInit(): void {
    this.filteredPosts = this.allPosts;
  }

  // Filtra por categoria E por termo digitado na busca ao mesmo tempo
  filterPosts(): void {
    this.filteredPosts = this.allPosts.filter((post) => {
      const matchesCategory =
        this.selectedCategory === 'All' || post.category === this.selectedCategory;

      const matchesSearch =
        post.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        post.author.toLowerCase().includes(this.searchTerm.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }
}
