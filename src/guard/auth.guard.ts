import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../app/services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  // Si estamos en la ruta de login, no hacemos nada
  if (state.url === '/login' || state.url === '/register') {
    return true;
  }

  // Si no está logueado, redirigir al login
  const isLoggedIn = authService.isLoggedIn();
  if (!isLoggedIn) {
    alert('No tienes permisos, inicia sesión.');
    router.navigate(['/login']);
    return false;
  }

  return true; // Permite el acceso si está autenticado
};
