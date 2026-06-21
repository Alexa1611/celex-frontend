import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { EvaluacionDTO } from '../../../dto/celex.dto';
import { EvaluacionService } from '../../celex.service';

@Component({
  selector: 'app-lista-evaluaciones',
  imports: [RouterLink],
  templateUrl: './lista-evaluaciones.html',
})
export class ListaEvaluaciones implements OnInit {
  evaluaciones: EvaluacionDTO[] = [];

  constructor(
    private service: EvaluacionService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.cargar();
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => {
        if (event.urlAfterRedirects === '/evaluaciones') this.cargar();
      });
  }

  cargar(): void {
    this.service.listar().subscribe({
      next: (data) => (this.evaluaciones = data),
      error: () => Swal.fire('Error', 'No se pudo conectar con el API CELEX', 'error'),
    });
  }

  eliminar(id: number | undefined): void {
    if (!id) return;
    Swal.fire({
      title: 'Eliminar evaluación',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.eliminar(id).subscribe({
          next: () => {
            Swal.fire('Eliminado', 'Evaluación eliminada', 'success');
            this.cargar();
          },
          error: () => Swal.fire('Error', 'No se pudo eliminar', 'error'),
        });
      }
    });
  }
}
