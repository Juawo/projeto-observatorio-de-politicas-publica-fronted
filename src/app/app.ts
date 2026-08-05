import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Header } from './shared/components/header/header'; // Importe conforme sua estrutura
import { Footer } from './shared/components/footer/footer'; // Importe conforme sua estrutura

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, Header, Footer], // Seus imports normais
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Fica "escutando" todas as mudanças de rota (cliques nos links)
    this.router.events.subscribe((event) => {
      // Quando a navegação para uma nova página terminar...
      if (event instanceof NavigationEnd) {

        // 1. Tenta rolar a janela principal do navegador
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // 2. Tenta rolar o body e o html (caso o CSS esteja forçando a barra)
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;

        // 3. Se você tiver uma <main> ou <div> principal englobando tudo no seu app.html:
        // const mainContainer = document.querySelector('.main-content-class');
        // if (mainContainer) mainContainer.scrollTop = 0;
      }
    });
  }
}
