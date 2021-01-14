# SWAPI-Backend

## Normal Setup
- Start your MySQL instance and create a database called _"swapi_db"_, OR use an existing database of your choice and modify the variables in the Docker Compose file while making sure that they correspond to each other on the different services.

- On the terminal, run _"npm run start"_ or _"nodemon"_ to start the development server.

## Setup Using Docker
On the command line, while in the root directory of the project,

- Run "docker-compose up __build"

- Run *_"docker exec -it swapi-backend_swapi_1 sh"_* 

(where "swapi-backend_swapi_1 sh" is the name of the Node JS container;obtained by running _"docker ps"_) to ssh into the Node JS container, 

- then, run *_"npm run migrate && npm run seed"_* to run the necessary migration and seeding.
Open localhost:3000/v1 in your browser;