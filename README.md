# Frontend Microservices Module Federation

Template with React applications microservices, hosted inside root container application with Webpack Module Federation and Workspaces.

## Setup

1. Clone the repository: `git clone https://github.com/imwshdp/frontend-microservices-monorepo.git`
2. Install dependencies: `npm install`
3. Start the microservices with development server: `npm run preview`

## Directory Structure

The monorepo follows the following directory structure:

- Services:
- - `services/host` with host app
- - `services/about` with first microservice app
- - `services/shop` with second microservice app
- Packages:
- - `packages/builder` with webpack configuration
- - `packages/shared` with data shared by services
