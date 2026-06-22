import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { AlumnoDTO } from '../../../dto/celex.dto';
import { AlumnoService } from '../../celex.service';

@Component({
  selector: 'app-lista-alumnos',
  imports: [RouterLink],
  templateUrl: './lista-alumnos.html',
})
export class ListaAlumnos implements OnInit {
  alumnos: AlumnoDTO[] = [];
  cargando = false;
  errorApi = false;

  constructor(
    private service: AlumnoService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.cargar();

    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => {
        if (event.urlAfterRedirects === '/alumnos') {
          this.cargar();
        }
      });
  }

  cargar(): void {
    this.cargando = true;
    this.errorApi = false;
    this.service.listar().subscribe({
      next: (data) => {
        this.alumnos = data;
        this.cargando = false;
      },
      error: () => {
        this.cargando = false;
        this.errorApi = true;
        this.alumnos = [];
      },
    });
  }

  despertarApi(): void {
    window.open('https://celex-api.onrender.com/swagger-ui.html', '_blank');
  }

  eliminar(id: number | undefined): void {
    if (!id) return;
    const alumno = this.alumnos.find((a) => a.idAlumno === id);

    Swal.fire({
      title: 'Eliminar alumno',
      text: `¿Desea eliminar a ${alumno?.nombre} ${alumno?.apellidos}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.eliminar(id).subscribe({
          next: () => {
            Swal.fire('Eliminado', 'Alumno eliminado correctamente', 'success');
            this.cargar();
          },
          error: () => Swal.fire('Error', 'No se pudo eliminar el alumno', 'error'),
        });
      }
    });
  }
}
