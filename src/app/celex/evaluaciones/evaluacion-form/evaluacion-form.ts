import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { EvaluacionDTO, InscripcionDTO } from '../../../dto/celex.dto';
import { EvaluacionService, InscripcionService } from '../../celex.service';

@Component({
  selector: 'app-evaluacion-form',
  imports: [FormsModule],
  templateUrl: './evaluacion-form.html',
})
export class EvaluacionForm implements OnInit {
  evaluacion: EvaluacionDTO = new EvaluacionDTO();
  inscripciones: InscripcionDTO[] = [];
  esEdicion = false;

  constructor(
    private service: EvaluacionService,
    private inscripcionService: InscripcionService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.inscripcionService.listar().subscribe({ next: (d) => (this.inscripciones = d) });

    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      if (idParam) {
        this.esEdicion = true;
        this.service.obtener(Number(idParam)).subscribe({
          next: (data) => (this.evaluacion = { ...data }),
          error: () => {
            Swal.fire('Error', 'No se encontró la evaluación', 'error');
            this.router.navigate(['/evaluaciones']);
          },
        });
      } else {
        this.esEdicion = false;
        this.evaluacion = new EvaluacionDTO();
      }
    });
  }

  private validar(): boolean {
    if (this.evaluacion.calificacionSpeaking === null || this.evaluacion.calificacionWriting === null || !this.evaluacion.idInscripcion) {
      Swal.fire('Validación', 'Complete todos los campos', 'warning');
      return false;
    }
    return true;
  }

  registrar(): void {
    if (!this.validar()) return;
    this.service.registrar(this.evaluacion).subscribe({
      next: (evto) => {
        Swal.fire('Registrado', `Promedio: ${evto.promedioFinal}`, 'success');
        this.router.navigate(['/evaluaciones']);
      },
      error: () => Swal.fire('Error', 'No se pudo registrar', 'error'),
    });
  }

  actualizar(): void {
    if (!this.esEdicion || !this.evaluacion.idEvaluacion || !this.validar()) return;
    this.service.actualizar(this.evaluacion.idEvaluacion, this.evaluacion).subscribe({
      next: (evto) => {
        Swal.fire('Actualizado', `Promedio: ${evto.promedioFinal}`, 'success');
        this.router.navigate(['/evaluaciones']);
      },
      error: () => Swal.fire('Error', 'No se pudo actualizar', 'error'),
    });
  }
}
