# npm-pohlman
My npm package for short commands

# Npm Package Pohlman

![Build Status](https://github.com/Ridvan-bot/npm-pohlman/actions/workflows/deploy.yml/badge.svg)
![GitHub tag (latest SemVer)](https://img.shields.io/github/v/tag/Ridvan-bot/npm-pohlman?label=version&sort=semver)
![Last Commit](https://img.shields.io/github/last-commit/Ridvan-bot/npm-pohlman)
![GitHub issues](https://img.shields.io/github/issues/Ridvan-bot/npm-pohlman)
![GitHub pull requests](https://img.shields.io/github/issues-pr/Ridvan-bot/npm-pohlman)

## Installation

To install the package globally, run:

```sh
npm install -g pohlman
```

To install the package locally, run:

```sh
npm install pohlman
```

## Usage

Here are the available commands you can run with `pohlman`:

### Show Version

To show the version of the `pohlman` package:

```sh
pohlman -v
pohlman --version
```

### Show Help

To show the help message with available commands:

```sh
pohlman -h
pohlman --help
```

### Rebuild

To reset the local repository to match the GitHub repository:

```sh
pohlman rebuild
```

### Create New Project

To create a new backend project with TypeScript and necessary configurations:

```sh
pohlman new project
```

This command will:
- Initialize a new npm project
- Install TypeScript and necessary type definitions
- Initialize a TypeScript configuration file
- Install `ts-node`
- Create a `.gitignore` file
- Create CI/CD workflow files in `.github/workflows`

For more information, visit [https://github.com/Ridvan-bot/npm-pohlman](https://github.com/Ridvan-bot/npm-pohlman)

##
<p align="center">
  Crafted with care by <strong>Robin Pohlman</strong> at <strong>Pohlman Protean AB</strong>.
</p>
