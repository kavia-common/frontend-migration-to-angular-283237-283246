import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment as builtEnvironment } from '../../../environments/environment';
import { ENVIRONMENT, EnvShape } from '../../core/environment.token';

/**
 * PUBLIC_INTERFACE
 * ApiService provides helper methods to interact with a backend API.
 * It prepends environment.apiBase (or backendUrl) to relative paths and sets JSON headers by default.
 */
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly env: EnvShape;
  private readonly apiBase: string;

  private jsonHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json',
  });

  constructor(
    private http: HttpClient,
    @Optional() @Inject(ENVIRONMENT) injectedEnv?: EnvShape
  ) {
    // Prefer injected ENVIRONMENT (will use process.env on SSR),
    // fallback to built environment as a safety net.
    this.env = injectedEnv ?? builtEnvironment;
    this.apiBase = this.env.apiBase || this.env.backendUrl || '';
  }

  /**
   * PUBLIC_INTERFACE
   * Performs a GET request to the API.
   * @param path Path relative to apiBase, or full URL
   * @param params Optional query params
   */
  get<T>(path: string, params?: Record<string, string | number | boolean | readonly (string | number | boolean)[]>): Observable<T> {
    const url = this.resolveUrl(path);
    const httpParams = this.buildParams(params);
    return this.http.get<T>(url, { headers: this.jsonHeaders, params: httpParams }).pipe(catchError(this.handleError));
  }

  /**
   * PUBLIC_INTERFACE
   * Performs a POST request to the API.
   * @param path Path relative to apiBase, or full URL
   * @param body Request payload
   */
  post<T>(path: string, body: unknown): Observable<T> {
    const url = this.resolveUrl(path);
    return this.http.post<T>(url, body, { headers: this.jsonHeaders }).pipe(catchError(this.handleError));
  }

  /**
   * PUBLIC_INTERFACE
   * Performs a PUT request to the API.
   * @param path Path relative to apiBase, or full URL
   * @param body Request payload
   */
  put<T>(path: string, body: unknown): Observable<T> {
    const url = this.resolveUrl(path);
    return this.http.put<T>(url, body, { headers: this.jsonHeaders }).pipe(catchError(this.handleError));
  }

  /**
   * PUBLIC_INTERFACE
   * Performs a DELETE request to the API.
   * @param path Path relative to apiBase, or full URL
   * @param params Optional query params
   */
  delete<T>(path: string, params?: Record<string, string | number | boolean | readonly (string | number | boolean)[]>): Observable<T> {
    const url = this.resolveUrl(path);
    const httpParams = this.buildParams(params);
    return this.http.delete<T>(url, { headers: this.jsonHeaders, params: httpParams }).pipe(catchError(this.handleError));
  }

  private resolveUrl(path: string): string {
    if (!path) return this.apiBase;
    // absolute URL passthrough
    if (/^https?:\/\//i.test(path)) return path;
    // ensure single slash join
    const base = this.apiBase.replace(/\/+$/, '');
    const rel = path.replace(/^\/+/, '');
    return `${base}/${rel}`;
  }

  private buildParams(params: Record<string, any> | undefined): HttpParams | undefined {
    if (!params) return undefined;
    let httpParams = new HttpParams();
    Object.entries(params).forEach(([k, v]) => {
      if (Array.isArray(v)) {
        v.forEach((item) => (httpParams = httpParams.append(k, String(item))));
      } else if (v !== undefined && v !== null) {
        httpParams = httpParams.set(k, String(v));
      }
    });
    return httpParams;
  }

  private handleError(err: HttpErrorResponse) {
    // Basic passthrough; can be extended later
    return throwError(() => err);
  }
}
