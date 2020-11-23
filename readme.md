# Boilerplate for express rest api

```
$ git clone https://github.com/EarthenLynx/express-boilerplate.git
```

cd into the directory and

```
$ npm init
```

Feature list

| Name          | Desc                                | Status |
| ------------- | ----------------------------------- | ------ |
| Endpoints     | Template for routes                 | todo   |
| .env creation | Create a .env variable              | done   |
| jest testing  | Create tests with jest on endpoints | todo   |

What's done on initialization

- Create a .env file with the necessary process variables
  - Host and Port
  - Node environment
  - Api Version and the path for the docs
  - A secret to be used for jwt or such


## Descibe a get - request

```yaml
/user/:id:
  get:
    summary: Returns a user by its id
    tags: [Users]
    consumes:
     - application/json
    produces:
     - application/json
    parameters:
     - in: path
       name: id
       schema:
         type: string
       required: true
       description: Unique ID of the user
    responses:
      200:
        description: Users
        schema:
          type: object
          $ref: '#/components/schemas/User'
```

## Describe a post - request with the body to be sent

```yaml
/user:
  post:
    summary: Creates a new user and writes it to the database
    tags: [Users]
    consumes:
     - application/json
    produces:
     - application/json
    # Describe the request body with a schema
    requestBody:
     description: Do a post request towards the database
     required: true,
     content:
       application/json:
         schema:
           $ref: '#/components/schemas/User'
    responses:
      200:
        description: OK
      500:
        description: Bad request. Not all necessary params have been provided

```