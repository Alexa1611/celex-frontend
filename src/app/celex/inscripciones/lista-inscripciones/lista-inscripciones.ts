import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { InscripcionDTO } from '../../../dto/celex.dto';
import { InscripcionService } from '../../celex.service';

@Component({
  selector: 'app-lista-inscripciones',
  imports: [RouterLink],
  templateUrl: './lista-inscripciones.html',
})
export class ListaInscripciones implements OnInit {
  inscripciones: InscripcionDTO[] = [];

  constructor(
    private service: InscripcionService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.cargar();
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => {
        if (event.urlAfterRedirects === '/inscripciones') this.cargar();
      });
  }

  cargar(): void {
    this.service.listar().subscribe({
      next: (data) => (this.inscripciones = data),
      error: () => Swal.fire('Error', 'No se pudo conectar con el API CELEX', 'error'),
    });
  }

  eliminar(id: number | undefined): void {
    if (!id) return;
    Swal.fire({
      title: 'Eliminar inscripción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.eliminar(id).subscribe({
          next: () => {
            Swal.fire('Eliminado', 'Inscripción eliminada', 'success');
            this.cargar();
          },
          error: () => Swal.fire('Error', 'No se pudo eliminar', 'error'),
        });
      }
    });
  }
}
