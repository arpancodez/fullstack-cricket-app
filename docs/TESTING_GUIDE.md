# Testing Guide

## Unit Testing

### Backend Unit Tests
Tests for controllers, services, and utilities.

```bash
cd backend
npm run test
```

### Frontend Unit Tests
Tests for React components and utilities.

```bash
cd frontend
npm test
```

## Integration Tests

Tests for API endpoints and database interactions.

```bash
npm run test:integration
```

## E2E Tests

End-to-end tests using Cypress.

```bash
npm run test:e2e
```

## Coverage

Generate code coverage reports:

```bash
npm run test:coverage
```

## Debugging

Run tests in debug mode:

```bash
node --inspect-brk node_modules/.bin/jest --runInBand
```
