import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CryptoService {
  // Actualiza esta URL con la URL de tu backend desplegado en Vercel
  private baseUrl = 'https://aes-backend-seven.vercel.app/api/crypto'; 

  constructor(private http: HttpClient) {}

  // Método para encriptar texto
  encrypt(text: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/encrypt`, { text });
  }

  // Método para desencriptar texto
  decrypt(encrypted: string, iv: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/decrypt`, { encrypted, ivHex: iv });
  }
}
