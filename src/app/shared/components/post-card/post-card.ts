import { Component, Input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PublicacaoResponse } from '../../../core/models/observatory';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [CommonModule, RouterLink, DatePipe],
  templateUrl: './post-card.html',
  styleUrl: './post-card.scss'
})
export class PostCard {
  @Input() post!: PublicacaoResponse;

  // Adicione esta função para o HTML conseguir calcular a classe de cor da tag
  getCategoryClass(categoria?: string): string {
    if (!categoria) return 'tag-default';
    const slug = categoria
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '-');
    return `tag-${slug}`;
  }
}
