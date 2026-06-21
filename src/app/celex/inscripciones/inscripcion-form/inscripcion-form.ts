import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AlumnoDTO, CursoDTO, InscripcionDTO } from '../../../dto/celex.dto';
import { AlumnoService, CursoService, InscripcionService } from '../../celex.service';

@Component({
  selector: 'app-inscripcion-form',
  imports: [FormsModule],
  templateUrl: './inscripcion-form.html',
})
export class InscripcionForm implements OnInit {
  inscripcion: InscripcionDTO = new InscripcionDTO();
  alumnos: AlumnoDTO[] = [];
  cursos: CursoDTO[] = [];
  esEdicion = false;

  constructor(
    private service: InscripcionService,
    private alumnoService: AlumnoService,
    private cursoService: CursoService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.alumnoService.listar().subscribe({ next: (d) => (this.alumnos = d) });
    this.cursoService.listar().subscribe({ next: (d) => (this.cursos = d) });

    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      if (idParam) {
        this.esEdicion = true;
        this.service.obtener(Number(idParam)).subscribe({
          next: (data) => (this.inscripcion = { ...data }),
          error: () => {
            Swal.fire('Error', 'No se encontró la inscripción', 'error');
            this.router.navigate(['/inscripciones']);
          },
        });
      } else {
        this.esEdicion = false;
        this.inscripcion = new InscripcionDTO();
        this.inscripcion.fechaInscripcion = new Date().toISOString().slice(0, 10);
      }
    });
  }

  private validar(): boolean {
    if (!this.inscripcion.fechaInscripcion || !this.inscripcion.periodo.trim() || !this.inscripcion.idAlumno || !this.inscripcion.idCurso) {
      Swal.fire('Validación', 'Complete todos los campos', 'warning');
      return false;
    }
    return true;
  }

  registrar(): void {
    if (!this.validar()) return;
    this.service.registrar(this.inscripcion).subscribe({
      next: () => {
        Swal.fire('Registrado', 'Inscripción registrada', 'success');
        this.router.navigate(['/inscripciones']);
      },
      error: () => Swal.fire('Error', 'No se pudo registrar', 'error'),
    });
  }

  actualizar(): void {
    if (!this.esEdicion || !this.inscripcion.idInscripcion || !this.validar()) return;
    this.service.actualizar(this.inscripcion.idInscripcion, this.inscripcion).subscribe({
      next: () => {
        Swal.fire('Actualizado', 'Inscripción actualizada', 'success');
        this.router.navigate(['/inscripciones']);
      },
      error: () => Swal.fire('Error', 'No se pudo actualizar', 'error'),
    });
  }
}
