import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators'; // Importar catchError para manejar errores

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLogged = false;
  private baseUrl = 'https://aes-backend-2qer.onrender.com/api/auth'; // Asegúrate de agregar el https://

  constructor(private http: HttpClient, private router: Router) {}

  // Verificar si el usuario está autenticado
  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token; // Si existe el token, devuelve true
  }

  // Iniciar sesión
  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { username, password }).pipe(
      catchError((error) => {
        console.error('Error en el login:', error);
        return of(null); // Retorna null si hay un error
      })
    );
  }

  // Registrar un nuevo usuario
  register(username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, { username, password }).pipe(
      catchError((error) => {
        console.error('Error en el registro:', error);
        return of(null); // Retorna null si hay un error
      })
    );
  }

  // Cerrar sesión
  logout(): void {
    localStorage.removeItem('token'); // Eliminar token del almacenamiento
    this.router.navigate(['/login']); // Redirigir a login
  }

  // Método para guardar el token en localStorage
  setToken(token: string): void {
    localStorage.setItem('token', token);
    this.isLogged = true;
  }

  // Método para obtener el token
  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
