import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  PublicacaoResponse,
  PublicacaoRequest,
  CategoriaResponse
} from '../models/observatory';

@Injectable({
  providedIn: 'root'
})
export class ObservatoryService {
  private readonly apiUrl = `${environment.apiUrl}/publicacoes`;
  private readonly categoriasUrl = `${environment.apiUrl}/categorias`;

  constructor(private http: HttpClient) {}

  // GET /api/publicacoes
  getPublicacoes(categoriaId?: number): Observable<PublicacaoResponse[]> {
    let params = new HttpParams();
    if (categoriaId) {
      params = params.set('categoriaId', categoriaId.toString());
    }
    return this.http.get<PublicacaoResponse[]>(this.apiUrl, { params });
  }

  // GET /api/publicacoes/{id}
  getPublicacaoById(id: number | string): Observable<PublicacaoResponse> {
    return this.http.get<PublicacaoResponse>(`${this.apiUrl}/${id}`);
  }

  // POST /api/publicacoes
  criarPublicacao(payload: PublicacaoRequest): Observable<PublicacaoResponse> {
    return this.http.post<PublicacaoResponse>(this.apiUrl, payload);
  }

  // GET /api/categorias
  getCategorias(): Observable<CategoriaResponse[]> {
    return this.http.get<CategoriaResponse[]>(this.categoriasUrl);
  }
}
