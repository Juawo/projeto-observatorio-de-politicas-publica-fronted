import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Necessário para usar o [(ngModel)] no select
import { PostCard, Post } from '../../shared/components/post-card/post-card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, PostCard],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  selectedCategory: string = 'All';

  // Categorias disponíveis para o select
  categories: string[] = [
    'All',
    'Antirracismo',
    'Educação',
    'Saúde',
    'Social',
    'Sustentabilidade',
    'Políticas Públicas'
  ];

  // Lista mockada de publicações (igual ao layout da imagem)
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

  // Função disparada ao alterar a opção no select
  onCategoryChange(): void {
    if (this.selectedCategory === 'All') {
      this.filteredPosts = this.allPosts;
    } else {
      this.filteredPosts = this.allPosts.filter(
        (post) => post.category === this.selectedCategory
      );
    }
  }
}
