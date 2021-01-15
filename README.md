# SWAPI-Backend
Live Link: https://swapi-backend.herokuapp.com/

Swagger Doc: https://swapi-backend.herokuapp.com/

## Routes
- **GET v1/movies** 

To get a list of all movies;  including opening crawls and comment counts: sorted by release date from earliest to newest
- **GET v1/movies/:movieId/comments** 

To get a list of anonymous comments on made on a movie
- **GET v1/movies/:movieId/characters** 

To get a list of characters on a movie; sorted by name or height in ASC or DESC; also filtered by gender
- **POST v1/movies/comment/add** 

To add an anonymouse comment on a movie and save to the database

# Development
## Normal Setup
- Start your MySQL instance and create a database called _"swapi_db"_, OR use an existing database of your choice and modify the variables in the Docker Compose file while making sure that they correspond to each other on the different services.

- On the terminal, run _"npm run start"_ or _"nodemon"_ to start the development server.

## Docker Setup
On the command line, while in the root directory of the project,

- Run "docker-compose up __build"

- Run *_"docker exec -it swapi-backend_swapi_1 sh"_* 

(where "swapi-backend_swapi_1 sh" is the name of the Node JS container;obtained by running _"docker ps"_) to ssh into the Node JS container, 

- then, run *_"npm run migrate && npm run seed"_* to run the necessary migration and seeding.
Open localhost:3000/v1 in your browser;