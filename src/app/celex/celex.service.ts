import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { cloudRequest } from './celex-http.util';
import {
  AlumnoDTO,
  CursoDTO,
  EvaluacionDTO,
  InscripcionDTO,
  ProfesorDTO,
} from '../dto/celex.dto';

@Injectable({ providedIn: 'root' })
export class AlumnoService {
  private readonly url = `${environment.apiUrl}/api/v1/alumnos/alumno`;

  constructor(private http: HttpClient) {}

  listar(): Observable<AlumnoDTO[]> {
    return cloudRequest(this.http.get<AlumnoDTO[]>(this.url));
  }

  obtener(id: number): Observable<AlumnoDTO> {
    return cloudRequest(this.http.get<AlumnoDTO>(`${this.url}/${id}`));
  }

  registrar(dto: AlumnoDTO): Observable<AlumnoDTO> {
    return cloudRequest(this.http.post<AlumnoDTO>(this.url, dto));
  }

  actualizar(id: number, dto: AlumnoDTO): Observable<AlumnoDTO> {
    return cloudRequest(this.http.put<AlumnoDTO>(`${this.url}/${id}`, dto));
  }

  eliminar(id: number): Observable<void> {
    return cloudRequest(this.http.delete<void>(`${this.url}/${id}`));
  }
}

@Injectable({ providedIn: 'root' })
export class ProfesorService {
  private readonly url = `${environment.apiUrl}/api/v1/profesores/profesor`;

  constructor(private http: HttpClient) {}

  listar(): Observable<ProfesorDTO[]> {
    return cloudRequest(this.http.get<ProfesorDTO[]>(this.url));
  }

  obtener(id: number): Observable<ProfesorDTO> {
    return cloudRequest(this.http.get<ProfesorDTO>(`${this.url}/${id}`));
  }

  registrar(dto: ProfesorDTO): Observable<ProfesorDTO> {
    return cloudRequest(this.http.post<ProfesorDTO>(this.url, dto));
  }

  actualizar(id: number, dto: ProfesorDTO): Observable<ProfesorDTO> {
    return cloudRequest(this.http.put<ProfesorDTO>(`${this.url}/${id}`, dto));
  }

  eliminar(id: number): Observable<void> {
    return cloudRequest(this.http.delete<void>(`${this.url}/${id}`));
  }
}

@Injectable({ providedIn: 'root' })
export class CursoService {
  private readonly url = `${environment.apiUrl}/api/v1/cursos/curso`;

  constructor(private http: HttpClient) {}

  listar(): Observable<CursoDTO[]> {
    return cloudRequest(this.http.get<CursoDTO[]>(this.url));
  }

  obtener(id: number): Observable<CursoDTO> {
    return cloudRequest(this.http.get<CursoDTO>(`${this.url}/${id}`));
  }

  registrar(dto: CursoDTO): Observable<CursoDTO> {
    return cloudRequest(this.http.post<CursoDTO>(this.url, dto));
  }

  actualizar(id: number, dto: CursoDTO): Observable<CursoDTO> {
    return cloudRequest(this.http.put<CursoDTO>(`${this.url}/${id}`, dto));
  }

  eliminar(id: number): Observable<void> {
    return cloudRequest(this.http.delete<void>(`${this.url}/${id}`));
  }
}

@Injectable({ providedIn: 'root' })
export class InscripcionService {
  private readonly url = `${environment.apiUrl}/api/v1/inscripciones/inscripcion`;

  constructor(private http: HttpClient) {}

  listar(): Observable<InscripcionDTO[]> {
    return cloudRequest(this.http.get<InscripcionDTO[]>(this.url));
  }

  obtener(id: number): Observable<InscripcionDTO> {
    return cloudRequest(this.http.get<InscripcionDTO>(`${this.url}/${id}`));
  }

  registrar(dto: InscripcionDTO): Observable<InscripcionDTO> {
    return cloudRequest(this.http.post<InscripcionDTO>(this.url, dto));
  }

  actualizar(id: number, dto: InscripcionDTO): Observable<InscripcionDTO> {
    return cloudRequest(this.http.put<InscripcionDTO>(`${this.url}/${id}`, dto));
  }

  eliminar(id: number): Observable<void> {
    return cloudRequest(this.http.delete<void>(`${this.url}/${id}`));
  }
}

@Injectable({ providedIn: 'root' })
export class EvaluacionService {
  private readonly url = `${environment.apiUrl}/api/v1/evaluaciones/evaluacion`;

  constructor(private http: HttpClient) {}

  listar(): Observable<EvaluacionDTO[]> {
    return cloudRequest(this.http.get<EvaluacionDTO[]>(this.url));
  }

  obtener(id: number): Observable<EvaluacionDTO> {
    return cloudRequest(this.http.get<EvaluacionDTO>(`${this.url}/${id}`));
  }

  registrar(dto: EvaluacionDTO): Observable<EvaluacionDTO> {
    return cloudRequest(this.http.post<EvaluacionDTO>(this.url, dto));
  }

  actualizar(id: number, dto: EvaluacionDTO): Observable<EvaluacionDTO> {
    return cloudRequest(this.http.put<EvaluacionDTO>(`${this.url}/${id}`, dto));
  }

  eliminar(id: number): Observable<void> {
    return cloudRequest(this.http.delete<void>(`${this.url}/${id}`));
  }
}
