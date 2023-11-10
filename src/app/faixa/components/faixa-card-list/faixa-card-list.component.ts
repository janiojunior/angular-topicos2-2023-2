import { Component, OnInit, Signal, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Faixa } from 'src/app/models/faixa.model';
import { CarrinhoService } from 'src/app/services/carrinho.service';
import { FaixaService } from 'src/app/services/faixa.service';

type Card = {
  idFaixa: number;
  titulo: string;
  modalidade: string;
  preco: number;
  urlImagem: string;
}

@Component({
  selector: 'app-faixa-card-list',
  templateUrl: './faixa-card-list.component.html',
  styleUrls: ['./faixa-card-list.component.css']
})
export class FaixaCardListComponent implements OnInit {

  cards = signal<Card[]> ([]);
  faixas: Faixa[] = [];

  constructor(private faixaService: FaixaService, 
              private carrinhoService: CarrinhoService,
              private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.carregarFaixas();
  }

  carregarFaixas() {
    // buscando todos as faixas
    this.faixaService.findAll(0, 10).subscribe(data => {
      this.faixas = data;
      this.carregarCards();
    });
  }

  carregarCards() {
    const cards: Card[] = [];
    this.faixas.forEach(faixa => {
      cards.push({
        idFaixa: faixa.id,
        titulo: faixa.nome,
        modalidade: faixa.modalidade.label,
        preco: faixa.preco,
        urlImagem: this.faixaService.getUrlImagem(faixa.nomeImagem)
      });
    });
    this.cards.set(cards);
  }

  adicionarAoCarrinho(card: Card) {
    this.showSnackbarTopPosition('Produto adicionado ao carrinho!', 'Fechar');

  }

  showSnackbarTopPosition(content:any, action:any) {
    this.snackBar.open(content, action, {
      duration: 2000,
      verticalPosition: "top", // Allowed values are  'top' | 'bottom'
      horizontalPosition: "center" // Allowed values are 'start' | 'center' | 'end' | 'left' | 'right'
    });
  }
}
