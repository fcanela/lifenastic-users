# Service documentation

## Table of Contents

* [General](#general)
* [Requests](#requests)
* [Responses](#responses)
* [Commands](#Commands)
    * [create](#createCommand)
    * [list](#listCommand)
    * [authenticate](#authenticateCommand)

## <a name="general"></a> General

This service uses AMQP as transport layer.

Both requests and responses use JSON.

## <a name="requests"></a> Requests

Service requests must be placed in `lifenastic.topic` exchange.

Two properties are critical to route requests correctly:
* `role`, which is used to bind the exchange to the service instance queue
* `replyTo`, which is needed to know in which queue the response should be placed

Requests directed to this service should always use `users` as `role` value. 

Example:
```
{
    "role": "users",
    "command": "authenticate",
    "email": "test@email.example",
    "hash": "$2a$10$KssILxWNR6k62B7yiX0GAe2Q7wwHlrzhF3LqtVvpyvHZf0MwvNfVu"
}
```

## <a name="responses"></a> Responses

Response includes, at least, an `errors` property. This field is an array which contains errors found during request processing. Checking for errors is as simple as checking if errors length is not zero. 

Each element of this `errors` array is a object with two properties: `code` and `message`. `code` is meant to be used as error identifier meanwhile `message` provides a user-readable description.

## <a name="commands"></a> Commands

Commands are specified using the `command` property in the requests. The following section describes the expected parameters, returned values and errors for each command. `"role": "users"` and `replyTo` property are supposed as required parameters and not mentioned for brevity sake.

### ## <a name="createCommand"></a> `create`

Registers a new user

**Request**

Name | Type | Required | Description
-----|------|----------|-------------
email | string | yes | User email
hash | string | yes | Password hash. Expected bcrypt format but can handle others


**Response**

Field | Type | Description
------|------|----------------
id | integer | Unique user identifier

**Errors**

Code | Description
-----|--------------
EmailRequired | No email field or empty one
HashRequired | No hash field or empty one
EmailAlreadyRegistered | The email have already a registered account

### ## <a name="listCommand"></a> `list`

**Response**

Returns an array of objects with the following fields:

Field | Type | Description
------|------|----------------
id | integer | Unique user identifier
email | string |
createdAt | date | UTC format
updatedAt | date | UTC format


### ## <a name="authenticateCommand"></a> `authenticate`

**Request**

Name | Type | Required | Description
-----|------|----------|----------------
email | string | yes | User email
hash | string | yes | Password hash. Expected bcrypt format but can handle others

**Response**

Returns a object with `authenticated` (boolean) field indicating whenever the credentials are correct or not. 

**Errors**

The following errors could be raised during the process:

Code | Description
-----|--------------
UserNotFound | There is no user registered with the provided credentials
InvalidPassword | User exists but hashes don't match