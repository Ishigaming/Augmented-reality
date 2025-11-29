import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ARTargetService, ARTarget } from '../../services/ar-target';
import { AuthService } from '../../services/auth.service';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-ar-view',
  templateUrl: './ar-view.component.html',
  styleUrls: ['./ar-view.component.scss'],
  standalone: false,
})
export class ArViewComponent implements OnInit, AfterViewInit, OnDestroy {
  arTargets: ARTarget[] = [];   
  currentUserId: string | null = null;
  isLoading = true;             
  loadError: string | null = null; 

  private detected = false;
  private intervalId: any;

  constructor(
    private arTargetService: ARTargetService,
    private authService: AuthService,
    private supabaseService: SupabaseService
  ) {}

  async ngOnInit() {
    const user = this.authService.getCurrentUser();
    this.currentUserId = user ? user.uid : null;

    if (!this.currentUserId) {
      this.loadError = 'No se encontró usuario autenticado.';
      this.isLoading = false;
      return;
    }

    try {
      this.arTargets = await this.arTargetService.getTargets(this.currentUserId);
      console.log('Targets cargados:', this.arTargets);

      for (const target of this.arTargets) {
        if (target.type === 'nft' && target.nfturlbase) {
          console.log(`Verificando descriptores NFT para: ${target.name}`);
          await this.supabaseService.verifyNftDescriptors(target.nfturlbase);
        }
      }
    } catch (err) {
      console.error('Error cargando targets:', err);
      this.loadError = 'Error cargando targets';
    } finally {
      this.isLoading = false;
    }
  }

  ngAfterViewInit() {
    this.intervalId = setInterval(() => {
      if (!this.detected) {
        console.log('No hemos detectado ninguna imagen');
      }
    }, 5000);

    const sceneEl = document.querySelector('a-scene');
    if (sceneEl) {
      sceneEl.addEventListener('markerFound', () => {
        this.detected = true;
        console.log('Imagen detectada');
      });
      sceneEl.addEventListener('markerLost', () => {
        this.detected = false;
        console.log('Imagen perdida');
      });
    }
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  identifyTarget(index: number, target: ARTarget): string { 
    return target.id;
  }

  calculateWidth(target: ARTarget): string { 
    if (target.width) {
      return target.width;
    }
    if (target.scale) {
      const parts = target.scale.split(' ');
      return parts[0] || '20';
    }
    return '20';
  }

  calculateHeight(target: ARTarget): string {
    if (target.height) {
      return target.height;
    }
    if (target.scale) {
      const parts = target.scale.split(' ');
      return parts[1] || '30';
    }
    return '30';
  }
}
