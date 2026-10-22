# FSD-DS-A: React JS Learning Folder

This repository is my college learning folder for **Full Stack Development (FSD)** and **React.js** practice. It contains JavaScript exercises, small browser projects, React concept demonstrations, and larger React applications created while learning frontend development.

## Student Details

| Field | Information |
| --- | --- |
| **Name** | Lakshay Aggarwal |
| **Program** | B.Tech CSE-DS |
| **Section** | A |
| **Roll Number** | 2400321540108 |

## Learning Objectives

- Build a strong foundation in modern JavaScript.
- Understand asynchronous programming and API requests.
- Learn React components, props, state, and event handling.
- Practice React hooks such as `useState`, `useEffect`, `useContext`, and `useRef`.
- Create multi-page interfaces with React Router.
- Organize applications using reusable components and separated data/services.
- Build practical frontend projects using Vite.

## Folder Overview

```text
FSD-DS-A/
├── javascript/                 # JavaScript fundamentals and browser exercises
├── React/
│   ├── my-project-01/          # Introductory React project
│   └── restaurant-project/     # Restaurant-focused React project
├── react-usestate/             # State and event-handling practice
├── react-useEffect/            # Side effects and form handling practice
├── react-useContext/           # Shared theme and form state with Context
├── useContext_and_useRef/      # Context and ref practice
├── react-router/               # Client-side routing practice
├── image-slider/               # Interactive image slider
├── auth-app/                   # Authentication-focused React application
├── admin-student/              # Role-based student management application
└── abes-site/                  # Static HTML page and image assets
```

## Learning Modules

### 1. JavaScript Fundamentals

The [`javascript/`](./javascript/) folder contains examples and exercises for:

- Variables, data types, operators, objects, and functions
- Conditions and loops
- Arrays and array methods such as `map`, `filter`, and `reduce`
- Destructuring and the spread operator
- Synchronous and asynchronous execution
- Callbacks, Promises, and `async`/`await`
- Basic browser interaction with HTML and JavaScript

It also includes:

- [`assignments/`](./javascript/assignments/) for practice assignments
- [`project-api-fetch/`](./javascript/project-api-fetch/) for API and weather examples
- [`ticket-booking/`](./javascript/ticket-booking/) for a ticket-booking exercise

Most files in this module can be opened directly in a browser. JavaScript files that are referenced by an HTML file should be run through that HTML file.

### 2. React Basics and Hooks

The individual Vite projects demonstrate React concepts progressively:

| Project | Main topic |
| --- | --- |
| [`react-usestate/`](./react-usestate/) | Component state and basic React rendering |
| [`react-useEffect/`](./react-useEffect/) | Side effects, form state, and lifecycle-style behavior |
| [`react-useContext/`](./react-useContext/) | Context API, shared theme state, and forms |
| [`useContext_and_useRef/`](./useContext_and_useRef/) | Context values and references |
| [`react-router/`](./react-router/) | Client-side navigation and routes |
| [`image-slider/`](./image-slider/) | State-driven image navigation |

### 3. React Applications

These projects combine multiple concepts into more complete interfaces:

- [`React/my-project-01/`](./React/my-project-01/) — introductory React application
- [`React/restaurant-project/`](./React/restaurant-project/) — restaurant-themed application
- [`auth-app/`](./auth-app/) — authentication user interface practice
- [`admin-student/`](./admin-student/) — student management application with administrator and student flows

The larger projects use reusable components, pages, assets, and application-level styling. Some applications also demonstrate routing, authentication state, local browser storage, and role-based navigation.

### 4. Static Web Practice

The [`abes-site/`](./abes-site/) folder contains a static HTML page and image assets. It is independent of the Vite projects and can be opened directly in a browser.

## Requirements

- [Node.js](https://nodejs.org/) and npm for the React projects
- A modern web browser
- A code editor such as Visual Studio Code

Check the `engines` field in a project's `package.json`, if present, for its exact Node.js requirement.

## Running a React Project

Each React application is an independent Vite project. Open a terminal in the selected project folder and run:

```bash
npm install
npm run dev
```

Vite will print a local URL, usually `http://localhost:5173`. Open that URL in a browser.

For example, to run the routing project:

```bash
cd react-router
npm install
npm run dev
```

The same process can be used for any of the React project folders listed above. Run only one project at a time unless different projects are configured to use different ports.

## Common Project Commands

The Vite projects generally provide these scripts:

```bash
npm run dev       # Start the development server
npm run build     # Create a production build
npm run lint      # Check the source code
npm run preview   # Preview the production build locally
```

Run commands from inside the project whose source code you want to work with. There is no single root-level npm application because this repository is a collection of independent learning exercises.

## Suggested Learning Order

1. Start with the files in [`javascript/`](./javascript/).
2. Complete the JavaScript assignments and browser exercises.
3. Study [`react-usestate/`](./react-usestate/).
4. Continue with [`react-useEffect/`](./react-useEffect/).
5. Learn shared state through [`react-useContext/`](./react-useContext/) and [`useContext_and_useRef/`](./useContext_and_useRef/).
6. Practice navigation with [`react-router/`](./react-router/).
7. Build and explore the projects in [`React/`](./React/).
8. Finish with [`auth-app/`](./auth-app/) and [`admin-student/`](./admin-student/) to combine the concepts in larger applications.

## Notes

- Every React project has its own `package.json` and dependency installation.
- `node_modules/` and generated build output are local development artifacts and should not be edited manually.
- This repository is intended for learning, experimentation, assignments, and practical college work.
- Project-specific details, credentials, or usage notes are documented in the README inside that project when applicable.

## Author

**Lakshay Aggarwal**  
B.Tech CSE-DS, Section A  
Roll No. 2400321540108
