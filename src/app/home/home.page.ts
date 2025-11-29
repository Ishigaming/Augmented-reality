import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false
})
export class HomePage implements OnInit {
  
  // Bandera para controlar la renderización de la escena AR
  arReady: boolean = false; 

  constructor() {}

  ngOnInit() {
    // Retrasamos la carga de la escena AR para dar tiempo a que Angular/Ionic se inicialicen.
    // Esto previene fallos de la cámara o pantalla negra al inicio.
    setTimeout(() => {
      this.arReady = true;
      console.log("AR Scene is Ready.");
    }, 1000); // 1000ms (1 segundo) de retraso
  }
}