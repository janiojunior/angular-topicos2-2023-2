import { Component, OnInit, Signal, signal } from '@angular/core';
import { Faixa } from 'src/app/models/faixa.model';
import { FaixaService } from 'src/app/services/faixa.service';

type Card = {
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

  constructor(private faixaService: FaixaService) {}

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
        titulo: faixa.nome,
        modalidade: faixa.modalidade.label,
        preco: faixa.preco,
        urlImagem: this.faixaService.getUrlImagem(faixa.nomeImagem)
      });
    });
    this.cards.set(cards);
  }

}
