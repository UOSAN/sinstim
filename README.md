# sinstim
The `sinstim` project collects image ratings for recognizability and desirability.
It has three components: 
  1. an eligibility survey that collects demographic data about a participant,
     and their experience with certain foods and recreational drugs
  2. a picture survey that displays images that are rated for desirability and
     recognizability
  3. an admin interface for generating some reports

## Prerequisites:

- [.NET 5.0](https://dotnet.microsoft.com/download/dotnet/5.0)
  - Install the SDK, the ASP.NET Core Runtime and .NET Runtime
- [MySQL database](https://dev.mysql.com/downloads/mysql/)
- `node` and `npm`
  - Installed via `brew install node` on macOS

## Installation
Create a database locally for development purposes. For example, to create a database named `sinstim-dev`
with a single user, use the following set of commands on the MySQL command line:
```
mysql> create database `sinstim-dev`;
mysql> create user 'sinstim'@'localhost';
mysql> grant all on `sinstim-dev`.* to 'sinstim'@'localhost';
mysql> flush privileges;
```

Edit the `appsettings.Development.json` file, so the `DefaultConnection` field of the `ConnectionStrings` configuration
matches the database and user just created. For example,
`Database` set equal to the database just created (`sinstim-dev`),
`Data Source` set equal to the name of computer hosting the database (`localhost`),
and `User Id` set equal to the user just created in the database (`sinstim`),
so the entire connection string is
```
"ConnectionStrings": {
	"DefaultConnection": "Database=sinstim-dev; Data Source=localhost; User Id=sinstim;"
}
```

From the project root directory, create the database schema and tables using
`dotnet ef database update`.

Change into the ClientApp directory and install the required `node` packages using `npm install`.

Run `npm run build` to create the JS bundles,
using [webpack](https://webpack.js.org/guides/getting-started/#npm-scripts),
that are used in the client app.

## Configuration
Create the environment variables `ADMIN_USER` and `ADMIN_PASSWORD`. For example,
one way to do this is to create a `project.env` file with the following contents
```
ADMIN_USER=admin
ADMIN_PASSWORD=admin
```
and refer to that file in Visual Studio Code's launch.json file `envFile` configuration:
```
"envFile": "${workspaceFolder}/project.env"
```

## Debugging / development
Use [Visual Studio Code](https://code.visualstudio.com/),
`Start Debugging` from the `Run` menu to build and start the application.
The admin page should open automatically in a browser, and is available at
https://localhost:5001/Home/Admin.

To use [`storybook`](https://storybook.js.org/) to develop UI components, run `npm run storybook`,
and access these components at http://localhost:6006.
