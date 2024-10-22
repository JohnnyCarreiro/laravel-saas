# Create a Laravel Project

Requirements:

- PHP^8.3.12
- Node^20.18
- Bun^1.1.19

Before start you project ensure to install all dependencies from all resources
**for Laravel run**

```bash
composer install
```

**for React**

```bash
bun install
```

### Migrations e Database

Before start run database migrations and database seeds

```bash
php artisan migrate:refresh --seed
# form seeding
```

```bash
php artisan migrate:refresh
# only migrations
```

To create a new resources we can use artisan cli, by typing:

```bash
php artisan make:<resource> --<params>
```

## Creating Models

```bash
php artisan make:model Project -mf
```

this will create a new Model with migrations file and Model Factory

## Creating controller

```bash
php artisan make:controller ProjectController --model=Project --requests --resource
```

## List Routes available and controllers

```bash
php artisan route:list
```

## Create Resources

```bash
php artisan make:resource ProjectResource
```
