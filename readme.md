# Boilerplate for express rest api

Feature list

| Name          | Desc                                | Status |
| ------------- | ----------------------------------- | ------ |
| Endpoints     | Template for routes                 |        |
| .env creation | Create a .env variable              |        |
| jest testing  | Create tests with jest on endpoints |        |

What's done on initialization

- Create a .env file with the necessary process variables
  - Port
  - Secret


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