import { HttpInterceptorFn } from '@angular/common/http';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  // TODO: Handle HTTP errors globally
  return next(req);
}; 