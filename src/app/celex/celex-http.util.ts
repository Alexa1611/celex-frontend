import { Observable, retry, timer, timeout } from 'rxjs';
import { environment } from '../../environments/environment';

/** Reintentos para Render free (el backend tarda en despertar). */
export function cloudRequest<T>(request: Observable<T>): Observable<T> {
  if (!environment.production) {
    return request;
  }

  return request.pipe(
    timeout(180000),
    retry({ count: 5, delay: () => timer(20000) }),
  );
}
