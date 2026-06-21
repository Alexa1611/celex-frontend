import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TipoFrase } from '../../model/tipo-frase';
import { TiposFrasesService } from '../tipos-frases.service';

@Component({
  selector: 'app-tipos-frases',
  imports: [RouterLink],
  templateUrl: './tipos-frases.html',
  styleUrl: './tipos-frases.css',
})
export class TiposFrases implements OnInit {
  tipos: TipoFrase[] = [];

  constructor(private tiposFrasesService: TiposFrasesService) {}

  ngOnInit(): void {
    this.cargarTipos();
  }

  cargarTipos(): void {
    this.tipos = this.tiposFrasesService.getTipos();
  }

  eliminar(id: number): void {
    this.tiposFrasesService.eliminarTipo(id);
    this.cargarTipos();
  }
}
