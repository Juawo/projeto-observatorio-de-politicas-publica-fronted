import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PostCard } from '../../shared/components/post-card/post-card';
import { ObservatoryService } from '../../core/services/observatory';
import { PublicacaoResponse, CategoriaResponse } from '../../core/models/observatory';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, PostCard],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  selectedCategory: string = 'All';

  // Variáveis tipadas com os DTOs do backend
  categorias: CategoriaResponse[] = [];
  allPosts: PublicacaoResponse[] = [];
  filteredPosts: PublicacaoResponse[] = [];

  constructor(private observatoryService: ObservatoryService) {}

  ngOnInit(): void {
    this.carregarCategorias();
    this.carregarPublicacoes();
  }

  // Busca as categorias reais da API
  carregarCategorias(): void {
    this.observatoryService.getCategorias().subscribe({
      next: (data) => {
        this.categorias = data;
      },
      error: (err) => console.error('Erro ao carregar categorias:', err)
    });
  }

  // Busca as publicações e exibe as 6 primeiras na Home
  carregarPublicacoes(): void {
    this.observatoryService.getPublicacoes().subscribe({
      next: (data) => {
        this.allPosts = data.slice(0, 6); // Limita para vitrine
        this.filteredPosts = this.allPosts;
      },
      error: (err) => console.error('Erro ao carregar publicações:', err)
    });
  }

  // Lógica de filtro reativo
  onCategoryChange(): void {
    if (this.selectedCategory === 'All') {
      this.filteredPosts = this.allPosts;
    } else {
      this.filteredPosts = this.allPosts.filter(
        // Aqui usamos 'categoria' para refletir o DTO
        (post) => post.categoria === this.selectedCategory
      );
    }
  }
}
