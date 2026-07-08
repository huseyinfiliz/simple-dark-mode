# Simple Dark Mode

![License](https://img.shields.io/badge/license-MIT-blue.svg) [![Latest Stable Version](https://img.shields.io/packagist/v/huseyinfiliz/simple-dark-mode.svg)](https://packagist.org/packages/huseyinfiliz/simple-dark-mode) [![Total Downloads](https://img.shields.io/packagist/dt/huseyinfiliz/simple-dark-mode.svg)](https://packagist.org/packages/huseyinfiliz/simple-dark-mode)

A [Flarum](https://flarum.org) extension. A single-click light/dark toggle for Flarum 2 — no dropdown, no extra settings page, just a button.

- Logged-in users get the toggle in their session menu, and optionally in the header too.
- Guests get a header button; their choice is remembered per-browser and carried over automatically if they later log in (as long as they haven't already set a preference).

## Installation

Install with composer:

```sh
composer require huseyinfiliz/simple-dark-mode:"*"
```

## Updating

```sh
composer update huseyinfiliz/simple-dark-mode:"*"
php flarum cache:clear
```

## Settings

Available under the extension's admin panel:

- **Always show the theme switch button on the forum header** — off by default for logged-in users (they already have the toggle in their user menu); guests always see it regardless of this setting.
- **Show theme icon in solid style** — switches the sun/moon icon between Font Awesome's regular (outline) and solid styles.

## Links

- [Packagist](https://packagist.org/packages/huseyinfiliz/simple-dark-mode)
- [GitHub](https://github.com/huseyinfiliz/simple-dark-mode)
