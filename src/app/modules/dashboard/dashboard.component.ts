import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="dashboard-container">
      <div class="dashboard-header">
        <h1>🚀 Welcome Back!</h1>
        <p class="subtitle">Your productivity hub awaits. Let's make today amazing!</p>
      </div>

      <div class="dashboard-stats">
        <div class="stat-card">
          <div class="stat-icon">👥</div>
          <div class="stat-value" [ngClass]="'animate'">{{ usersCount }}</div>
          <div class="stat-label">Registered Users</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">⏰</div>
          <div class="stat-value" [ngClass]="'animate'">{{ currentTime }}</div>
          <div class="stat-label">Current Time</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">💡</div>
          <div class="stat-value fun-fact">{{ funFact }}</div>
          <div class="stat-label">Fun Fact</div>
        </div>
      </div>

      <div class="dashboard-quote">
        <blockquote>
          "{{ quote }}"
          <footer>- {{ quoteAuthor }}</footer>
        </blockquote>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
      padding: 2rem;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .dashboard-header {
      text-align: center;
      margin-bottom: 2rem;
    }
    .dashboard-header h1 {
      font-size: 2.5rem;
      font-weight: 700;
      color: #3f51b5;
      margin-bottom: 0.5rem;
    }
    .subtitle {
      color: #666;
      font-size: 1.2rem;
    }
    .dashboard-stats {
      display: flex;
      gap: 2rem;
      margin-bottom: 2.5rem;
      flex-wrap: wrap;
      justify-content: center;
    }
    .stat-card {
      background: white;
      border-radius: 16px;
      box-shadow: 0 4px 24px rgba(63,81,181,0.08);
      padding: 2rem 2.5rem;
      min-width: 180px;
      display: flex;
      flex-direction: column;
      align-items: center;
      transition: transform 0.2s;
      position: relative;
      overflow: hidden;
    }
    .stat-card:hover {
      transform: translateY(-6px) scale(1.04);
      box-shadow: 0 8px 32px rgba(63,81,181,0.15);
    }
    .stat-icon {
      font-size: 2.2rem;
      margin-bottom: 0.5rem;
    }
    .stat-value {
      font-size: 2.1rem;
      font-weight: 700;
      color: #3f51b5;
      margin-bottom: 0.25rem;
      transition: color 0.3s;
    }
    .stat-value.animate {
      animation: pop 0.7s cubic-bezier(.68,-0.55,.27,1.55);
    }
    @keyframes pop {
      0% { transform: scale(0.7); color: #ff9800; }
      60% { transform: scale(1.2); color: #4caf50; }
      100% { transform: scale(1); color: #3f51b5; }
    }
    .stat-label {
      color: #888;
      font-size: 1rem;
      font-weight: 500;
    }
    .fun-fact {
      font-size: 1.1rem;
      color: #ff9800;
      text-align: center;
      font-weight: 600;
    }
    .dashboard-quote {
      margin-top: 2.5rem;
      background: #fffbe7;
      border-left: 6px solid #ffd54f;
      padding: 1.5rem 2rem;
      border-radius: 10px;
      max-width: 600px;
      box-shadow: 0 2px 12px rgba(255,213,79,0.08);
    }
    blockquote {
      margin: 0;
      font-size: 1.25rem;
      color: #555;
      font-style: italic;
      position: relative;
    }
    blockquote footer {
      margin-top: 1rem;
      font-size: 1rem;
      color: #888;
      text-align: right;
      font-style: normal;
    }
    @media (max-width: 900px) {
      .dashboard-stats {
        flex-direction: column;
        gap: 1.5rem;
      }
      .stat-card {
        min-width: 220px;
      }
    }
  `]
})
export class DashboardComponent implements OnInit {
  usersCount = 0;
  currentTime = '';
  funFact = '';
  quote = '';
  quoteAuthor = '';

  private funFacts = [
    'Honey never spoils. Archaeologists have found 3000-year-old honey in ancient tombs that is still edible!',
    'Bananas are berries, but strawberries are not.',
    'A group of flamingos is called a "flamboyance".',
    'Octopuses have three hearts.',
    'The Eiffel Tower can be 15 cm taller during hot days.',
    'There are more stars in the universe than grains of sand on Earth.',
    'Wombat poop is cube-shaped.',
    'Some cats are allergic to humans.',
    'A day on Venus is longer than a year on Venus.',
    'The unicorn is the national animal of Scotland.'
  ];

  private quotes = [
    { text: 'The best way to get started is to quit talking and begin doing.', author: 'Walt Disney' },
    { text: 'Success is not in what you have, but who you are.', author: 'Bo Bennett' },
    { text: 'The only limit to our realization of tomorrow is our doubts of today.', author: 'Franklin D. Roosevelt' },
    { text: 'Do not watch the clock; do what it does. Keep going.', author: 'Sam Levenson' },
    { text: 'Great things never come from comfort zones.', author: 'Anonymous' },
    { text: 'Dream bigger. Do bigger.', author: 'Anonymous' },
    { text: 'Opportunities do not happen, you create them.', author: 'Chris Grosser' },
    { text: 'Push yourself, because no one else is going to do it for you.', author: 'Anonymous' },
    { text: 'Success does not just find you. You have to go out and get it.', author: 'Anonymous' },
    { text: 'The harder you work for something, the greater you will feel when you achieve it.', author: 'Anonymous' }
  ];

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.usersCount = this.getUsersCount();
    this.updateTime();
    this.funFact = this.funFacts[Math.floor(Math.random() * this.funFacts.length)];
    const q = this.quotes[Math.floor(Math.random() * this.quotes.length)];
    this.quote = q.text;
    this.quoteAuthor = q.author;
    setInterval(() => this.updateTime(), 1000);
  }

  getUsersCount(): number {
    // Get actual user count from AuthService
    return this.authService.getAllUsers().length;
  }

  updateTime() {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString();
  }
} 