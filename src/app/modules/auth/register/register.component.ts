import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: `
    <div class="register-container">
      <div class="register-card">
        <h2>Register</h2>
        <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
          <div class="form-row">
            <div class="form-group">
              <label for="firstName">First Name</label>
              <input 
                id="firstName"
                type="text" 
                formControlName="firstName" 
                placeholder="Enter your first name"
                class="form-control"
                [class.error]="isFieldInvalid('firstName')"
              />
              <div class="error-message" *ngIf="isFieldInvalid('firstName')">
                <span *ngIf="registerForm.get('firstName')?.errors?.['required']">First name is required</span>
                <span *ngIf="registerForm.get('firstName')?.errors?.['minlength']">First name must be at least 2 characters</span>
              </div>
            </div>
            <div class="form-group">
              <label for="lastName">Last Name</label>
              <input 
                id="lastName"
                type="text" 
                formControlName="lastName" 
                placeholder="Enter your last name"
                class="form-control"
                [class.error]="isFieldInvalid('lastName')"
              />
              <div class="error-message" *ngIf="isFieldInvalid('lastName')">
                <span *ngIf="registerForm.get('lastName')?.errors?.['required']">Last name is required</span>
                <span *ngIf="registerForm.get('lastName')?.errors?.['minlength']">Last name must be at least 2 characters</span>
              </div>
            </div>
          </div>
          
          <div class="form-group">
            <label for="mobile">Mobile Number</label>
            <input 
              id="mobile"
              type="tel" 
              formControlName="mobile" 
              placeholder="Enter your mobile number"
              class="form-control"
              [class.error]="isFieldInvalid('mobile')"
            />
            <div class="error-message" *ngIf="isFieldInvalid('mobile')">
              <span *ngIf="registerForm.get('mobile')?.errors?.['required']">Mobile number is required</span>
              <span *ngIf="registerForm.get('mobile')?.errors?.['pattern']">Please enter a valid mobile number</span>
            </div>
          </div>

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
              <span *ngIf="registerForm.get('email')?.errors?.['required']">Email is required</span>
              <span *ngIf="registerForm.get('email')?.errors?.['email']">Please enter a valid email</span>
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
              <span *ngIf="registerForm.get('password')?.errors?.['required']">Password is required</span>
              <span *ngIf="registerForm.get('password')?.errors?.['minlength']">Password must be at least 6 characters</span>
            </div>
          </div>
          <div class="form-group">
            <label for="confirmPassword">Confirm Password</label>
            <input 
              id="confirmPassword"
              type="password" 
              formControlName="confirmPassword" 
              placeholder="Confirm your password"
              class="form-control"
              [class.error]="isFieldInvalid('confirmPassword')"
            />
            <div class="error-message" *ngIf="isFieldInvalid('confirmPassword')">
              <span *ngIf="registerForm.get('confirmPassword')?.errors?.['required']">Confirm password is required</span>
            </div>
          </div>
          
          <div class="form-group" *ngIf="!passwordsMatch() && registerForm.get('confirmPassword')?.value">
            <div class="error-message">Passwords do not match</div>
          </div>

          <button 
            type="submit" 
            [disabled]="registerForm.invalid || !passwordsMatch() || isSubmitting" 
            class="btn btn-primary"
            [class.loading]="isSubmitting"
          >
            {{ isSubmitting ? 'Registering...' : 'Register' }}
          </button>

          <div class="success-message" *ngIf="registrationSuccess">
            {{ successMessage }}
          </div>

          <div class="error-message" *ngIf="registrationError">
            {{ registrationError }}
          </div>

          <div class="debug-info">
            <small>Form Valid: {{ registerForm.valid }} | Passwords Match: {{ passwordsMatch() }}</small>
          </div>

          <div class="help-text">
            <small>💡 After registration, you can use these credentials to login!</small>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .register-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 60vh;
    }

    .register-card {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      width: 100%;
      max-width: 500px;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
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

    @media (max-width: 768px) {
      .form-row {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class RegisterComponent {
  registerForm: FormGroup;
  isSubmitting = false;
  registrationSuccess = false;
  registrationError = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      mobile: ['', [Validators.required, Validators.pattern(/^[\+]?[1-9][\d]{0,15}$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.registerForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  passwordsMatch(): boolean {
    const password = this.registerForm.get('password')?.value;
    const confirmPassword = this.registerForm.get('confirmPassword')?.value;
    return password === confirmPassword;
  }

  onSubmit() {
    if (this.registerForm.valid && this.passwordsMatch()) {
      this.isSubmitting = true;
      this.registrationError = '';
      this.registrationSuccess = false;
      
      const { firstName, lastName, mobile, email, password } = this.registerForm.value;
      
      console.log('Attempting to register:', { firstName, lastName, mobile, email, password });
      
      this.authService.register(email, password, firstName, lastName, mobile).then(result => {
        console.log('Registration result:', result);
        
        if (result.success) {
          this.registrationSuccess = true;
          this.successMessage = 'Registration successful! Redirecting to login page...';
          this.registrationError = '';
          
          // Redirect to login after successful registration
          setTimeout(() => {
            this.router.navigate(['/auth/login']);
          }, 2000);
        } else {
          this.registrationError = result.message;
          this.registrationSuccess = false;
        }
        
        this.isSubmitting = false;
      });
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.registerForm.controls).forEach(key => {
        const control = this.registerForm.get(key);
        control?.markAsTouched();
      });
    }
  }
} 