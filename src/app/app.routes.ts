import { Routes } from '@angular/router';
import { Home } from './home/home';
import { ListaAlumnos } from './celex/alumnos/lista-alumnos/lista-alumnos';
import { AlumnoForm } from './celex/alumnos/alumno-form/alumno-form';
import { ListaProfesores } from './celex/profesores/lista-profesores/lista-profesores';
import { ProfesorForm } from './celex/profesores/profesor-form/profesor-form';
import { ListaCursos } from './celex/cursos/lista-cursos/lista-cursos';
import { CursoForm } from './celex/cursos/curso-form/curso-form';
import { ListaInscripciones } from './celex/inscripciones/lista-inscripciones/lista-inscripciones';
import { InscripcionForm } from './celex/inscripciones/inscripcion-form/inscripcion-form';
import { ListaEvaluaciones } from './celex/evaluaciones/lista-evaluaciones/lista-evaluaciones';
import { EvaluacionForm } from './celex/evaluaciones/evaluacion-form/evaluacion-form';
import { ListaDocumentos } from './celex/documentos/lista-documentos/lista-documentos';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'alumnos', component: ListaAlumnos },
  { path: 'alumnoForm', component: AlumnoForm },
  { path: 'alumnoForm/:id', component: AlumnoForm },
  { path: 'profesores', component: ListaProfesores },
  { path: 'profesorForm', component: ProfesorForm },
  { path: 'profesorForm/:id', component: ProfesorForm },
  { path: 'cursos', component: ListaCursos },
  { path: 'cursoForm', component: CursoForm },
  { path: 'cursoForm/:id', component: CursoForm },
  { path: 'inscripciones', component: ListaInscripciones },
  { path: 'inscripcionForm', component: InscripcionForm },
  { path: 'inscripcionForm/:id', component: InscripcionForm },
  { path: 'evaluaciones', component: ListaEvaluaciones },
  { path: 'evaluacionForm', component: EvaluacionForm },
  { path: 'evaluacionForm/:id', component: EvaluacionForm },
  { path: 'documentos', component: ListaDocumentos },
  { path: '**', redirectTo: 'home' },
];
