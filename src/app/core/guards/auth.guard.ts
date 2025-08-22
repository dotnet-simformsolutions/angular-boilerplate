import { Injectable } from '@angular/core';
import { CanActivateFn } from '@angular/router';

export const AuthGuard: CanActivateFn = () => {
  // TODO: Implement real auth check
  return true;
}; 