import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Estado } from 'src/app/models/estado.model';
import { EstadoService } from 'src/app/services/estado.service';

@Component({
  selector: 'app-estado-list',
  templateUrl: './estado-list.component.html',
  styleUrls: ['./estado-list.component.css']
})
export class EstadoListComponent implements OnInit {

  tableColumns: string[] = ['id-column', 'nome-column', 'sigla-column', 'acao-column'];
  estados: Estado[] = [];
  totalRegistros = 0;
  pageSize = 2;
  pagina = 0;
  filtro: string = "";

  constructor(private estadoService: EstadoService) {}

  ngOnInit(): void {
    this.estadoService.findAll().subscribe(data => {
      this.estados = data;
    });
  }

  carregarEstados() {

  }

  carregarTotalRegistros() {
  }

  // Método para paginar os resultados
  paginar(event: PageEvent): void {
  }

  aplicarFiltro() {
  }

}
