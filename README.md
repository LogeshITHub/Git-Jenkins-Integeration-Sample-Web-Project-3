# Product Management System

A full-stack application built with .NET 8 Web API and React (Vite).

## Tech Stack
- **Backend**: ASP.NET Core Web API (.NET 8), Entity Framework Core, Npgsql (PostgreSQL), Clean Architecture.
- **Frontend**: React, Vite, Axios, Plain CSS.
- **Database**: Supabase PostgreSQL.

## Prerequisites
- .NET 8 SDK
- Node.js & npm

## Setup & Run

### Backend
1. Open a terminal in the root directory.
2. The `appsettings.json` is already configured with the database connection.
3. Run the API:
   ```powershell
   dotnet run --project ProductApp.API --launch-profile https
   ```
   The API will start at `https://localhost:7120` (Swagger available at `https://localhost:7120/swagger`).

### Frontend
1. Open a new terminal and navigate to the `frontend` folder:
   ```powershell
   cd frontend
   ```
2. Install dependencies (if not already done):
   ```powershell
   npm install
   ```
3. Start the development server:
   ```powershell
   npm run dev
   ```
4. Open `http://localhost:5173` in your browser.

## Features
- **Product List**: View all products with active status.
- **Add Product**: Form with validation to create new products.
- **Edit Product**: Update existing product details.
- **Delete Product**: Dedicated confirmation page for deletion.
- **Theme**: Premium Dark/Indigo UI.
