import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CursoDTO, ProfesorDTO } from '../../../dto/celex.dto';
import { CursoService, ProfesorService } from '../../celex.service';

@Component({
  selector: 'app-curso-form',
  imports: [FormsModule],
  templateUrl: './curso-form.html',
})
export class CursoForm implements OnInit {
  curso: CursoDTO = new CursoDTO();
  profesores: ProfesorDTO[] = [];
  esEdicion = false;

  constructor(
    private service: CursoService,
    private profesorService: ProfesorService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.profesorService.listar().subscribe({
      next: (data) => (this.profesores = data),
      error: () => Swal.fire('Error', 'No se pudieron cargar profesores', 'error'),
    });

    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      if (idParam) {
        this.esEdicion = true;
        this.service.obtener(Number(idParam)).subscribe({
          next: (data) => (this.curso = { ...data }),
          error: () => {
            Swal.fire('Error', 'No se encontró el curso', 'error');
            this.router.navigate(['/cursos']);
          },
        });
      } else {
        this.esEdicion = false;
        this.curso = new CursoDTO();
      }
    });
  }

  private validar(): boolean {
    if (!this.curso.idioma.trim() || !this.curso.nivel.trim() || !this.curso.horario.trim() || !this.curso.salon.trim() || !this.curso.idProfesor) {
      Swal.fire('Validación', 'Complete todos los campos', 'warning');
      return false;
    }
    return true;
  }

  registrar(): void {
    if (!this.validar()) return;
    this.service.registrar(this.curso).subscribe({
      next: () => {
        Swal.fire('Registrado', 'Curso registrado', 'success');
        this.router.navigate(['/cursos']);
      },
      error: () => Swal.fire('Error', 'No se pudo registrar', 'error'),
    });
  }

  actualizar(): void {
    if (!this.esEdicion || !this.curso.idCurso || !this.validar()) return;
    this.service.actualizar(this.curso.idCurso, this.curso).subscribe({
      next: () => {
        Swal.fire('Actualizado', 'Curso actualizado', 'success');
        this.router.navigate(['/cursos']);
      },
      error: () => Swal.fire('Error', 'No se pudo actualizar', 'error'),
    });
  }
}
