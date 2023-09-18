# HTML Head Items

![License](https://img.shields.io/badge/license-MIT-blue.svg) [![Latest Stable Version](https://img.shields.io/packagist/v/ianm/html-head.svg)](https://packagist.org/packages/ianm/html-head)

A [Flarum](http://flarum.org) extension that offers a seamless way to add custom items to the HTML &lt;head&gt; section of your forum.

### Features

- **Easy Integration**: With just a few clicks, forum administrators can embed additional items directly into the forum's HTML <head>. This is particularly useful for adding meta tags, styles, or any other custom scripts.

- **Clean UI**: The extension provides a user-friendly interface that makes it simple to manage and view all added items.

- **Cache Management**: Any changes made to the head items are automatically reflected, thanks to the efficient cache management in place. This ensures that your updates are immediately visible without any additional steps.

- **Error Handling**: In the event that an invalid header item is added, the extension intelligently logs the error, ensuring the forum's functionality isn't compromised.

![image](https://user-images.githubusercontent.com/16573496/104105231-a3bb3000-52a4-11eb-97dc-d4c097471ebd.png)

![image](https://user-images.githubusercontent.com/16573496/104105258-cc432a00-52a4-11eb-8ee6-51d75c731b51.png)

### Usage

To use the extension, simply navigate to the admin dashboard. Here you'll find the option to add or modify items that will be included in the forum's HTML `<head>`.

### Installation

Install manually with composer:

```sh
composer require ianm/html-head:"*"
```

### Updating

```sh
composer update ianm/html-head
php flarum cache:clear
```

### Links

- [Packagist](https://packagist.org/packages/ianm/html-head)
- [GitHub](https://github.com/imorland/html-head)
- [Discuss](https://discuss.flarum.org/d/25907)

