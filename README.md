JWT Auth
============

Version 0.1.0

Issues and verifies JWT tokens

## Endpoints:

### GET /
Information about the microservice

```js
{
	name: pkg.name,
	version: pkg.version,
	description: pkg.description,
	repository: pkg.repository.url 
}
```

### POST /login
Issues a token

Parameters you'll need to pass in the request object:

```json
{
	"user" : "pepe",
	"password" : "pepe",
}
```

Returns:
```json
{
	"token" : "JWT"
}
```


### POST /me
Validates a token and sends back the token payload

Parameters you'll need to pass in the request object:

```json
{
	"token" : "jwt"
}
```

Returns the decoded token payload
```json
{
	"user" : "pepe",
	"foo"  : "bar"
}
```

## Generating certs

1. Generate a public and private RSA key pair like this:
```sh
openssl genrsa -des3 -out private.pem 2048
```
2. Export the RSA Public Key to a File:
```sh
openssl rsa -in private.pem -outform PEM -pubout -out public.pem
```
2. Exports the Private Key:
```sh
openssl rsa -in private.pem -out private_unencrypted.pem -outform PEM
```

## Dev

1. To start the dev server:
```sh
grunt server
```
It will watch your files and it will restart the server when they change