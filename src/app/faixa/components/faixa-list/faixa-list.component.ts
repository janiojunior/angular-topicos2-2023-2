import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Faixa } from 'src/app/models/faixa.model';
import { FaixaService } from 'src/app/services/faixa.service';

@Component({
  selector: 'app-faixa-list',
  templateUrl: './faixa-list.component.html',
  styleUrls: ['./faixa-list.component.css']
})
export class FaixaListComponent {
  tableColumns: string[] = ['id-column', 'nome-column', 'descricao-column', 'preco-column', 'estoque-column', 'acao-column'];
  faixas: Faixa[] = [];
  totalRegistros = 0;
  pageSize = 10;
  pagina = 0;
  filtro: string = "";

  constructor(private faixaService: FaixaService) {}

  ngOnInit(): void {
    this.carregarFaixas();
    this.carregarTotalRegistros();
  }

  carregarFaixas() {
    // se existe dados no filtro
    if (this.filtro) {
      this.faixaService.findByNome(this.filtro, this.pagina, this.pageSize).subscribe(data => {
        this.faixas = data;
      });
    } else {
      // buscando todos os faixas
      this.faixaService.findAll(this.pagina, this.pageSize).subscribe(data => {
        this.faixas = data;
      });
    }
  }

  carregarTotalRegistros() {
    // se existe dados no filtro
    if (this.filtro) {
      this.faixaService.countByNome(this.filtro).subscribe(data => {
        this.totalRegistros = data;
      });
    } else {
      this.faixaService.count().subscribe(data => {
        this.totalRegistros = data;
      });
    }
  }

  // Método para paginar os resultados
  paginar(event: PageEvent): void {
    this.pagina = event.pageIndex;
    this.pageSize = event.pageSize;
    this.carregarFaixas();
  }

  aplicarFiltro() {
    this.carregarFaixas();
    this.carregarTotalRegistros();
  }
}
