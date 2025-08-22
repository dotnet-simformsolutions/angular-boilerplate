import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatListModule,
    MatIconModule
  ],
  template: `
    <mat-nav-list>
      <a mat-list-item routerLink="/dashboard" routerLinkActive="active">
        <mat-icon>dashboard</mat-icon>
        <span>Dashboard</span>
      </a>
      <a mat-list-item routerLink="/settings" routerLinkActive="active">
        <mat-icon>settings</mat-icon>
        <span>Settings</span>
      </a>
      <a mat-list-item routerLink="/auth/login" routerLinkActive="active">
        <mat-icon>login</mat-icon>
        <span>Login</span>
      </a>
      <a mat-list-item routerLink="/auth/register" routerLinkActive="active">
        <mat-icon>person_add</mat-icon>
        <span>Register</span>
      </a>
    </mat-nav-list>
  `,
  styles: [`
    .active {
      background-color: rgba(0, 0, 0, 0.1);
    }
  `]
})
export class SidebarComponent {} 