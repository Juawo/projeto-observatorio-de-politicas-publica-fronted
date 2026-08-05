import { ObservatoryService } from './../../core/services/observatory';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostCard } from '../../shared/components/post-card/post-card';
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

  // Usando os DTOs do backend
  categorias: CategoriaResponse[] = [];
  allPosts: PublicacaoResponse[] = [];
  filteredPosts: PublicacaoResponse[] = [];

  constructor(private observatoryService: ObservatoryService) {}

  ngOnInit(): void {
    this.carregarCategorias();
    this.carregarPublicacoes();
  }

  carregarCategorias(): void {
    this.observatoryService.getCategorias().subscribe({
      next: (data) => this.categorias = data,
      error: (err) => console.error('Erro ao carregar categorias:', err)
    });
  }

  carregarPublicacoes(): void {
    this.observatoryService.getPublicacoes().subscribe({
      next: (data) => {
        this.allPosts = data; // Aqui não tem o .slice(), mostra TUDO!
        this.filteredPosts = data;
      },
      error: (err) => console.error('Erro ao carregar publicações:', err)
    });
  }

  // Filtra por categoria E por termo digitado usando os campos do Java
  filterPosts(): void {
    this.filteredPosts = this.allPosts.filter((post) => {
      // Usa post.categoria
      const matchesCategory =
        this.selectedCategory === 'All' || post.categoria === this.selectedCategory;

      // Proteção extra caso titulo ou autor venham vazios/nulos
      const titleMatch = post.titulo
        ? post.titulo.toLowerCase().includes(this.searchTerm.toLowerCase())
        : false;

      const authorMatch = post.autor
        ? post.autor.toLowerCase().includes(this.searchTerm.toLowerCase())
        : false;

      const matchesSearch = titleMatch || authorMatch;

      return matchesCategory && matchesSearch;
    });
  }
}
