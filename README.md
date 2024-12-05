### Hexlet tests and linter status:
[![Actions Status](https://github.com/YuWizz/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/YuWizz/frontend-project-46/actions)

[![Maintainability](https://api.codeclimate.com/v1/badges/02caa56d1dadf775f8ea/maintainability)](https://codeclimate.com/github/YuWizz/frontend-project-46/maintainability)

[![hexlet-check](https://github.com/YuWizz/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/YuWizz/frontend-project-46/actions/workflows/hexlet-check.yml)


# genDiff

[![Test Coverage](https://api.codeclimate.com/v1/badges/02caa56d1dadf775f8ea/test_coverage)](https://codeclimate.com/github/YuWizz/frontend-project-46/test_coverage)

`genDiff` — a tool for comparing two files. It finds differences between data structures.

## Examples

- **Compare flat files (JSON)**:
    [Demo](https://asciinema.org/a/VuteGaBhhIkXV8ChXvLLXRT6o)

- **Compare flat files (YAML)**:
    [Demo](https://asciinema.org/a/8T2V43zGHk4sGPfVh8JL7gnd2)

- **Recursive comparison**^
    [Demo](https://asciinema.org/a/CAl3sXwFdaKuNPQhF1x4xVHE1)

- **Flat format**:
    [Demo](https://asciinema.org/a/WJxJAcERbruxS9GnKcKHYuMlx)

- **JSON output**:
    [Demo](https://asciinema.org/a/j60xc30mYiNPh1cgsHcIWoB9L)

## Features

- Support for file formats: `JSON` и `YAML`.
- Three output formats:
  - `stylish` (default) — tree-like representation of changes.
  - `plain` — a text-based list of changes.
  - `json` — output in JSON format for integration with other systems.

## Installation

You can install genDiff using the command:

```bash
npm install
