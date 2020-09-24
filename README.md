# Deployment:

```
heroku create
```

Add addon for PostgreSQL in heroku dashboard.

```
heroku config:set NODE_ENV=production
heroku run npx sequelize db:migrate
```

# Production

https://ak-storage-api.herokuapp.com

## Examples:

### Storage API

- Encrypt value:

```
 curl -X POST -H 'Content-Type: application/json' --data '{"encryption_key":"secure-key","value":{"key1":"value1"}}' https://ak-storage-api.herokuapp.com/storage/example-1/set
```

 - Decrypt value:
```
curl -X POST -H 'Content-Type: application/json' --data '{"decryption_key":"secure-key"}' https://ak-storage-api.herokuapp.com/storage/example-*/get
```