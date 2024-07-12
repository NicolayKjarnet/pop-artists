# Pop Artists Api

This repository contains a .NET/C# backend and a React TypeScript frontend for managing artists, their albums, and songs. Follow the steps below to set up and run the application on your local machine.

## Backend

The backend includes a file, `DbInitializer.cs`, that populates the database with ten artists, each having two albums and songs. Follow these steps to set up and run the backend:

### Prerequisites
- [.NET SDK](https://dotnet.microsoft.com/download)
- [Entity Framework Core](https://docs.microsoft.com/en-us/ef/core/)

### Steps

1. Open a terminal and navigate to the `backend` folder.
2. Run the command to add the initial migration:
   ```sh
   dotnet ef migrations add InitialCreate
   ```
   This will create a Migrations folder in the backend directory.

3. If the migration is successful, update the database:
   ```sh
   dotnet ef database update
   ```
   This will create and populate the database with initial data.

4. Run the backend server:
   ```sh
   dotnet watch run
   ```
   If successful, this will open a Swagger UI at `http://localhost:5000` (or another port if specified). Here, you can test all the endpoints and see how the backend works.

## Frontend

Ensure the backend is running before starting the frontend to enable full functionality. The frontend will load without the backend, but it won't display the artists from the database, and the CRUD operations will fail.

### Prerequisites
- [Node.js and npm](https://nodejs.org/)

### Steps

1. Open a terminal and navigate to the `frontend` folder.
2. Install the required node modules:
   ```sh
   npm install
   ```
3. Start the frontend application:
   ```sh
   npm start
   ```
   This will launch the frontend at `http://localhost:3000`.

## Environment Variables

Two `.env.example` files are provided in the codebase, one for the frontend and one for the backend. These files are set up as templates for your `.env` files.

### Steps

1. In the root of both the `frontend` and `backend` folders, create a new file named `.env`.
2. Copy the content from the corresponding `.env.example` file into the new `.env` file.
3. Update the paths and any other required configuration values. For example, the backend URL in the frontend `.env` file should point to the Swagger endpoint.

#### Example for Backend .env
```ts
API_URL=https://localhost:7000/
SWAGGER_URL=https://localhost:7000/swagger/index.html
```
#### Example for Frontend .env
```ts
REACT_APP_API_URL=https://localhost:7000/
```
Ensure that the paths and URLs are correctly set up to reflect your local setup. 

## Finding Your Localhost URL

You can go to the Swagger site (by running `dotnet watch run` in the backend root folder) to find the localhost URL you're currently running on:

<img width="428" alt="Skjermbilde 2024-07-12 kl  12 18 16" src="https://github.com/user-attachments/assets/0d279398-b943-4c21-9654-0bce0420c257">

The URL will also be shown when clicking on the GET method of artist, album, or song:

<img width="323" alt="Skjermbilde 2024-07-12 kl  12 20 28" src="https://github.com/user-attachments/assets/62d15464-84a0-413a-be2d-3042871a3a9f">


## Additional Notes

- Ensure that your development environment meets all the prerequisites listed above.
- If you encounter any issues, check the logs in the terminal for more information.

Happy coding!
