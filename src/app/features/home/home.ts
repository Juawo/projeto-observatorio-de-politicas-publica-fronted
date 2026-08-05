import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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

  categorias: CategoriaResponse[] = [];
  allPosts: PublicacaoResponse[] = [];
  filteredPosts: PublicacaoResponse[] = [];

  constructor(
    private observatoryService: ObservatoryService,
    private cdr: ChangeDetectorRef // <-- O responsável por acordar o HTML
  ) {}

  ngOnInit(): void {
    this.carregarCategorias();
    this.carregarPublicacoes();
  }

  carregarCategorias(): void {
    this.observatoryService.getCategorias().subscribe({
      next: (data) => {
        this.categorias = data;
        this.cdr.detectChanges(); // Força a atualização do Select
      },
      error: (err) => console.error('Erro nas categorias:', err)
    });
  }

  carregarPublicacoes(): void {
    this.observatoryService.getPublicacoes().subscribe({
      next: (data) => {
        this.allPosts = data;
        this.filterPosts();
        this.cdr.detectChanges(); // Força a renderização dos cards imediatamente
      },
      error: (err) => console.error('Erro nas publicações:', err)
    });
  }

  filterPosts(): void {
    if (this.selectedCategory === 'All') {
      this.filteredPosts = this.allPosts;
    } else {
      this.filteredPosts = this.allPosts.filter(
        (post) => post.categoria === this.selectedCategory
      );
    }
  }
}
