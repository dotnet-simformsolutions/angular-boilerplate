import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  mobile: string;
  createdAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: User[] = [];
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    // Add some demo users
    this.users = [
      { 
        id: '1',
        email: 'test@example.com', 
        password: 'password123',
        firstName: 'John',
        lastName: 'Doe',
        mobile: '+1234567890',
        createdAt: new Date('2024-01-01')
      },
      { 
        id: '2',
        email: 'demo@test.com', 
        password: 'demo123',
        firstName: 'Jane',
        lastName: 'Smith',
        mobile: '+0987654321',
        createdAt: new Date('2024-01-02')
      }
    ];
  }

  register(email: string, password: string, firstName: string, lastName: string, mobile: string): Promise<{ success: boolean; message: string }> {
    return new Promise((resolve) => {
      // Check if user already exists
      const existingUser = this.users.find(user => user.email.toLowerCase() === email.toLowerCase());
      
      if (existingUser) {
        resolve({ success: false, message: 'User with this email already exists' });
        return;
      }

      // Add new user
      const newUser: User = {
        id: Date.now().toString(),
        email,
        password,
        firstName,
        lastName,
        mobile,
        createdAt: new Date()
      };
      
      this.users.push(newUser);
      console.log('User registered:', newUser);
      console.log('All users:', this.users);
      
      resolve({ success: true, message: 'Registration successful!' });
    });
  }

  login(email: string, password: string): Promise<{ success: boolean; message: string }> {
    return new Promise((resolve) => {
      // Find user by email (case insensitive)
      const user = this.users.find(u => u.email.toLowerCase() === email.toLowerCase());
      
      if (!user) {
        resolve({ success: false, message: 'User not found. Please register first.' });
        return;
      }

      if (user.password !== password) {
        resolve({ success: false, message: 'Invalid password' });
        return;
      }

      // Login successful
      this.currentUserSubject.next(user);
      console.log('Login successful:', user);
      
      resolve({ success: true, message: 'Login successful!' });
    });
  }

  updateUser(userId: string, updates: Partial<User>): Promise<{ success: boolean; message: string }> {
    return new Promise((resolve) => {
      const userIndex = this.users.findIndex(user => user.id === userId);
      
      if (userIndex === -1) {
        resolve({ success: false, message: 'User not found' });
        return;
      }

      // Check if email is being changed and if it already exists
      if (updates.email && updates.email !== this.users[userIndex].email) {
        const existingUser = this.users.find(user => 
          user.email.toLowerCase() === updates.email!.toLowerCase() && user.id !== userId
        );
        
        if (existingUser) {
          resolve({ success: false, message: 'Email already exists' });
          return;
        }
      }

      // Update user
      this.users[userIndex] = { ...this.users[userIndex], ...updates };
      console.log('User updated:', this.users[userIndex]);
      
      resolve({ success: true, message: 'User updated successfully!' });
    });
  }

  deleteUser(userId: string): Promise<{ success: boolean; message: string }> {
    return new Promise((resolve) => {
      const userIndex = this.users.findIndex(user => user.id === userId);
      
      if (userIndex === -1) {
        resolve({ success: false, message: 'User not found' });
        return;
      }

      // Remove user
      const deletedUser = this.users.splice(userIndex, 1)[0];
      console.log('User deleted:', deletedUser);
      
      resolve({ success: true, message: 'User deleted successfully!' });
    });
  }

  logout(): void {
    this.currentUserSubject.next(null);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isLoggedIn(): boolean {
    return this.currentUserSubject.value !== null;
  }

  getAllUsers(): User[] {
    return [...this.users]; // Return copy for debugging
  }
} 