# Project Skeleton for Web Apps

Welcome to the project skeleton for web apps. This repository provides a simple and clear starting point for developers to quickly set up and start working on a web application. The technologies used in this project are Golang and TypeScript. The project structure is designed to separate concerns, with dedicated files for routes, logic, databases, and more. Additionally, we utilize Protocol Buffers for code generation for both backend and frontend. A bot is configured to make commits for the latest versions of some frameworks.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Project Structure](#project-structure)
3. [Setup](#setup)
4. [Running the Application](#running-the-application)
5. [Code Generation with Protocol Buffers](#code-generation-with-protocol-buffers)
6. [Automated Dependency Updates](#automated-dependency-updates)
7. [Contributing](#contributing)
8. [License](#license)
9. [Ideas](#ideas)



## Getting Started

To get started, clone the repository and follow the setup instructions below.

```bash
git clone https://github.com/yourusername/web-app-skeleton.git
cd web-app-skeleton
```

## Project Structure

web-app-skeleton/
├── backend/
│   ├── cmd/
│   ├── internal/
│   │   ├── routes/
│   │   ├── logic/
│   │   ├── db/
│   │   └── pb/
│   └── main.go
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── routes/
│   │   ├── store/
│   │   └── App.tsx
│   └── package.json
├── protos/
│   ├── *.proto
├── scripts/
│   ├── update-dependencies.sh
├── .github/
│   ├── workflows/
│   │   └── update-dependencies.yml
└── README.md

* backend/: Contains the Golang backend code.

  * cmd/: Command line specific code.
  * internal/: Internal application code.
    * routes/: HTTP route handlers.
    * logic/: Business logic.
    * db/: Database interactions.
    * pb/: Generated Protocol Buffer code.
  * main.go: The entry point for the backend application.

* frontend/: Contains the TypeScript frontend code.

  * src/: Source code for the frontend.
    * components/: React components.
    * services/: Services for API calls.
    * routes/: Route definitions.
    * store/: State management.
    * App.tsx: The main React component.
  * package.json: NPM package configuration.

* protos/: Protocol Buffer definitions.

* scripts/: Utility scripts.
  * update-dependencies.sh: Script to update dependencies.

* .github/: GitHub workflows for CI/CD.
  * update-dependencies.yml: Workflow for automated dependency updates.

## Setup

## Running the Application

## Code Generation with Protocol Buffers

## Automated Dependency Updates

## Contributing

We welcome contributions! Please fork the repository and create a pull request with your changes. And report any issues if you have. Or just tips! :D

## License

## Ideas

Maybe have different enviorments like:

* Development
* Staging/Testing
* Production