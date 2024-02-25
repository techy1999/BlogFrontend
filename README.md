# NOMADS

# Setup Locally
- Go inside the BlogFrontend Folder
- install package  
    ```npm i ```
- create a file .env.local

```
REACT_APP_DEV_URL="http://localhost:8000/api"
REACT_APP_PROD_URL="https://www.nomads.solutions/api"
REACT_APP_ENVIRONMENT="development" #Change it to "development" for local development testing.
```
- npm start


# Steps for Frontend Deployment

1. npm run build
2. Go to build folder 
3. Login into aws, go to s3 service and Choose frontend bucket
4. Delete all the file.
5. Drag and drop all files of build in s3 bucket
6. deployment is done.

Follow steps for branching - issue - [#2](https://github.com/techy1999/BlogFrontend/issues/2)
