import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router'; // Importa Router para redirigir

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLogged = false; // Estado interno de autenticación
  private baseUrl = 'http://localhost:8080/api/auth'; // Base URL del backend

  constructor(private http: HttpClient,private router: Router) {}

  // Método para verificar si el usuario está autenticado (basado en el token)
  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token; // Devuelve true si el token existe
  }

  // Método para iniciar sesión (POST al backend)
  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { username, password });
  }

  // Método para registrar un nuevo usuario (POST al backend)
  register(username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, { username, password });
  }

  // Método para cerrar sesión (remover token y cambiar estado)
  logout(): void {
    localStorage.removeItem('token'); // Eliminar el token del almacenamiento local
    this.isLogged = false; // Cambiar el estado interno
    this.router.navigate(['/login']); // Redirigir a la página de login
  }
}
