# EnzoStore## db.js
    This is where we define the standard of operation (SOP) on how to connect to our database.

    Requirements:
    1. mongoose (Logistics company)
    2. connectDB fxn (Supply chain manager)
    3. export default connectDB (Make the SOP available for use in index.js/server.js)

## index.js/server.js : 
    This is where we set up the program that will listen to a specified port for user request and send/return a response.

    Parts:
    1. Before creating an instance of the express app
        (a) Import all neccessary packages and utils.
        (b) configure the dotenv and bind the port
        (c) connectDB
    2. The creating of the app
        (a) create an instance of the express app
        (b) add the middlewares to the app
        (c) define a route and the response
        (d) define a route for the app to listen 

## userModel.js:
    This is where user properties are difine

    1. Create a userSchema using the mongoose.Sxhema() method
    2. compile the userChema using the mongoose.model('ModelName', schema, 'collectionName') method.

## asynHandler.js:
    This is where the asynHandler function is created. The function wraps an async function. If an async function succeeds, it returns the result as a promise. Else, it uses the catch method to handle the error gracefully. 

## userRoutes.js"
This is where we create routers(delibery trucks) and define routes(addressess) to which a specific request (GET, POST, PATCH, DELETE) will be carried out

## userController.js

### logoutUser:
Since the token is what gives the logged in user access, the logout function clears the `jwt` cookie by setting it to an empty value and an expired date `new Date(0)`

## authMiddleware.js:
This is where we verify if a exists and if the existing user has authorized access. 
`authenticate: `  
    We find the userid and password by decoding the token in the jwt cookie. If it matches, then the authentican is succesful and the user can continue with their activity. Else, user's access is blocked
`authorizeAdmin: `
    Here we check if the user is aurhenticated and if the isAmin property of the User is true. 