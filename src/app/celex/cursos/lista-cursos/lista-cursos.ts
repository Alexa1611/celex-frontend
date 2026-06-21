import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { CursoDTO } from '../../../dto/celex.dto';
import { CursoService } from '../../celex.service';

@Component({
  selector: 'app-lista-cursos',
  imports: [RouterLink],
  templateUrl: './lista-cursos.html',
})
export class ListaCursos implements OnInit {
  cursos: CursoDTO[] = [];

  constructor(
    private service: CursoService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.cargar();
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => {
        if (event.urlAfterRedirects === '/cursos') this.cargar();
      });
  }

  cargar(): void {
    this.service.listar().subscribe({
      next: (data) => (this.cursos = data),
      error: () => Swal.fire('Error', 'No se pudo conectar con el API CELEX', 'error'),
    });
  }

  eliminar(id: number | undefined): void {
    if (!id) return;
    Swal.fire({
      title: 'Eliminar curso',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.eliminar(id).subscribe({
          next: () => {
            Swal.fire('Eliminado', 'Curso eliminado', 'success');
            this.cargar();
          },
          error: () => Swal.fire('Error', 'No se pudo eliminar', 'error'),
        });
      }
    });
  }
}
