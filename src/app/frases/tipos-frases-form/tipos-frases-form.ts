import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TiposFrasesService } from '../tipos-frases.service';

@Component({
  selector: 'app-tipos-frases-form',
  imports: [FormsModule],
  templateUrl: './tipos-frases-form.html',
  styleUrl: './tipos-frases-form.css',
})
export class TiposFrasesForm implements OnInit {
  id?: number;
  nombre = '';
  esEdicion = false;

  constructor(
    private tiposFrasesService: TiposFrasesService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.id = Number(idParam);
      this.esEdicion = true;
      const tipo = this.tiposFrasesService.getTipo(this.id);
      if (tipo) {
        this.nombre = tipo.nombre;
      }
    }
  }

  guardar(): void {
    if (!this.nombre.trim()) {
      return;
    }

    if (this.esEdicion && this.id !== undefined) {
      this.tiposFrasesService.actualizarTipo({
        id: this.id,
        nombre: this.nombre.trim(),
      });
    } else {
      this.tiposFrasesService.agregarTipo({
        nombre: this.nombre.trim(),
      });
    }

    this.router.navigate(['/tiposFrases']);
  }
}
