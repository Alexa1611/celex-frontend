import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FraseDTO, FraseRegistroDTO } from '../dto/frase.dto';
import { FraseMapper } from '../mapper/frase.mapper';
import { Frase } from '../model/frase';

@Injectable({ providedIn: 'root' })
export class FrasesService {
  private frases: Frase[] = [
    {
      id: 1,
      autor: 'Yo',
      texto: 'Yo solo se que no sé Java, y ni de eso estoy seguro',
    },
    { id: 2, autor: 'Frase 2', texto: 'Frase 2' },
    { id: 3, autor: 'Frase 3', texto: 'Frase 3' },
    { id: 4, autor: 'Frase 4', texto: 'Frase 4' },
  ];
  private nextId = 5;

  listarFrases(): Observable<FraseDTO[]> {
    return of(FraseMapper.toDTOList(this.frases));
  }

  getFrase(id: number): FraseDTO | undefined {
    const frase = this.frases.find((f) => f.id === id);
    return frase ? FraseMapper.toDTO(frase) : undefined;
  }

  registrarFrase(fraseRegistroDTO: FraseRegistroDTO): Observable<FraseDTO> {
    const nuevaFrase = FraseMapper.fromRegistroDTO(fraseRegistroDTO, this.nextId++);
    this.frases.push(nuevaFrase);
    return of(FraseMapper.toDTO(nuevaFrase));
  }

  actualizarFrase(laFrase: FraseDTO): Observable<FraseDTO> {
    const frase = FraseMapper.fromDTO(laFrase);
    const index = this.frases.findIndex((f) => f.id === frase.id);
    if (index !== -1) {
      this.frases[index] = frase;
    }
    return of(FraseMapper.toDTO(frase));
  }

  eliminarFrase(id: number): Observable<FraseDTO | null> {
    const fraseEliminada = this.frases.find((f) => f.id === id) ?? null;
    this.frases = this.frases.filter((f) => f.id !== id);
    return of(fraseEliminada ? FraseMapper.toDTO(fraseEliminada) : null);
  }
}
