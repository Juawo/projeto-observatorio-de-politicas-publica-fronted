import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common'; // <- Importar DatePipe aqui
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ObservatoryService } from '../../core/services/observatory';
import { PublicacaoResponse } from '../../core/models/observatory';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, DatePipe], // <- Incluir no array de imports
  templateUrl: './post-detail.html',
  styleUrl: './post-detail.scss',
})
export class PostDetail implements OnInit {
  post: PublicacaoResponse | null = null;
  relatedPosts: PublicacaoResponse[] = []; // Array para as publicações relacionadas
  isLoading: boolean = true;
  hasError: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private observatoryService: ObservatoryService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.fetchPostData(id);
      }
    });
  }

  private fetchPostData(id: string): void {
    this.isLoading = true;
    this.hasError = false;

    this.observatoryService.getPublicacaoById(id).subscribe({
      next: (data) => {
        this.post = data;
        this.post.imagem = data.imagem || `https://picsum.photos/seed/${data.id}/600/400`;
        this.post.pdf = data.pdf || 'assets/docs/em-desenvolvimento.pdf';
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar a publicação:', err);
        this.hasError = true;
        this.isLoading = false;
      }
    });
  }

  getCategoryClass(category?: string): string {
    if (!category) return 'tag-default';
    const slug = category
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '-');
    return `tag-${slug}`;
  }
}
