import { HttpInterceptorFn } from '@angular/common/http';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  // TODO: Show/hide loading spinner
  return next(req);
}; 