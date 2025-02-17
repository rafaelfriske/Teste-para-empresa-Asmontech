import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="app-container">
      <header>
        <h1>{{ title }}</h1>
        <nav>
          <ul>
            <li>
              <a routerLink="/client" routerLinkActive="active">Cliente</a>
            </li>
            <li>
              <a routerLink="/kitchen" routerLinkActive="active">Cozinha</a>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .app-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }

    header {
      background-color: #3f51b5;
      color: white;
      padding: 1rem;
      border-radius: 4px;
      margin-bottom: 20px;
    }

    h1 {
      text-align: center;
      margin-bottom: 1rem;
    }

    nav ul {
      list-style: none;
      padding: 0;
      display: flex;
      gap: 20px;
      justify-content: center;
    }

    nav a {
      color: white;
      text-decoration: none;
      font-weight: bold;
      padding: 5px 10px;
      border-radius: 4px;
      transition: background-color 0.3s;
    }

    nav a:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }

    nav a.active {
      background-color: rgba(255, 255, 255, 0.2);
    }

    main {
      background-color: #f5f5f5;
      padding: 20px;
      border-radius: 4px;
      min-height: 300px;
    }
  `]
})
export class AppComponent {
  title = 'Sistema de Pedidos';
}