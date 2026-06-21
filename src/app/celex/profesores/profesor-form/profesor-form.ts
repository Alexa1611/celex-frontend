import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ProfesorDTO } from '../../../dto/celex.dto';
import { ProfesorService } from '../../celex.service';

@Component({
  selector: 'app-profesor-form',
  imports: [FormsModule],
  templateUrl: './profesor-form.html',
})
export class ProfesorForm implements OnInit {
  profesor: ProfesorDTO = new ProfesorDTO();
  esEdicion = false;

  constructor(
    private service: ProfesorService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      if (idParam) {
        this.esEdicion = true;
        this.service.obtener(Number(idParam)).subscribe({
          next: (data) => (this.profesor = { ...data }),
          error: () => {
            Swal.fire('Error', 'No se encontró el profesor', 'error');
            this.router.navigate(['/profesores']);
          },
        });
      } else {
        this.esEdicion = false;
        this.profesor = new ProfesorDTO();
      }
    });
  }

  private validar(): boolean {
    if (!this.profesor.numEmpleado.trim() || !this.profesor.nombre.trim() || !this.profesor.apellidos.trim() || !this.profesor.idiomaEspecialidad.trim()) {
      Swal.fire('Validación', 'Complete todos los campos', 'warning');
      return false;
    }
    return true;
  }

  registrar(): void {
    if (!this.validar()) return;
    this.service.registrar(this.profesor).subscribe({
      next: () => {
        Swal.fire('Registrado', 'Profesor registrado', 'success');
        this.router.navigate(['/profesores']);
      },
      error: () => Swal.fire('Error', 'No se pudo registrar', 'error'),
    });
  }

  actualizar(): void {
    if (!this.esEdicion || !this.profesor.idProfesor || !this.validar()) return;
    this.service.actualizar(this.profesor.idProfesor, this.profesor).subscribe({
      next: () => {
        Swal.fire('Actualizado', 'Profesor actualizado', 'success');
        this.router.navigate(['/profesores']);
      },
      error: () => Swal.fire('Error', 'No se pudo actualizar', 'error'),
    });
  }
}
