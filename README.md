# Project Skeleton for Web Apps

## Table of Contents

1. [Getting Started](#getting-started)
2. [Project Structure](#project-structure)
3. [Setup](#setup)
4. [Running the Application](#running-the-application)

## Getting Started

To get started, clone the repository and follow the setup instructions below.

```bash
git clone git@github.com:StefanTrsunov/skeleton.git
```

## Project Structure

## Setup

To have a running database with docker on port 5433 run this command in root directory:

> NOTE for credential look at /docker-compose.yml

```bash
docker-compose up -d

```

* Build the UI server

```bash
pnpm run build
```

## Running the Application

> NOTE: server on port 8000

* Run the API server

```bash
go run .
```

> NOTE: clint on port 8080

* Start the development server:

```bash
pnpm run start
```
