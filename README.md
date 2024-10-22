# Create a Laravel Project

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
