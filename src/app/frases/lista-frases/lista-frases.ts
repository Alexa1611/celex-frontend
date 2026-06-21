import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { FraseDTO } from '../../dto/frase.dto';
import { FrasesService } from '../frases.service';

@Component({
  selector: 'app-lista-frases',
  imports: [RouterLink],
  templateUrl: './lista-frases.html',
  styleUrl: './lista-frases.css',
})
export class ListaFrases implements OnInit {
  frases: FraseDTO[] = [];

  constructor(
    private service: FrasesService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.listarFrases();

    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => {
        if (event.urlAfterRedirects === '/frases') {
          this.listarFrases();
        }
      });
  }

  listarFrases(): void {
    this.service.listarFrases().subscribe((evto) => {
      this.frases = evto;
    });
  }

  eliminar(id: number): void {
    const frase = this.frases.find((f) => f.id === id);

    Swal.fire({
      title: 'Eliminar Frase',
      text: `¿Desea eliminar la frase "${frase?.texto}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.eliminarFrase(id).subscribe((evto) => {
          Swal.fire(
            'Eliminar Frase',
            `La frase ${evto?.texto ?? ''} se eliminó satisfactoriamente`,
            'info',
          );
          this.listarFrases();
        });
      }
    });
  }
}
