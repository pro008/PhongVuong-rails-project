# User Task Introduction

The app is built by React and Ruby as a main core
## Technologies index
- **Docker, Docker-compose** based on Alpine Linux
- **React, Redux** use for  Front-End
- **Ruby on Rails** use for  Back-End
- **Authentication** by cookie
- **PostgreSQL** for Database

## Installation

### Back-End

```bash
docker-compose build # build image

docker-compose run app bundle exec rails db:create # create database

docker-compose run app bundle exec rails db:migrate # migrate

docker-compose up # check on http://localhost:3000/
```

### Front-End
Because the front-end is not attached to the docker-compose yet so we have to run it manually

```bash
cd front-end # from the project directory
npm install
npm run dev # to start the server -> http://localhost:8080/
```

## Noted
- Must run the app on **localhost:port** due to rack-cors settings
- Must run db:create and db:migrate
- Didn't apply memcached yet, user can remove this image for now
- Run **bundle exec rspec** for basic model testing



## Todo
- Apply memcached
- Improve app performance
- Refactor code, make it cleaner
- Apply role and ability

## Library Use in project
- **Ruby**: rack-cors, unicorn
- **React**: redux, react-redux, redux-form, react-router-dom, lodash, webpack

## Thank You