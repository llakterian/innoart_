# 🤝 Contributing to InnArt

Thank you for considering contributing to InnArt! This document provides guidelines and instructions for contributing to the project.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Testing Guidelines](#testing-guidelines)
- [Documentation](#documentation)
- [Community](#community)

## 📜 Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct:

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what is best for the community
- Show empathy towards other community members

## 🚀 How Can I Contribute?

There are many ways to contribute to InnArt:

### 🐛 Reporting Bugs

- Check if the bug has already been reported in the [Issues](https://github.com/llakterian/innoart_/issues)
- If not, create a new issue with a descriptive title and detailed description
- Include steps to reproduce, expected behavior, and actual behavior
- Add screenshots if applicable
- Specify your environment (browser, OS, etc.)

### 💡 Suggesting Features

- Check if the feature has already been suggested in the [Issues](https://github.com/llakterian/innoart_/issues)
- If not, create a new issue with a descriptive title and detailed description
- Explain why this feature would be useful to most users
- Provide examples of how it would work

### 🔧 Code Contributions

- Fix bugs or implement new features
- Improve documentation
- Optimize performance
- Enhance UI/UX
- Add tests

## 💻 Development Setup

### Prerequisites

- Node.js (v16+)
- npm or yarn
- Git
- MetaMask or another Ethereum wallet

### Local Development

1. Fork the repository

2. Clone your fork
   ```bash
   git clone https://github.com/YOUR_USERNAME/innoart_.git
   cd innoart_
   ```

3. Add the original repository as upstream
   ```bash
   git remote add upstream https://github.com/llakterian/innoart_.git
   ```

4. Install dependencies
   ```bash
   npm install
   ```

5. Create a `.env` file in the root directory with the following variables:
   ```env
   VITE_INFURA_PROJECT_ID=your_infura_project_id
   VITE_DEVELOPER_WALLET=0x426F1B6F42F4fAa8cDc96D0C2a82e70709F3a191
   VITE_ENVIRONMENT=development
   ```

6. Start the development server
   ```bash
   npm run dev
   ```

7. Open your browser and navigate to `http://localhost:3002`

### Keeping Your Fork Updated

```bash
# Fetch upstream changes
git fetch upstream

# Merge upstream changes into your main branch
git checkout main
git merge upstream/main

# Push the changes to your fork
git push
```

## 🔄 Pull Request Process

1. Create a new branch for your feature or bugfix
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bugfix-name
   ```

2. Make your changes and commit them with descriptive commit messages

3. Push your branch to your fork
   ```bash
   git push origin feature/your-feature-name
   ```

4. Create a Pull Request (PR) from your branch to the original repository's `main` branch

5. In your PR description:
   - Reference the issue it addresses (if applicable)
   - Describe the changes you've made
   - Mention any breaking changes
   - Include screenshots for UI changes

6. Wait for maintainers to review your PR

7. Address any requested changes

8. Once approved, your PR will be merged

## 📝 Coding Standards

### JavaScript

- Use ES6+ features
- Follow the existing code style
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused
- Avoid global variables

### HTML

- Use semantic HTML elements
- Ensure accessibility (proper ARIA attributes, alt text for images)
- Keep markup clean and readable

### CSS

- Use CSS variables for theming
- Follow the existing naming conventions
- Write responsive styles
- Organize styles logically

## 💬 Commit Message Guidelines

We follow a simplified version of the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>: <description>

[optional body]

[optional footer]
```

### Types

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code changes that neither fix bugs nor add features
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Changes to the build process or auxiliary tools

### Examples

```
feat: add multi-wallet support

Implement support for WalletConnect, Coinbase Wallet, and Trust Wallet
```

```
fix: resolve wallet connection issue on mobile devices
```

```
docs: update README with deployment instructions
```

## 🧪 Testing Guidelines

### Manual Testing

Before submitting a PR, please manually test your changes:

1. Verify that your changes work as expected
2. Test on different browsers (Chrome, Firefox, Safari)
3. Test on mobile devices or using responsive design mode
4. Ensure no console errors or warnings
5. Check that existing functionality still works

### Automated Testing

If you're adding new features or fixing bugs, consider adding tests:

1. Unit tests for utility functions
2. Integration tests for component interactions
3. End-to-end tests for critical user flows

## 📚 Documentation

Good documentation is crucial for the project's success:

- Update the README.md if your changes affect setup or usage
- Add inline comments for complex code
- Update or create documentation for APIs or components
- Include JSDoc comments for functions and classes

## 👥 Community

- Be respectful and constructive in discussions
- Help other contributors when possible
- Share knowledge and best practices
- Participate in code reviews
- Report issues and suggest improvements

### Getting Help

If you need help with contributing:

1. Check the existing documentation
2. Search through existing issues and discussions
3. Create a new issue with the `question` label
4. Join our community discussions

## 🏷️ Issue Labels

We use the following labels to organize issues:

- `bug` - Something isn't working
- `enhancement` - New feature or request
- `documentation` - Improvements or additions to documentation
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention is needed
- `question` - Further information is requested
- `wontfix` - This will not be worked on

## 🎯 Areas for Contribution

Here are some areas where contributions are especially welcome:

### Frontend Development
- UI/UX improvements
- Mobile responsiveness enhancements
- Performance optimizations
- Accessibility improvements

### Blockchain Integration
- Smart contract optimizations
- Gas fee optimizations
- Multi-chain support
- New wallet integrations

### Documentation
- Code documentation
- User guides
- API documentation
- Video tutorials

### Testing
- Unit tests
- Integration tests
- End-to-end tests
- Performance tests

### DevOps
- CI/CD improvements
- Deployment optimizations
- Monitoring and logging
- Security enhancements

## 🔒 Security

If you discover a security vulnerability, please:

1. **DO NOT** create a public issue
2. Email the maintainers directly
3. Provide detailed information about the vulnerability
4. Allow time for the issue to be addressed before public disclosure

## 📊 Performance Guidelines

When contributing code, please consider:

- Bundle size impact
- Runtime performance
- Memory usage
- Network requests
- Caching strategies

## 🌐 Internationalization

If you're interested in adding language support:

1. Create translation files in the appropriate format
2. Update the language selection UI
3. Test with different languages
4. Consider RTL (right-to-left) language support

## 🎨 Design Guidelines

When making UI/UX changes:

- Follow the existing design system
- Maintain consistency across pages
- Consider accessibility requirements
- Test on different screen sizes
- Provide design mockups for major changes

## 📱 Mobile Development

For mobile-related contributions:

- Test on actual devices when possible
- Consider touch interactions
- Optimize for different screen sizes
- Test performance on lower-end devices

## 🚀 Release Process

Our release process follows these steps:

1. Features are developed in feature branches
2. Pull requests are reviewed and merged to `main`
3. Regular releases are tagged and deployed
4. Release notes are generated automatically

## 📈 Metrics and Analytics

When adding new features, consider:

- User experience metrics
- Performance impact
- Error tracking
- Usage analytics (privacy-compliant)

## 🤖 Automation

We welcome contributions to:

- GitHub Actions workflows
- Automated testing
- Code quality checks
- Deployment automation

## 📞 Contact

For questions about contributing:

- Create an issue with the `question` label
- Join our community discussions
- Contact the maintainers directly

---

Thank you for contributing to InnArt! Your efforts help make the platform better for everyone. 🎉