<h1 align="center"> ✨Nomads.solutions ✨ </h1>

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

### About
```nomads.solution``` is upcoming project for learner to learn new skill. Technical contribution to project. Writing blog and many other thing are under pipeline.

## Features

> Guest User
- Home page 
- Blog 
- Login
- Register

> Logged User
- Home Page
- Blog
- My blog
- create blog
- logout
- profile


## Tech

- [Reactjs] - 
- [Redux] - 
- [MUI-Material] -
- [MUI-Icons] - 
- [NodeJs] -
- [HTML/CSS] - 


## Setup Locally
- Clone the repository ``` git clone <url> ```
- Go inside the ```BlogFrontend``` Folder
- install package ```npm i ```
- create a file ``` .env.local ```
- Paste below code in ```.env.local ```

    ```
    REACT_APP_DEV_URL="http://localhost:8000/api"
    REACT_APP_PROD_URL="https://www.nomads.solutions/api"
    REACT_APP_ENVIRONMENT="production" #Change it to "development" for local development testing.
    ```
- To start the project run command ```npm start```
- Try to access the website in browser ```http://localhost:3000/```

# How to contribute and guidelines
- Clone the repository ``` git clone <url> ```
- Follow above steps ``` ## Setup Locally ``` to setup locally 
- Go to issue tab and start picking the new issue or discussion form to get the update
- Pick an issue by putting the comment in the issue
- Once picked create a new branch following 

    - ### Steps to follow 
        1. Create a branch from main
        2. Naming format

        ```
            For feature - feature/yourgithubuser/[yr-<year>]/issuenumber
            For bug - bug/yourgithubuser/[yr-<year>]/issuenumber

        ```

        3. checkout to that branch
        ```

            git checkout -b branch_name 

        ```

        4. start working on branch

        5. once done 
            ```
                git add . # add all the stage
                git commit -m "<meaning commit message>"  #commit your changes with proper message
                git  push origin branch_name   #push your code

            ```
        6. now go to the UI ie. github.com and create a new pr 
        7. you can follow some tutorial as well [here](https://www.youtube.com/watch?v=8lGpZkjnkt4)

  > note :- Always take pull from main , keep your code updated always ! 

## Learning

Learning resource for new contributors 

| Plugin | README |
| ------ | ------ |
| Reactjs | [https://react.dev/learn] |
| Material UI | [https://mui.com/material-ui/all-components/] |
| Image | [https://undraw.co/illustrations] |
| Github | [https://www.youtube.com/watch?v=RGOj5yH7evk&t=425s]


===================================

> # Note :- For learning purpose only.(For admin)

> Phase 1. 

### How to Setup for deployment on S3 

We are using s3 for deployment of our website 
- Create public bucket with public access , access policy is below
- enable static hosting.
- enable acl.

   ```
    {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Effect": "Allow",
                "Principal": "*",
                "Action": "*",
                "Resource": "arn:aws:s3:::nomadsfrontendproduction/*"
            }
        ]
    }

   ```
- create build and drag and drop
- Automatically deployed.

### In our case we have a CI/CD pipeline which runs whenever new code is merged in the main branch

> How setup is done. 
 
1. create action runner in github
2. create env file and name is similar in code below 
    - create env in github  go to setting >  secrets and variables> Action > New repository secret 

        ```
            REACT_APP_DEV_URL="http://localhost:8000/api"
            REACT_APP_PROD_URL="https://www.nomads.solutions/api"
            REACT_APP_ENVIRONMENT="production" #Change it to "development" .

        ```
   - create for aws named
        ```
            S3_BUCKET=xxxxxxx # get it from aws s3 bucket name
            AWS_SECRET_ACCESS_KEY=xxxxx  # Get from IAM user create security credentials
            AWS_SECRET_ACCESS_ID=xxxxx # Get from IAM user create security credentials

        ```

3. Put below code 

```

name: React CI

on:
  push:
    branches: [ "main" ]

jobs:
  build:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [18.x]
    
    steps:
      - uses: actions/checkout@v1
      - run: npm ci
      - run: npm install
      - run: |
          touch .env
          echo "${{secrets.NOMADS_FRONTEND_ENV}}" > .env
      - run: CI=false npm run build
      - uses: jakejarvis/s3-sync-action@master
        with:
          args: --acl public-read --follow-symlinks --delete
        env: 
          AWS_S3_BUCKET: ${{ secrets.S3_BUCKET }}
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          AWS_REGION: 'us-east-1'   # optional: defaults to us-east-1
          SOURCE_DIR: 'build'      # optional: defaults to entire repository


```

> Phase 2.

Deployment using creating build deployed on aws using ```nginx```  and url to ```www.nomads.solutions```


## License
MIT
   