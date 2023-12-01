// carrinho.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemCarrinho } from 'src/app/models/item-carrinho.interface';
import { CarrinhoService } from 'src/app/services/carrinho.service';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css'],
})
export class CarrinhoComponent implements OnInit {
  carrinhoItens: ItemCarrinho[] = [];

  constructor(private carrinhoService: CarrinhoService,
              private router: Router,
              private pedidoService: PedidoService) {}

  ngOnInit(): void {
    this.carrinhoService.carrinho$.subscribe(itens => {
      this.carrinhoItens = itens;
    });
  }

  removerItem(item: ItemCarrinho): void {
    this.carrinhoService.remover(item);
  }

  calcularTotal(): number {
    return this.carrinhoItens.reduce((total, item) => total + item.quantidade * item.preco, 0);
  }

  finalizarCompra() {
    this.pedidoService.save(this.carrinhoItens).subscribe({
      next: () => {
        this.carrinhoService.removerTudo();
        this.router.navigateByUrl('/user/compras/produtos');
      },
      error: (err) => {
        console.log('Erro ao incluir' + JSON.stringify(err));
      }
    });
  }
}

