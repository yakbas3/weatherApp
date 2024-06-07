The app is very simple and has a frontend, backend, and database components.

FRONTEND

Made in react. The client restricts access to certain pages like Admin panel and requires a JWT to authenticate which users can access the panel. Other than that it does various data display's and allows CRUD operations, mainly by admins.

BACKEND

Made in ASP.NET. The API interacts with the database and React client. Encodes data and generates JWT. Many of the endpoints of the API are protected and require JWT for CRUD actions.

DATABASE

A regular MySQL database, hold weather and user information. There is also a table for user logs but I haven't implemented that yet, kind of got bored.

THINGS TO DO:

I am gonna use a public free API to get real weather data for the home page but the admins will still be able to input data by hand.

Implement the user logs bookkeeping functionality.

Add Salt Encryption to the passowords when the user is registering.
