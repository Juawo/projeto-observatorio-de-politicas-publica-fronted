import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // <- Adicionado ChangeDetectorRef
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ObservatoryService } from '../../core/services/observatory';
import { PublicacaoResponse } from '../../core/models/observatory';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, DatePipe],
  templateUrl: './post-detail.html',
  styleUrl: './post-detail.scss',
})
export class PostDetail implements OnInit {
  post: PublicacaoResponse | null = null;
  relatedPosts: PublicacaoResponse[] = [];
  isLoading: boolean = true;
  hasError: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private observatoryService: ObservatoryService,
    private cdr: ChangeDetectorRef // <- Injetado no construtor
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

        // NOVA LINHA: Inicia a busca pelas publicações da mesma categoria
        this.carregarPublicacoesRelacionadas(this.post.categoria, this.post.id);

        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erro ao carregar a publicação:', err);
        this.hasError = true;
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  private carregarPublicacoesRelacionadas(categoria: string, currentPostId: number): void {
    this.observatoryService.getPublicacoes().subscribe({
      next: (data) => {
        // Filtra os posts da mesma categoria, garantindo que o post atual não apareça na lista
        this.relatedPosts = data
          .filter(p => p.categoria === categoria && p.id !== currentPostId)
          .slice(0, 3); // Pega apenas os 3 primeiros para manter o layout limpo

        this.cdr.detectChanges(); // Acorda o HTML para desenhar a nova seção
      },
      error: (err) => console.error('Erro ao buscar relacionadas:', err)
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
