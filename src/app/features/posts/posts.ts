import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostCard } from '../../shared/components/post-card/post-card';
import { ObservatoryService } from '../../core/services/observatory';
import { PublicacaoResponse, CategoriaResponse } from '../../core/models/observatory';

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

  categorias: CategoriaResponse[] = [];
  allPosts: PublicacaoResponse[] = [];
  filteredPosts: PublicacaoResponse[] = [];

  constructor(
    private observatoryService: ObservatoryService,
    private cdr: ChangeDetectorRef // <-- O despertador do Angular
  ) {}

  ngOnInit(): void {
    this.carregarCategorias();
    this.carregarPublicacoes();
  }

  carregarCategorias(): void {
    this.observatoryService.getCategorias().subscribe({
      next: (data) => {
        this.categorias = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Erro ao carregar categorias:', err)
    });
  }

  carregarPublicacoes(): void {
    this.observatoryService.getPublicacoes().subscribe({
      next: (data) => {
        this.allPosts = data;
        this.filterPosts();
        this.cdr.detectChanges(); // Atualiza a tela na mesma hora
      },
      error: (err) => console.error('Erro ao carregar publicações:', err)
    });
  }

  filterPosts(): void {
    this.filteredPosts = this.allPosts.filter((post) => {
      const matchesCategory =
        this.selectedCategory === 'All' || post.categoria === this.selectedCategory;

      const titleMatch = post.titulo
        ? post.titulo.toLowerCase().includes(this.searchTerm.toLowerCase())
        : false;

      const authorMatch = post.autor
        ? post.autor.toLowerCase().includes(this.searchTerm.toLowerCase())
        : false;

      const matchesSearch = this.searchTerm === '' || titleMatch || authorMatch;

      return matchesCategory && matchesSearch;
    });
  }
}
