import { Component } from '@angular/core';
import { CryptoService } from '../../services/crypto.service';

@Component({
  selector: 'app-decrypt',
  templateUrl: './decrypt.component.html',
  styleUrls: ['./decrypt.component.css'],
})
export class DecryptComponent {
  encrypted = '';  // Texto encriptado
  iv = '';          // IV (vector de inicialización)
  result = '';      // Resultado del texto desencriptado
  errorMessage = ''; // Mensaje de error

  constructor(private cryptoService: CryptoService) {}

  decrypt() {
    // Llamada al servicio de desencriptación
    this.cryptoService.decrypt(this.encrypted, this.iv).subscribe({
      next: (res) => {
        // Asigna el texto desencriptado a 'result' y limpia el mensaje de error
        this.result = `${res.decrypted}`;
        this.errorMessage = ''; // Si la desencriptación es exitosa, no hay error
      },
      error: (err) => {
        // Si ocurre un error, muestra el mensaje de error
        this.errorMessage = 'El texto encriptado o el IV que ingresaste no son correctos. Por favor, verifica ambos y vuelve a intentarlo.';
        console.error('Decryption failed', err);
        this.result = ''; // Limpiar el resultado si hay un error
      },
    });
  }

  GoToEncrypt() {
    // Redirige a la página de encriptación
    window.location.href = '/encrypt';
  }
  logout() {
    // Reemplaza el historial actual, evitando que el usuario regrese a la página anterior
    window.history.replaceState(null, '', '/login');
  
    // Redirige a la página de login
    window.location.href = '/login';
    window.location.replace('/login');

  }
  
}
