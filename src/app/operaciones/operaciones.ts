import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-operaciones',
  imports: [FormsModule],
  templateUrl: './operaciones.html',
  styleUrl: './operaciones.css',
})
export class Operaciones {
  numeroUno = 0;
  numeroDos = 0;
  resultado = 0;
  operacionActiva = 'restar';

  sumar(): void {
    this.resultado = this.numeroUno + this.numeroDos;
    this.operacionActiva = 'sumar';
  }

  restar(): void {
    this.resultado = this.numeroUno - this.numeroDos;
    this.operacionActiva = 'restar';
  }

  multiplicar(): void {
    this.resultado = this.numeroUno * this.numeroDos;
    this.operacionActiva = 'multiplicar';
  }

  dividir(): void {
    this.resultado = this.numeroDos !== 0 ? this.numeroUno / this.numeroDos : 0;
    this.operacionActiva = 'dividir';
  }
}
