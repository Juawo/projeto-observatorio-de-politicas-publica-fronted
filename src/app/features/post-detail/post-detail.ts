import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

// Interface estendida com os dados específicos da tela de detalhes
export interface PostDetailData {
  id: number | string;
  title: string;
  author: string;
  date: string;
  category: string;
  imageUrl: string;
  summary: string;
  pdfUrl?: string;
  pdfName?: string;
  pdfSize?: string;
}

// Interface para as outras publicações relacionadas
export interface RelatedPost {
  id: number | string;
  title: string;
  author: string;
  date: string;
  category: string;
}

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './post-detail.html',
  styleUrl: './post-detail.scss',
})
export class PostDetail implements OnInit {
  postId: string | null = null;
  post: PostDetailData | null = null;

  // Lista mockada de publicações relacionadas
  relatedPosts: RelatedPost[] = [
    {
      id: 2,
      title: 'RAV no ambiente escolar: desafios e possibilidades de enfrentamento',
      author: 'Ana Costa',
      date: '03 jun. 2025',
      category: 'Racismo',
    },
    {
      id: 3,
      title: 'Representatividade negra na mídia: avanços e retrocessos',
      author: 'Carlos Lima',
      date: '22 mai. 2025',
      category: 'Racismo',
    },
    {
      id: 4,
      title: 'Juventudes negras e protagonismo: experiências de resistência no Piauí',
      author: 'Rita Sousa',
      date: '15 mai. 2025',
      category: 'Racismo',
    },
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Escuta as alterações de parâmetro na URL (ex: se o usuário clicar em uma publicação relacionada)
    this.route.paramMap.subscribe((params) => {
      this.postId = params.get('id');
      this.loadPostData(this.postId);
    });
  }

  loadPostData(id: string | null): void {
    // Mock de dados para simular o retorno de uma chamada de API
    this.post = {
      id: id || 1,
      title: 'Racismo à Brasileira (RAV): origens, impactos e resistências na sociedade contemporânea',
      author: 'João Mendes',
      date: '27 de maio de 2025',
      category: 'Antirracismo',
      imageUrl: 'https://picsum.photos/600/400?random=10',
      summary:
        'Esta publicação aborda o conceito de Racismo à Brasileira (RAV), discutindo suas raízes históricas, manifestações no cotidiano e impactos estruturais na sociedade. O texto também apresenta formas de resistência e ações antirracistas desenvolvidas em diferentes espaços sociais e institucionais. A análise busca contribuir para a compreensão crítica do racismo no Brasil e para a promoção de políticas públicas e práticas educativas antirracistas.',
      pdfName: 'racismo-a-brasileira-rav-origens-impactos-resistencias.pdf',
      pdfSize: '1.4 MB',
      pdfUrl: '#',
    };
  }

  getCategoryClass(category: string): string {
    if (!category) return 'tag-default';
    const slug = category
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '-');
    return `tag-${slug}`;
  }
}
