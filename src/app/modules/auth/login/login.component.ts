import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: `
    <div class="login-container">
      <div class="login-card">
        <h2>Login</h2>
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="email">Email</label>
            <input 
              id="email"
              type="email" 
              formControlName="email" 
              placeholder="Enter your email"
              class="form-control"
              [class.error]="isFieldInvalid('email')"
            />
            <div class="error-message" *ngIf="isFieldInvalid('email')">
              <span *ngIf="loginForm.get('email')?.errors?.['required']">Email is required</span>
              <span *ngIf="loginForm.get('email')?.errors?.['email']">Please enter a valid email</span>
            </div>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input 
              id="password"
              type="password" 
              formControlName="password" 
              placeholder="Enter your password"
              class="form-control"
              [class.error]="isFieldInvalid('password')"
            />
            <div class="error-message" *ngIf="isFieldInvalid('password')">
              <span *ngIf="loginForm.get('password')?.errors?.['required']">Password is required</span>
            </div>
          </div>
          
          <button 
            type="submit" 
            [disabled]="loginForm.invalid || isSubmitting" 
            class="btn btn-primary"
            [class.loading]="isSubmitting"
          >
            {{ isSubmitting ? 'Logging in...' : 'Login' }}
          </button>

          <div class="success-message" *ngIf="loginSuccess">
            {{ successMessage }}
          </div>

          <div class="error-message" *ngIf="loginError">
            {{ loginError }}
          </div>

          <div class="debug-info">
            <small>Form Valid: {{ loginForm.valid }} | Email: {{ loginForm.get('email')?.value }} | Password: {{ loginForm.get('password')?.value }}</small>
          </div>

          <div class="help-text">
            <small>💡 Use registered credentials or try: test&#64;example.com / password123</small>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 60vh;
    }

    .login-card {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      width: 100%;
      max-width: 400px;
    }

    .form-group {
      margin-bottom: 1rem;
    }

    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
    }

    .form-control {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
      transition: border-color 0.3s;
    }

    .form-control:focus {
      outline: none;
      border-color: #3f51b5;
      box-shadow: 0 0 0 2px rgba(63, 81, 181, 0.2);
    }

    .form-control.error {
      border-color: #f44336;
    }

    .error-message {
      color: #f44336;
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }

    .success-message {
      color: #4caf50;
      font-size: 0.875rem;
      margin-top: 1rem;
      text-align: center;
      padding: 0.5rem;
      background-color: #e8f5e8;
      border-radius: 4px;
    }

    .debug-info {
      margin-top: 1rem;
      padding: 0.5rem;
      background-color: #f5f5f5;
      border-radius: 4px;
      font-size: 0.75rem;
      color: #666;
    }

    .help-text {
      margin-top: 1rem;
      text-align: center;
      color: #666;
      font-size: 0.875rem;
    }

    .btn {
      width: 100%;
      padding: 0.75rem;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
      margin-top: 1rem;
      transition: all 0.3s;
    }

    .btn-primary {
      background-color: #3f51b5;
      color: white;
    }

    .btn-primary:hover:not(:disabled) {
      background-color: #303f9f;
    }

    .btn-primary:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }

    .btn.loading {
      opacity: 0.7;
    }
  `]
})
export class LoginComponent {
  loginForm: FormGroup;
  isSubmitting = false;
  loginSuccess = false;
  loginError = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isSubmitting = true;
      this.loginError = '';
      this.loginSuccess = false;
      
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;
      
      console.log('Attempting to login:', { email, password });
      
      this.authService.login(email, password).then(result => {
        console.log('Login result:', result);
        
        if (result.success) {
          this.loginSuccess = true;
          this.successMessage = result.message;
          this.loginError = '';
          
          // Navigate to user list page after successful login
          setTimeout(() => {
            this.router.navigate(['/auth/users']);
          }, 1500);
        } else {
          this.loginError = result.message;
          this.loginSuccess = false;
        }
        
        this.isSubmitting = false;
      });
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.loginForm.controls).forEach(key => {
        const control = this.loginForm.get(key);
        control?.markAsTouched();
      });
    }
  }
} 