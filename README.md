# Angular Boilerplate

A lightweight, error-free Angular application with comprehensive features including authentication, user management, and modern UI components.

## 🚀 Features

- **Authentication System**: Complete login/register functionality with JWT-based AuthService
- **User Management**: CRUD operations for users with edit/delete capabilities
- **Modern UI**: Angular Material with dark/light theme toggle
- **Responsive Design**: Mobile-first approach with beautiful layouts
- **Lazy Loading**: Optimized module loading for better performance
- **Form Validation**: Reactive forms with comprehensive validation
- **State Management**: NgRx integration for scalable state management
- **Testing Ready**: Jasmine/Karma testing setup
- **Code Quality**: ESLint and Prettier configuration

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Angular CLI (v17 or higher)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd angular-boilerplate
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:4200` (or the port shown in terminal)

## 🏗️ Project Structure

```
src/
├── app/
│   ├── core/
│   │   ├── guards/
│   │   ├── interceptors/
│   │   └── services/
│   ├── modules/
│   │   ├── auth/
│   │   ├── dashboard/
│   │   └── settings/
│   ├── shared/
│   │   └── components/
│   └── app.component.ts
├── assets/
└── styles.scss
```

## 🎯 Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm run test` - Run unit tests
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run format` - Format code with Prettier

## 🔐 Authentication

### Demo Users
The application comes with pre-configured demo users:
- **Email**: `test@example.com` | **Password**: `password123`
- **Email**: `demo@test.com` | **Password**: `demo123`

### Registration Flow
1. Navigate to `/auth/register`
2. Fill in all required fields (first name, last name, mobile, email, password)
3. Submit the form
4. You'll be automatically redirected to login page
5. Login with your new credentials

## 👥 User Management

After logging in, you can:
- View all registered users
- Edit user information
- Delete users
- See real-time user count on dashboard

## 🎨 Theming

The application supports both light and dark themes:
- Toggle theme using the switch in the header
- Theme preference is automatically saved
- Smooth transitions between themes

## 🧪 Testing

Run the test suite:
```bash
npm run test
```

## 📦 Build

Build for production:
```bash
npm run build
```

The build artifacts will be stored in the `dist/angular-boilerplate/` directory.

## 🔧 Configuration

### Environment Variables
The application uses `ngx-env` for environment variable management.

### Angular Material
Fully configured with custom theme and component styles.

### Routing
Lazy-loaded modules for optimal performance:
- Auth module (`/auth/*`)
- Dashboard module (`/dashboard`)
- Settings module (`/settings`)

## 🚀 Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Deploy the contents of `dist/angular-boilerplate/` to your web server.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues or have questions, please open an issue in the repository.

---

**Built with ❤️ using Angular 17** 