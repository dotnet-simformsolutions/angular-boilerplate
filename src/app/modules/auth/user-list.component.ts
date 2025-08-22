import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, User } from '../../core/services/auth.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="user-list-page">
      <div class="header">
        <h2>Registered Users</h2>
        <button class="btn btn-secondary" (click)="goBack()">← Back to Login</button>
      </div>
      
      <div class="user-list-container">
        <div class="user-count">
          <p>Total Users: {{ users.length }}</p>
        </div>
        
        <div class="user-list">
          <div class="user-item" *ngFor="let user of users; let i = index">
            <div class="user-number">{{ i + 1 }}</div>
            <div class="user-info">
              <div class="user-name">{{ user.firstName }} {{ user.lastName }}</div>
              <div class="user-email">{{ user.email }}</div>
              <div class="user-mobile">{{ user.mobile }}</div>
              <div class="user-date">Registered: {{ user.createdAt | date:'short' }}</div>
            </div>
            <div class="user-actions">
              <button class="btn btn-edit" (click)="editUser(user)">✏️ Edit</button>
              <button class="btn btn-delete" (click)="deleteUser(user.id)">🗑️ Delete</button>
            </div>
          </div>
        </div>
        
        <div class="empty-state" *ngIf="users.length === 0">
          <p>No users registered yet.</p>
          <button class="btn btn-primary" (click)="goToRegister()">Register First User</button>
        </div>
      </div>
    </div>

    <!-- Edit User Modal -->
    <div class="modal-overlay" *ngIf="showEditModal" (click)="closeEditModal()">
      <div class="modal-content" (click)="$event.stopPropagation()">
        <div class="modal-header">
          <h3>Edit User</h3>
          <button class="modal-close" (click)="closeEditModal()">×</button>
        </div>
        
        <form [formGroup]="editForm" (ngSubmit)="updateUser()" class="modal-body">
          <div class="form-row">
            <div class="form-group">
              <label for="editFirstName">First Name</label>
              <input 
                id="editFirstName"
                type="text" 
                formControlName="firstName" 
                class="form-control"
                [class.error]="isFieldInvalid('firstName')"
              />
              <div class="error-message" *ngIf="isFieldInvalid('firstName')">
                <span *ngIf="editForm.get('firstName')?.errors?.['required']">First name is required</span>
                <span *ngIf="editForm.get('firstName')?.errors?.['minlength']">First name must be at least 2 characters</span>
              </div>
            </div>
            <div class="form-group">
              <label for="editLastName">Last Name</label>
              <input 
                id="editLastName"
                type="text" 
                formControlName="lastName" 
                class="form-control"
                [class.error]="isFieldInvalid('lastName')"
              />
              <div class="error-message" *ngIf="isFieldInvalid('lastName')">
                <span *ngIf="editForm.get('lastName')?.errors?.['required']">Last name is required</span>
                <span *ngIf="editForm.get('lastName')?.errors?.['minlength']">Last name must be at least 2 characters</span>
              </div>
            </div>
          </div>
          
          <div class="form-group">
            <label for="editMobile">Mobile Number</label>
            <input 
              id="editMobile"
              type="tel" 
              formControlName="mobile" 
              class="form-control"
              [class.error]="isFieldInvalid('mobile')"
            />
            <div class="error-message" *ngIf="isFieldInvalid('mobile')">
              <span *ngIf="editForm.get('mobile')?.errors?.['required']">Mobile number is required</span>
              <span *ngIf="editForm.get('mobile')?.errors?.['pattern']">Please enter a valid mobile number</span>
            </div>
          </div>

          <div class="form-group">
            <label for="editEmail">Email</label>
            <input 
              id="editEmail"
              type="email" 
              formControlName="email" 
              class="form-control"
              [class.error]="isFieldInvalid('email')"
            />
            <div class="error-message" *ngIf="isFieldInvalid('email')">
              <span *ngIf="editForm.get('email')?.errors?.['required']">Email is required</span>
              <span *ngIf="editForm.get('email')?.errors?.['email']">Please enter a valid email</span>
            </div>
          </div>

          <div class="modal-actions">
            <button type="button" class="btn btn-secondary" (click)="closeEditModal()">Cancel</button>
            <button 
              type="submit" 
              class="btn btn-primary" 
              [disabled]="editForm.invalid || isUpdating"
              [class.loading]="isUpdating"
            >
              {{ isUpdating ? 'Updating...' : 'Update User' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Success/Error Messages -->
    <div class="message-overlay" *ngIf="showMessage">
      <div class="message-content" [class.success]="messageType === 'success'" [class.error]="messageType === 'error'">
        {{ messageText }}
      </div>
    </div>
  `,
  styles: [`
    .user-list-page {
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 2rem;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
      background: white;
      padding: 1.5rem;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    }

    .header h2 {
      margin: 0;
      color: #333;
      font-size: 1.8rem;
      font-weight: 600;
    }

    .user-list-container {
      background: white;
      border-radius: 12px;
      padding: 2rem;
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    }

    .user-count {
      margin-bottom: 1.5rem;
      padding-bottom: 1rem;
      border-bottom: 2px solid #f0f0f0;
    }

    .user-count p {
      margin: 0;
      font-size: 1.1rem;
      color: #666;
      font-weight: 500;
    }

    .user-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .user-item {
      display: flex;
      align-items: center;
      padding: 1.5rem;
      background: #f8f9fa;
      border-radius: 8px;
      border-left: 4px solid #667eea;
      transition: all 0.3s ease;
    }

    .user-item:hover {
      background: #e9ecef;
      transform: translateX(4px);
    }

    .user-number {
      background: #667eea;
      color: white;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      margin-right: 1rem;
      flex-shrink: 0;
    }

    .user-info {
      flex: 1;
    }

    .user-name {
      font-weight: 600;
      color: #333;
      font-size: 1.1rem;
      margin-bottom: 0.25rem;
    }

    .user-email {
      color: #666;
      font-size: 0.9rem;
      margin-bottom: 0.25rem;
    }

    .user-mobile {
      color: #666;
      font-size: 0.9rem;
      margin-bottom: 0.25rem;
    }

    .user-date {
      color: #999;
      font-size: 0.8rem;
    }

    .user-actions {
      display: flex;
      gap: 0.5rem;
    }

    .btn {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 6px;
      font-size: 0.9rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
      text-decoration: none;
      display: inline-block;
    }

    .btn-primary {
      background: #667eea;
      color: white;
    }

    .btn-primary:hover:not(:disabled) {
      background: #5a6fd8;
      transform: translateY(-2px);
    }

    .btn-secondary {
      background: #6c757d;
      color: white;
    }

    .btn-secondary:hover {
      background: #5a6268;
      transform: translateY(-2px);
    }

    .btn-edit {
      background: #28a745;
      color: white;
    }

    .btn-edit:hover {
      background: #218838;
      transform: translateY(-2px);
    }

    .btn-delete {
      background: #dc3545;
      color: white;
    }

    .btn-delete:hover {
      background: #c82333;
      transform: translateY(-2px);
    }

    .btn.loading {
      opacity: 0.7;
    }

    .empty-state {
      text-align: center;
      padding: 3rem;
      color: #666;
    }

    .empty-state p {
      font-size: 1.1rem;
      margin-bottom: 1rem;
    }

    /* Modal Styles */
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .modal-content {
      background: white;
      border-radius: 12px;
      width: 90%;
      max-width: 500px;
      max-height: 90vh;
      overflow-y: auto;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.5rem;
      border-bottom: 1px solid #eee;
    }

    .modal-header h3 {
      margin: 0;
      color: #333;
    }

    .modal-close {
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      color: #666;
    }

    .modal-body {
      padding: 1.5rem;
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
      color: #333;
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
      border-color: #667eea;
      box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.2);
    }

    .form-control.error {
      border-color: #dc3545;
    }

    .error-message {
      color: #dc3545;
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }

    .modal-actions {
      display: flex;
      gap: 1rem;
      justify-content: flex-end;
      margin-top: 1.5rem;
    }

    /* Message Styles */
    .message-overlay {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 2000;
    }

    .message-content {
      padding: 1rem 1.5rem;
      border-radius: 8px;
      color: white;
      font-weight: 500;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    .message-content.success {
      background: #28a745;
    }

    .message-content.error {
      background: #dc3545;
    }

    @media (max-width: 768px) {
      .user-list-page {
        padding: 1rem;
      }
      
      .header {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
      }
      
      .user-item {
        flex-direction: column;
        text-align: center;
        gap: 1rem;
      }
      
      .user-number {
        margin-right: 0;
      }

      .user-actions {
        justify-content: center;
      }

      .form-row {
        grid-template-columns: 1fr;
      }

      .modal-actions {
        flex-direction: column;
      }
    }
  `]
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  showEditModal = false;
  editingUser: User | null = null;
  editForm: FormGroup;
  isUpdating = false;
  showMessage = false;
  messageText = '';
  messageType: 'success' | 'error' = 'success';

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.editForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      mobile: ['', [Validators.required, Validators.pattern(/^[\+]?[1-9][\d]{0,15}$/)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.users = this.authService.getAllUsers();
  }

  editUser(user: User) {
    this.editingUser = user;
    this.editForm.patchValue({
      firstName: user.firstName,
      lastName: user.lastName,
      mobile: user.mobile,
      email: user.email
    });
    this.showEditModal = true;
  }

  closeEditModal() {
    this.showEditModal = false;
    this.editingUser = null;
    this.editForm.reset();
  }

  updateUser() {
    if (this.editForm.valid && this.editingUser) {
      this.isUpdating = true;
      
      const updates = this.editForm.value;
      
      this.authService.updateUser(this.editingUser.id, updates).then(result => {
        if (result.success) {
          this.showMessage = true;
          this.messageText = result.message;
          this.messageType = 'success';
          this.loadUsers();
          this.closeEditModal();
        } else {
          this.showMessage = true;
          this.messageText = result.message;
          this.messageType = 'error';
        }
        
        this.isUpdating = false;
        
        setTimeout(() => {
          this.showMessage = false;
        }, 3000);
      });
    } else {
      Object.keys(this.editForm.controls).forEach(key => {
        const control = this.editForm.get(key);
        control?.markAsTouched();
      });
    }
  }

  deleteUser(userId: string) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.authService.deleteUser(userId).then(result => {
        this.showMessage = true;
        this.messageText = result.message;
        this.messageType = result.success ? 'success' : 'error';
        
        if (result.success) {
          this.loadUsers();
        }
        
        setTimeout(() => {
          this.showMessage = false;
        }, 3000);
      });
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.editForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  goBack() {
    this.router.navigate(['/auth/login']);
  }

  goToRegister() {
    this.router.navigate(['/auth/register']);
  }
} 