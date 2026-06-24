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
  guardando = false;

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
    const boleta = Number(this.alumno.boleta);
    const nombre = (this.alumno.nombre ?? '').trim();
    const apellidos = (this.alumno.apellidos ?? '').trim();
    const correo = (this.alumno.correo ?? '').trim();

    if (!boleta || !nombre || !apellidos || !correo) {
      Swal.fire('Validación', 'Complete todos los campos', 'warning');
      return false;
    }

    this.alumno.boleta = boleta;
    this.alumno.nombre = nombre;
    this.alumno.apellidos = apellidos;
    this.alumno.correo = correo;
    return true;
  }

  registrar(): void {
    if (!this.validar() || this.guardando) return;

    this.guardando = true;
    Swal.fire({
      title: 'Registrando...',
      text: 'Espera un momento (el servidor puede tardar ~1 min)',
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    this.service.registrar(this.alumno).subscribe({
      next: (evto) => {
        this.guardando = false;
        Swal.fire('Registrado', `Alumno ${evto.nombre} registrado`, 'success');
        this.router.navigate(['/alumnos']);
      },
      error: (err) => {
        this.guardando = false;
        const msg =
          err?.error?.error ??
          (err?.status === 409
            ? 'Boleta o correo ya registrados. Usa datos diferentes.'
            : 'No se pudo registrar. Abre Swagger primero para despertar el servidor e intenta de nuevo.');
        Swal.fire('Error', msg, 'error');
      },
    });
  }

  actualizar(): void {
    if (!this.esEdicion || !this.alumno.idAlumno || !this.validar() || this.guardando) return;

    this.guardando = true;
    this.service.actualizar(this.alumno.idAlumno, this.alumno).subscribe({
      next: (evto) => {
        this.guardando = false;
        Swal.fire('Actualizado', `Alumno ${evto.nombre} actualizado`, 'success');
        this.router.navigate(['/alumnos']);
      },
      error: () => {
        this.guardando = false;
        Swal.fire('Error', 'No se pudo actualizar el alumno', 'error');
      },
    });
  }
}
