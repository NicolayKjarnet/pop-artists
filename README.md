# Pop Artists API

A full-stack application for managing artists, albums, and songs. The backend is built with .NET/C# and Entity Framework Core; the frontend is built with React and TypeScript.

The database is seeded on startup with ten artists, each having two albums and associated songs.

## Tech Stack

- **Backend**: .NET, C#, Entity Framework Core, SQLite
- **Frontend**: React, TypeScript

## Setup

### Backend

**Prerequisites**: [.NET SDK](https://dotnet.microsoft.com/download), [Entity Framework Core tools](https://docs.microsoft.com/en-us/ef/core/cli/dotnet)

```sh
cd backend
dotnet ef migrations add InitialCreate
dotnet ef database update
dotnet watch run
```

The API and Swagger UI will be available at `http://localhost:5000` (or the port shown in the terminal output).

### Frontend

**Prerequisites**: [Node.js and npm](https://nodejs.org/)

```sh
cd frontend
npm install
npm start
```

The frontend will be available at `http://localhost:3000`. The backend must be running for data and CRUD operations to work.

## Environment Variables

Both `frontend` and `backend` directories contain a `.env.example` file. Copy each to `.env` and update the values to match your local setup.

**Backend `.env`**
```
API_URL=https://localhost:7000/
SWAGGER_URL=https://localhost:7000/swagger/index.html
```

**Frontend `.env`**
```
REACT_APP_API_URL=https://localhost:7000/
```
