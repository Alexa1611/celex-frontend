import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { DocumentoDTO, InscripcionDTO } from '../../../dto/celex.dto';
import { DocumentoService, InscripcionService } from '../../celex.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-lista-documentos',
  imports: [FormsModule, DatePipe],
  templateUrl: './lista-documentos.html',
})
export class ListaDocumentos implements OnInit {
  documentos: DocumentoDTO[] = [];
  inscripciones: InscripcionDTO[] = [];
  archivoSeleccionado: File | null = null;
  idInscripcion: number | null = null;
  descripcion = '';
  subiendo = false;

  constructor(
    private documentoService: DocumentoService,
    private inscripcionService: InscripcionService,
  ) {}

  ngOnInit(): void {
    this.cargar();
    this.inscripcionService.listar().subscribe({
      next: (data) => (this.inscripciones = data),
    });
  }

  cargar(): void {
    this.documentoService.listar().subscribe({
      next: (data) => (this.documentos = data),
      error: () => Swal.fire('Error', 'No se pudieron cargar los documentos PDF', 'error'),
    });
  }

  onArchivo(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.archivoSeleccionado = input.files?.[0] ?? null;
  }

  subir(): void {
    if (!this.archivoSeleccionado) {
      Swal.fire('Atencion', 'Selecciona un archivo PDF', 'warning');
      return;
    }

    this.subiendo = true;
    this.documentoService
      .subir(this.archivoSeleccionado, this.idInscripcion, this.descripcion)
      .subscribe({
        next: () => {
          Swal.fire('Listo', 'PDF subido correctamente', 'success');
          this.archivoSeleccionado = null;
          this.descripcion = '';
          this.idInscripcion = null;
          this.subiendo = false;
          this.cargar();
        },
        error: (err) => {
          this.subiendo = false;
          const msg = err?.error?.error ?? 'No se pudo subir el PDF';
          Swal.fire('Error', msg, 'error');
        },
      });
  }

  descargar(doc: DocumentoDTO): void {
    if (!doc.idDocumento) return;
    window.open(
      `${environment.apiUrl}/api/v1/documentos/documento/${doc.idDocumento}/descargar`,
      '_blank',
    );
  }

  eliminar(id: number | undefined): void {
    if (!id) return;
    Swal.fire({
      title: 'Eliminar PDF',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.documentoService.eliminar(id).subscribe({
          next: () => {
            Swal.fire('Eliminado', 'Documento eliminado', 'success');
            this.cargar();
          },
          error: () => Swal.fire('Error', 'No se pudo eliminar', 'error'),
        });
      }
    });
  }

  formatearTamano(bytes: number | undefined): string {
    if (!bytes) return '-';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }
}
