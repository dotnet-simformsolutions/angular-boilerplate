import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule
  ],
  template: `
    <div class="app-container">
      <header class="app-header">
        <h1>Angular Boilerplate</h1>
        <nav>
          <a routerLink="/dashboard">Dashboard</a>
          <a routerLink="/settings">Settings</a>
          <a routerLink="/auth/login">Login</a>
          <a routerLink="/auth/register">Register</a>
        </nav>
      </header>
      <main class="app-main">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .app-container {
      height: 100vh;
      display: flex;
      flex-direction: column;
    }

    .app-header {
      background-color: #3f51b5;
      color: white;
      padding: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .app-header nav a {
      color: white;
      text-decoration: none;
      margin-left: 1rem;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      transition: background-color 0.3s;
    }

    .app-header nav a:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }

    .app-main {
      flex: 1;
      padding: 2rem;
      background-color: #fafafa;
    }
  `]
})
export class AppComponent {} 