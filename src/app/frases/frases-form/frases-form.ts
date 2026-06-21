import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FraseDTO, FraseRegistroDTO } from '../../dto/frase.dto';
import { FrasesService } from '../frases.service';

@Component({
  selector: 'app-frases-form',
  imports: [FormsModule],
  templateUrl: './frases-form.html',
  styleUrl: './frases-form.css',
})
export class FrasesForm implements OnInit {
  frase: FraseDTO = new FraseDTO();
  esEdicion = false;

  constructor(
    private service: FrasesService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      if (idParam) {
        this.esEdicion = true;
        const fraseEncontrada = this.service.getFrase(Number(idParam));
        if (fraseEncontrada) {
          this.frase = { ...fraseEncontrada };
        } else {
          this.esEdicion = false;
          this.limpiarFormulario();
          Swal.fire('Error', 'No se encontró la frase', 'error');
        }
      } else {
        this.esEdicion = false;
        this.limpiarFormulario();
      }
    });
  }

  private limpiarFormulario(): void {
    this.frase = new FraseDTO();
  }

  private validarCampos(): boolean {
    if (!this.frase.autor.trim() || !this.frase.texto.trim()) {
      Swal.fire('Validación', 'Debe capturar autor y texto', 'warning');
      return false;
    }
    return true;
  }

  registrarFrase(): void {
    if (!this.validarCampos()) {
      return;
    }

    const fraseRegistroDTO = new FraseRegistroDTO();
    fraseRegistroDTO.autor = this.frase.autor.trim();
    fraseRegistroDTO.texto = this.frase.texto.trim();

    this.service.registrarFrase(fraseRegistroDTO).subscribe((evto) => {
      Swal.fire(
        'Registrar Frase',
        `La frase ${evto.texto} se registró satisfactoriamente`,
        'info',
      );
      this.limpiarFormulario();
      this.router.navigate(['/frases']);
    });
  }

  actualizarFrase(): void {
    if (!this.esEdicion) {
      return;
    }

    if (!this.validarCampos()) {
      return;
    }

    const laFrase = new FraseDTO();
    laFrase.id = this.frase.id;
    laFrase.autor = this.frase.autor.trim();
    laFrase.texto = this.frase.texto.trim();

    this.service.actualizarFrase(laFrase).subscribe((evto) => {
      Swal.fire(
        'Actualizar Frase',
        `La frase ${evto.texto} se actualizó satisfactoriamente`,
        'info',
      );
      this.router.navigate(['/frases']);
    });
  }
}
