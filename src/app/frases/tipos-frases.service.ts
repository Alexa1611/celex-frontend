import { Injectable } from '@angular/core';
import { TipoFrase } from '../model/tipo-frase';

@Injectable({ providedIn: 'root' })
export class TiposFrasesService {
  private tipos: TipoFrase[] = [
    { id: 1, nombre: 'Tipo 1' },
    { id: 2, nombre: 'Tipo 2' },
    { id: 3, nombre: 'Tipo 3' },
    { id: 4, nombre: 'Tipo 4' },
  ];
  private nextId = 5;

  getTipos(): TipoFrase[] {
    return [...this.tipos];
  }

  getTipo(id: number): TipoFrase | undefined {
    return this.tipos.find((t) => t.id === id);
  }

  agregarTipo(tipo: Omit<TipoFrase, 'id'>): void {
    this.tipos.push({ ...tipo, id: this.nextId++ });
  }

  actualizarTipo(tipo: TipoFrase): void {
    const index = this.tipos.findIndex((t) => t.id === tipo.id);
    if (index !== -1) {
      this.tipos[index] = tipo;
    }
  }

  eliminarTipo(id: number): void {
    this.tipos = this.tipos.filter((t) => t.id !== id);
  }
}
