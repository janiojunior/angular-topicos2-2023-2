import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estado } from '../models/estado.model';
import { ItemCarrinho } from '../models/item-carrinho.interface';

@Injectable({
  providedIn: 'root'
})

export class PedidoService {
  private baseURL: string =  'http://localhost:8080';

  constructor(private http: HttpClient) {}
  
  save(carrinho: ItemCarrinho[] ): Observable<Estado> {
    const itens = carrinho.map(item => ({
      quantidade: item.quantidade,
      preco: item.preco,
      idFaixa: item.id
    }));

    const produtos = {
      itens: itens
    };

    return this.http.post<any>(`${this.baseURL}/pedidos`, produtos);
  }


}
