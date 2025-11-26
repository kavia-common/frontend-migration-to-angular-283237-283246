import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';

/**
 * PUBLIC_INTERFACE
 * authInterceptor is a no-op HTTP interceptor scaffold.
 * It currently forwards requests unchanged. This file centralizes
 * future authentication concerns (e.g., adding Authorization headers,
 * CSRF tokens, custom tenant headers) once requirements are defined.
 *
 * Usage notes and future extension points:
 * - To add a bearer token:
 *   const token = /* get from an injected AuthService or ENVIRONMENT * / '';
 *   if (token) {
 *     req = req.clone({ setHeaders: { Authorization: `Bearer ${token}` }});
 *   }
 *
 * - To add custom headers based on environment flags, inject ENVIRONMENT
 *   from core/environment.token and conditionally set headers.
 *
 * - To skip certain domains/paths, check req.url and early-return next(req).
 */
export const authInterceptor: HttpInterceptorFn = (initialReq: HttpRequest<unknown>, next: HttpHandlerFn) => {
  // Example injection for future use:
  // const env = inject(ENVIRONMENT); // from '../environment.token'
  // const authService = inject(AuthService); // hypothetical future service

  // No-op: do not alter the request by default.
  const req = initialReq;

  return next(req);
};
