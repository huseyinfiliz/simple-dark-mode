![](https://cdn.discuss.flarum.org/2026-07-08/1783501038-29273-simple-dark-mode.png)

# Simple Dark Mode

![License](https://img.shields.io/badge/license-MIT-blue.svg)
[![Latest Stable Version](https://img.shields.io/packagist/v/huseyinfiliz/simple-dark-mode.svg)](https://packagist.org/packages/huseyinfiliz/simple-dark-mode)
[![Total Downloads](https://img.shields.io/packagist/dt/huseyinfiliz/simple-dark-mode.svg)](https://packagist.org/packages/huseyinfiliz/simple-dark-mode)

A simple dark mode toggle extension for [Flarum](https://flarum.org) 2.

Simple Dark Mode adds a quick theme toggle to your forum header, allowing users and guests to switch between light and dark mode without opening the full appearance settings.

![](https://cdn.discuss.flarum.org/2026-07-08/1783501049-773127-simple-dark-mode.gif)

## Features

- 🌙 **Quick theme toggle**: Adds a simple light/dark mode button to the forum header.
- 👤 **User preference support**: Logged-in users keep their selected theme through Flarum preferences.
- 👥 **Guest support**: Guest users can also switch themes, with their choice stored locally in the browser.
- ♿ **High contrast support**: Preserves Flarum's high contrast modes when switching between light and dark.
- ⚙️ **Admin settings**: Control header visibility and icon style.

## Installation

```bash
composer require huseyinfiliz/simple-dark-mode:"*"
php flarum cache:clear
```

Then enable the extension from your admin panel.

## Updating

```bash
composer update huseyinfiliz/simple-dark-mode:"*"
php flarum cache:clear
```

## Removing

```bash
composer remove huseyinfiliz/simple-dark-mode
php flarum cache:clear
```

## Notes

This extension is intentionally simple. It does not add a custom theme system; it uses Flarum's existing color scheme support and provides a faster way to switch between modes.

High contrast modes are preserved when toggling:

```text
light     -> dark
dark      -> light
light-hc  -> dark-hc
dark-hc   -> light-hc
```

For guest users, the selected theme is stored in the browser. This means the preference may be cleared if the browser storage is cleared or when using private/incognito mode.

## Links

- [Discuss](https://discuss.flarum.org/d/39530-simple-dark-mode-flarum-2)
- [Packagist](https://packagist.org/packages/huseyinfiliz/simple-dark-mode)
- [GitHub](https://github.com/huseyinfiliz/simple-dark-mode)
- [Issues](https://github.com/huseyinfiliz/simple-dark-mode/issues)

If you liked this extension, don't forget to check out my other extensions too: [huseyinfiliz.com/flarum](https://www.huseyinfiliz.com/flarum-extensions/)

## License

Released under the [MIT License](LICENSE.md).
