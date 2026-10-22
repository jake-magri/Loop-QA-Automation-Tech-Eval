# Loop QA Automation Technical Evaluation

![Playwright](https://img.shields.io/badge/Playwright-2EAD33?logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)

![Tests](https://img.shields.io/badge/Tests-6%2F6%20Passed-2EAD33?style=for-the-badge&logo=playwright&logoColor=white)

## Overview

An automated UI testing suite developed for the Loop Software QA Automation Engineer technical evaluation. Built with Playwright and TypeScript, the suite verifies task management functionality across web and mobile application views.

Test cases are driven by external JSON data, allowing task titles, statuses, application views, and expected tags to be maintained separately from the test logic.

## Table of Contents

- [Overview](#overview)
- [Test Results](#test-results)
- [Video Walkthrough](#video-walkthrough)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Running the Tests](#running-the-tests)
- [Test Coverage](#test-coverage)
- [Design Decisions](#design-decisions)
- [License](#license)

## Test Results

**Latest local test run: 6 passed, 0 failed.**

| Result | Count |
|:---|---:|
| ✅ Passed | 6 |
| ❌ Failed | 0 |
| **Total** | **6** |

## Video Walkthrough

The video walkthrough demonstrates the test suite structure, JSON-driven test data, locator decisions, and overall automation approach.

https://github.com/user-attachments/assets/4c31eafd-813b-495d-81c3-bd6a33bcc1fd

## Features

- Automated authentication using environment-based credentials.
- JSON-driven test cases.
- Verification of task titles and status columns.
- Validation of task tags, including multiple tags per task.
- Coverage across web and mobile application views.
- Semantic Playwright locators and descriptive assertion messages.
- Independently reported test cases for easier debugging.

## Technology Stack

- **Playwright Test** — browser automation and assertions
- **TypeScript** — test implementation
- **Node.js and npm** — runtime and dependency management
- **JSON** — externalized test data
- **dotenv** — environment variable configuration

## Project Structure

    Loop-QA-Automation-Tech-Eval/
    ├── docs/
    │   └── video/
    │       └── Qa-Automation-Walkthrough.mp4
    ├── node_modules/
    ├── playwright-report/
    ├── test-data/
    │   └── tasks.json
    ├── test-results/
    ├── tests/
    │   └── example.spec.ts
    ├── .env
    ├── .gitignore
    ├── package-lock.json
    ├── package.json
    ├── playwright.config.ts
    └── README.md

## Getting Started

### Prerequisites

- Node.js and npm
- Git
- Access to the assessment application and its test credentials

### Installation

Clone the repository and install dependencies:

    git clone git@github.com:jake-magri/Loop-QA-Automation-Tech-Eval.git
    cd Loop-QA-Automation-Tech-Eval
    npm install
    npx playwright install

### Environment Configuration

Create a `.env` file in the project root:

    DEMO_USERNAME=your_username
    DEMO_PASSWORD=your_password

Replace the placeholder values with your authorized assessment credentials.

**Security:** Keep `.env` excluded from version control. Never commit credentials to the public repository.

## Running the Tests

Run the complete test suite:

    npx playwright test

Run tests with a visible browser:

    npx playwright test tests/example.spec.ts --headed

View the HTML report:

    npx playwright show-report

## Test Coverage

The suite generates six independent test cases from `test-data/tasks.json`.

| Application | Task | Expected Status |
|---|---|---|
| Web Application | Implement user authentication | To Do |
| Web Application | Fix navigation bug | To Do |
| Web Application | Design system updates | In Progress |
| Mobile Application | Push notification system | To Do |
| Mobile Application | Offline mode | In Progress |
| Mobile Application | App icon design | Done |

Each test verifies that:

1. The sign-in interface is available and authentication succeeds.
2. The expected application view is selected.
3. The task appears in its expected status column.
4. Every expected tag is visible on the corresponding task card.

## Design Decisions

### Data-Driven Testing

Task titles, application views, statuses, and expected tags are maintained in JSON rather than duplicated throughout the test implementation. This separates test data from test logic and simplifies future updates.

### Semantic Locators

The suite prioritizes accessible roles and names to make interactions more representative of user behavior.

For the mobile navigation control, the locator uses the more stable `Mobile Application` name rather than depending on the additional `Native` subheading identified during Playwright Codegen. This assumes the partial name identifies a unique button.

### Dynamic Status Assertions

Status headings contain task counts that may change. Regular expressions match the expected status while allowing the count to vary, avoiding dependence on fixed counts.

### Scoped Assertions

Task verification is scoped to the expected status column, and tag assertions are scoped to the corresponding task card. This reduces the risk of accidentally matching unrelated elements elsewhere on the page.

## License

This project was created for the Loop Software QA Automation Engineer technical evaluation. No separate open-source license is specified.
