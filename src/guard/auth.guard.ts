import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../app/services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    const authService = inject(AuthService); // Inyecta el servicio correctamente
    const isLoggedIn = authService.isLoggedIn(); // Llama al método de instancia
    if (!isLoggedIn) {
        alert("No tienes permisos, logeate");
        router.navigate(['/login']); // Redirige si no está autenticado
        return false;
    }
    return true; // Permite el acceso si está autenticado
};

