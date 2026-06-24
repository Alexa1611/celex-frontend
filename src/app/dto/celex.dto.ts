export class AlumnoDTO {
  idAlumno?: number;
  boleta: number | null = null;
  nombre: string = '';
  apellidos: string = '';
  correo: string = '';
}

export class ProfesorDTO {
  idProfesor?: number;
  numEmpleado: string = '';
  nombre: string = '';
  apellidos: string = '';
  idiomaEspecialidad: string = '';
}

export class CursoDTO {
  idCurso?: number;
  idioma: string = '';
  nivel: string = '';
  horario: string = '';
  salon: string = '';
  idProfesor: number | null = null;
  profesorNombre?: string;
}

export class InscripcionDTO {
  idInscripcion?: number;
  fechaInscripcion: string = '';
  periodo: string = '';
  idAlumno: number | null = null;
  idCurso: number | null = null;
  alumnoNombre?: string;
  cursoNombre?: string;
}

export class EvaluacionDTO {
  idEvaluacion?: number;
  calificacionSpeaking: number | null = null;
  calificacionWriting: number | null = null;
  promedioFinal?: number;
  idInscripcion: number | null = null;
}

export class DocumentoDTO {
  idDocumento?: number;
  nombreOriginal?: string;
  tipoContenido?: string;
  tamanoBytes?: number;
  descripcion?: string;
  idInscripcion?: number;
  alumnoNombre?: string;
  cursoNombre?: string;
  fechaSubida?: string;
  urlDescarga?: string;
}
