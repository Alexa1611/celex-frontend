import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { ProfesorDTO } from '../../../dto/celex.dto';
import { ProfesorService } from '../../celex.service';

@Component({
  selector: 'app-lista-profesores',
  imports: [RouterLink],
  templateUrl: './lista-profesores.html',
})
export class ListaProfesores implements OnInit {
  profesores: ProfesorDTO[] = [];

  constructor(
    private service: ProfesorService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.cargar();
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => {
        if (event.urlAfterRedirects === '/profesores') this.cargar();
      });
  }

  cargar(): void {
    this.service.listar().subscribe({
      next: (data) => (this.profesores = data),
      error: () => Swal.fire('Error', 'No se pudo conectar con el API CELEX', 'error'),
    });
  }

  eliminar(id: number | undefined): void {
    if (!id) return;
    const p = this.profesores.find((x) => x.idProfesor === id);
    Swal.fire({
      title: 'Eliminar profesor',
      text: `¿Desea eliminar a ${p?.nombre} ${p?.apellidos}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.eliminar(id).subscribe({
          next: () => {
            Swal.fire('Eliminado', 'Profesor eliminado correctamente', 'success');
            this.cargar();
          },
          error: () => Swal.fire('Error', 'No se pudo eliminar el profesor', 'error'),
        });
      }
    });
  }
}
