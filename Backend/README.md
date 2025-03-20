# CG Diamonds API Documentation

## User Authentication Endpoints

### User Registration

#### Endpoint: `/users/register`

##### Method: POST

##### Description:
Registers a new user with CG Diamonds. Accepts user details, hashes the password, and stores in MongoDB. Returns a JWT token upon successful registration.

##### Request Body:
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john@example.com",
  "password": "Password123"
}
```

##### Validation Rules:
- Email must be valid and unique
- First name must be at least 3 characters
- Password must:
  - Be at least 8 characters
  - Contain uppercase and lowercase letters
  - Contain at least one number

##### Responses:

###### Success (201 Created):
```json
{
  "user": {
    "_id": "user_id_here",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com"
  }
}
```

###### Error (400 Bad Request):
```json
{
  "errors": ["Error message here"]
}
```

### User Login

#### Endpoint: `/users/login`

##### Method: POST

##### Description:
Authenticates a user and returns a JWT token.

##### Request Body:
```json
{
  "email": "john@example.com",
  "password": "Password123"
}
```

##### Responses:

###### Success (201 Created):
```json
{
  "token": "jwt_token_here"
}
```

###### Error (401 Unauthorized):
```json
{
  "message": "Invalid email or password"
}
```

## Seller Authentication Endpoints

### Seller Registration

#### Endpoint: `/sellers/register`

##### Method: POST

##### Description:
Registers a new seller with CG Diamonds. Includes additional verification steps.

##### Request Body:
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john@example.com",
  "password": "Password123",
  "pnumber": "1234567890"
}
```

##### Validation Rules:
- Email must be valid and unique
- First name must be at least 3 characters
- Password must:
  - Be at least 8 characters
  - Contain uppercase and lowercase letters
  - Contain at least one number
- Phone number must:
  - Be between 10-15 digits
  - Contain only numbers

##### Responses:

###### Success (201 Created):
```json
{
  "user": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com",
    "pnumber": "1234567890",
    "status": "Inactive"
  }
}
```

### Seller Login

#### Endpoint: `/sellers/login`

##### Method: POST

##### Description:
Authenticates a seller and returns a JWT token. Checks account status before login.

##### Request Body:
```json
{
  "email": "john@example.com",
  "password": "Password123"
}
```

##### Responses:

###### Success (201 Created):
```json
{
  "token": "jwt_token_here"
}
```

###### Error (401 Unauthorized):
```json
{
  "message": "Account is inactive. Wait for conformation."
}
```


