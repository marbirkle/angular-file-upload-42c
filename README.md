# JSON File Manager

<div align="center">
  <img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" alt="Nx logo" width="45" />
  <h3>Professional JSON File Upload & Management System</h3>
  <p>Built with Angular 20, Nx, NgRx, NG Bootstrap, and Storybook</p>
</div>

## 📋 Overview

JSON File Manager is a modern Single Page Application (SPA) designed for efficient JSON file management. The application provides a clean, intuitive interface for uploading, validating, and managing JSON files with robust validation rules and persistent storage.

## ✨ Key Features

### 🎯 Core Functionality

- **JSON File Upload**: Secure file upload with validation
- **File Management**: View, validate, and delete uploaded files
- **Real-time Validation**: Instant JSON syntax validation
- **Persistent Storage**: Browser-based data persistence
- **Responsive Design**: Mobile-first Bootstrap 5 interface

### 🔧 Technical Features

- **State Management**: NgRx Store for global state, Signals for local state
- **Lazy Loading**: Optimized routing with lazy-loaded modules
- **Form Validation**: Comprehensive client-side validation rules
- **Component Architecture**: Standalone components with modular design
- **Testing**: Jest unit tests with Angular Testing Utilities
- **Documentation**: Interactive Storybook component library

## 🚀 Getting Started

### Prerequisites

- Node.js 20.x (LTS)
- npm 9.x or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/marbirkle/angular-file-upload-42c.git
cd angular-file-upload-42c

# Install dependencies
npm install

# Start development server
npm run serve
```

### Development Commands

```bash
# Development
npm run serve          # Start development server (http://localhost:4200)
npm run build          # Build for production
npm run test           # Run unit tests
npm run lint           # Run ESLint
npm run format         # Format code with Prettier

# Storybook
npm run storybook      # Start Storybook (http://localhost:4400)
npm run build-storybook # Build Storybook for production

# Nx Commands
npx nx graph           # Visualize project dependencies
npx nx show project file-upload # Show project details
```

## 📱 User Interface

### Welcome Page

- Clean landing page with upload entry point
- File counter display
- Modal-based upload dialog

### Upload Dialog

- **File Selection**: JSON files only (.json extension)
- **Name Field**:
  - English alphabet, numbers, underscores, dashes
  - 1-32 characters length
  - Must contain "42c-marbirkle"
- **Description Field**:
  - English alphabet, numbers, special characters
  - Maximum 128 characters
  - Must NOT contain "42c-marbirkle"

### File Management

- **File List**: Display all uploaded files
- **Validation Status**: Visual indicators for valid/invalid JSON
- **Delete Function**: Confirmation dialog before deletion
- **Navigation**: Seamless page transitions

## 🏗️ Technical Architecture

### Frontend Stack

- **Angular 20.3.x**: Modern reactive framework
- **Nx 22.0.1**: Monorepo management
- **NgRx**: State management (Store, Effects, Component Store)
- **NG Bootstrap 19.0.1**: UI component library
- **Bootstrap 5.3.8**: CSS framework
- **Jest**: Testing framework
- **Storybook 9.1.16**: Component documentation

### Project Structure

```
angular-file-upload-42c/
├── apps/
│   └── file-upload/           # Main Angular application
│       ├── src/
│       │   ├── app/
│       │   │   ├── pages/     # Lazy-loaded page modules
│       │   │   ├── components/ # Standalone components
│       │   │   ├── store/     # NgRx store configuration
│       │   │   └── services/  # Business logic services
│       │   ├── assets/        # Static assets from Figma
│       │   └── styles/        # Global SCSS styles
│       └── public/            # Public assets
├── .github/workflows/         # CI/CD pipelines
├── .storybook/               # Storybook configuration
└── docs/                     # Documentation
```

### Design System

- **SVG Icons**: Extracted from Figma and embedded inline
- **Responsive Design**: Mobile-first approach
- **Accessibility**: WCAG 2.1 compliant

## 🧪 Testing & Quality

### Testing Strategy

- **Unit Tests**: Jest with Angular Testing Utilities
- **Component Tests**: Isolated component testing
- **Service Tests**: Business logic validation
- **JSON Parsing Tests**: Core functionality validation

### Code Quality

- **ESLint**: Code linting and style enforcement
- **Prettier**: Code formatting
- **TypeScript**: Strict type checking
- **CI/CD**: Automated testing and deployment

## 🚀 Deployment

The application is deployed on a free-tier platform with:

- **Automatic CI/CD**: GitHub Actions pipeline
- **Production Build**: Optimized Angular build
- **CDN Distribution**: Fast global content delivery
- **HTTPS**: Secure connections

## 📚 Documentation

- **Storybook**: Interactive component library
- **API Documentation**: TypeScript interfaces
- **User Guide**: Step-by-step usage instructions
- **Developer Guide**: Technical implementation details

## 🤝 Contributing

### Development Standards

1. **Code Quality**: All code must pass ESLint and Prettier
2. **Testing**: Unit tests required for new features
3. **Documentation**: Storybook stories for new components
4. **Commits**: Conventional Commits format
5. **CI/CD**: All checks must pass before merging

### Branch Protection

- **Main Branch**: Protected with required PR reviews
- **Required Checks**: Build, test, lint, format
- **Review Process**: Minimum 1 approval required

## 📄 License

This project is licensed under the MIT License.

## 🔗 Resources

- **Repository**: [GitHub](https://github.com/marbirkle/angular-file-upload-42c)
- **Angular Docs**: [angular.dev](https://angular.dev)
- **Nx Docs**: [nx.dev](https://nx.dev)
- **NG Bootstrap**: [ng-bootstrap.github.io](https://ng-bootstrap.github.io)

---

<div align="center">
  <p>Built with ❤️ by <strong>marbirkle</strong> using modern web technologies</p>
</div>
