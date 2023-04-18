# Awesome Project Build with TypeORM

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `data-source.ts` file
3. Run `npm start` command

For migration run this command

* Syntax: ```npx typeorm-ts-node-esm migration:generate <path/to/migrations>/migration-name -d <path/to/data-source.ts>```
* Example: ```npx typeorm-ts-node-esm migration:generate ./src/database/migrations/create-tables -d ./src/database/datasource.ts```

For running migration run this command

* Syntax: .
* Example: ``````

## TODO

- Add roles to the app
