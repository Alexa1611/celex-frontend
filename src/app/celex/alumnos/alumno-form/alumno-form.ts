import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AlumnoDTO } from '../../../dto/celex.dto';
import { AlumnoService } from '../../celex.service';

@Component({
  selector: 'app-alumno-form',
  imports: [FormsModule],
  templateUrl: './alumno-form.html',
})
export class AlumnoForm implements OnInit {
  alumno: AlumnoDTO = new AlumnoDTO();
  esEdicion = false;

  constructor(
    private service: AlumnoService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      if (idParam) {
        this.esEdicion = true;
        this.service.obtener(Number(idParam)).subscribe({
          next: (data) => (this.alumno = { ...data }),
          error: () => {
            Swal.fire('Error', 'No se encontró el alumno', 'error');
            this.router.navigate(['/alumnos']);
          },
        });
      } else {
        this.esEdicion = false;
        this.alumno = new AlumnoDTO();
      }
    });
  }

  private validar(): boolean {
    if (!this.alumno.boleta || !this.alumno.nombre.trim() || !this.alumno.apellidos.trim() || !this.alumno.correo.trim()) {
      Swal.fire('Validación', 'Complete todos los campos', 'warning');
      return false;
    }
    return true;
  }

  registrar(): void {
    if (!this.validar()) return;

    this.service.registrar(this.alumno).subscribe({
      next: (evto) => {
        Swal.fire('Registrado', `Alumno ${evto.nombre} registrado`, 'success');
        this.router.navigate(['/alumnos']);
      },
      error: () => Swal.fire('Error', 'No se pudo registrar el alumno', 'error'),
    });
  }

  actualizar(): void {
    if (!this.esEdicion || !this.alumno.idAlumno || !this.validar()) return;

    this.service.actualizar(this.alumno.idAlumno, this.alumno).subscribe({
      next: (evto) => {
        Swal.fire('Actualizado', `Alumno ${evto.nombre} actualizado`, 'success');
        this.router.navigate(['/alumnos']);
      },
      error: () => Swal.fire('Error', 'No se pudo actualizar el alumno', 'error'),
    });
  }
}
