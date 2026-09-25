import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  template: `
    <app-navbar></app-navbar>
    <main class="app-content" [class.with-sidebar]="auth.isAuthenticated()">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    .app-content {
      min-height: 100vh;
      padding: 1.5rem;
      box-sizing: border-box;
    }

    .app-content:not(.with-sidebar) {
      min-height: 0;
      padding: 0;
    }

    @media (min-width: 992px) {
      .app-content.with-sidebar {
        margin-left: 276px;
      }
    }

    @media (max-width: 575.98px) {
      .app-content {
        padding: 1rem;
      }
    }
  `]
})
export class AppComponent {
  constructor(public auth: AuthService) {}
}
