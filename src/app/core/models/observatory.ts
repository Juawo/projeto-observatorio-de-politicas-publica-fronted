// Espelho do PublicacaoResponse Java
export interface PublicacaoResponse {
  id: number;
  titulo: string;
  autor: string;
  resumo?: string;
  conteudo?: string;
  categoria: string;
  imagem?: string;
  pdf?: string;
  dataPublicacao: string; // Vem como ISO string ("YYYY-MM-DD")
}

// Espelho do PublicacaoRequest Java (para envios/submissões)
export interface PublicacaoRequest {
  titulo: string;
  autor: string;
  resumo?: string;
  conteudo?: string;
  categoriaId: number;
}

// Espelho do CategoriaResponse Java
export interface CategoriaResponse {
  id: number;
  nome: string;
  descricao?: string;
}

// Espelho do CategoriaRequest Java
export interface CategoriaRequest {
  nome: string;
  descricao?: string;
}
