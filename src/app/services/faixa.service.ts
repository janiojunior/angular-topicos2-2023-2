import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Faixa } from '../models/faixa.model';

@Injectable({
  providedIn: 'root'
})
export class FaixaService {
  private baseURL: string =  'http://localhost:8080/faixas';

  constructor(private http: HttpClient) {}

  findAll(pagina: number, tamanhoPagina: number): Observable<Faixa[]> {
    const params = {
      page: pagina.toString(),
      pageSize: tamanhoPagina.toString()
    }
    return this.http.get<Faixa[]>(`${this.baseURL}`, {params});
  }

  findById(id: string): Observable<Faixa> {
    return this.http.get<Faixa>(`${this.baseURL}/${id}`);
  }

  findByNome(nome: string, pagina: number, tamanhoPagina: number): Observable<Faixa[]> {
    const params = {
      page: pagina.toString(),
      pageSize: tamanhoPagina.toString()
    }
    return this.http.get<Faixa[]>(`${this.baseURL}/search/${nome}`, {params});
  }

  save(faixa: Faixa): Observable<Faixa> {
    return this.http.post<Faixa>(`${this.baseURL}`, faixa);
  }

  update(faixa: Faixa): Observable<Faixa> {
    return this.http.put<Faixa>(`${this.baseURL}/${faixa.id}`, faixa );
  }

  delete(faixa: Faixa): Observable<any> {
    return this.http.delete<Faixa>(`${this.baseURL}/${faixa.id}`);
  }

  count(): Observable<number> {
    return this.http.get<number>(`${this.baseURL}/count`);
  }

  countByNome(nome: string): Observable<number> {
    return this.http.get<number>(`${this.baseURL}/search/${nome}/count`);
  }

  getUrlImagem(nomeImagem: string): string {
    return `${this.baseURL}/image/download/${nomeImagem}`;
  }

}
