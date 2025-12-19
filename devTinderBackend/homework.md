- create a repository
- initialize the repository
- node modules, package.json, package-lock.json
- install express
- create a server
- listen to port 7777
- write request handlers for /test, /hello
- install nodemon and update scripts inside package.json
- what are dependencies
- what is the use of "-g" whicle npm is running
- difference between caret and tilde (^ vs ~)

- initialize git
- .gitignore
- create a remote repo on github
- push all code to remote origin
- play with routes and route extension for example /hello , /hello/2
- order of the routes matter a lot
- install postman app and make a workspace/collection > test API call
- write logic to handle GET, POST, PATCH, DELETE api calls and test on postman
- explore routing and use of ?, +, (), *  in the route (now after version 4 this is changed, so use direct regex(not in string format as explained in video))
- use of regex in routes /a/, /.*fly$/
- reading the query params in the routes
- reading the dynamic routes

- multiple route handlers - play with the code
- next()
- next function and errors along with res.send()
- app.use("/route", rH, [rH2, rH3, rH4], rH5, rH6);
- what is middleware? Why do we need it?
- how express JS basically handles requests behind the scene
- difference app.use and app.all
- write a dummy auth middleware for admin
- write a dummy auth middleware for all user routes, except /user/login
- error handling using app.use("/", (err, res, req, next) => {});


- create a free cluster on MongoDb official website(Mongo Atlas)
- install mongoose library
- connect your application to the database "Connection-url"/devTinder
- call the connectDb functiono and connect to database before starting application on 3000
- Create a userSchema &  user Model
- Create POST /signup API to add data to database
- why _id, --v is added in db
- Push some documents using API calls from postman
- Error handling using try, catch

- JS object vs JSON (difference)
- Add the express.json middleware to your app
- Make your singup API dynamic to receive data from the end user
- User.findOne() with duplicate email ids, which object returned
- API - Get user by email
- API - Get all the user from the database
- API - Get user by ID
- API - Create a delete user API
- API - Create a API to update user 
- Difference b/w patch and put method
- Explore the Mongoose Documentation for "Model" methods
- What are options in a Model.findOneAndUpdate method, explore more about it
- API - Update the use with email ID

- Explore schemaType optins from the documentation
- add required, unique, lowercase, min, minLength, trim
- Add default
- Create a custom validate function for 
- Improve the DB schema - put all appropriate validations in each field in schema
- Add timestamps to the userSchema
- Add aPI level validation on Patch request
- Data sanitization => Add API validation in each field in model
- install validator
- explore validator library function and use validator function for password, email, url
- never trust req.body

- READ ABOUT BUFFER

- Validate data in Signup API
- Install bcrypt package
- Create PasswoedHash using bcrypt.hash & save the use is excrupted password
- Create login API
- Compare passwords and throw errrors if email or password is invalid

- install cookie-parser
- just send a dummy cookie to user
- create GET/profile API and check if you get the cookie back
- install jsonwebtoken
- In login API, after email and password validation, create a JWT token and send it to user in cookie
- read the cookies inside your profile API and find the logged in user
- userAuth middleware
- Add the userAuth middleware in profile and a new sendConnectionRequest API
- Set the expiry of JWT Token and cookies to 7 days
- Create userSchema method to getJWT()
- Create UserSchema method to comparePassword(passwordInputByUser)

- Explore tinder APIs
- Create a list all API you can think of in Dev Tinder
- Group multiple routes under respective routes
- Read documentation for express.Router
- Create routes folder for managing auth, profile, request routers
- create authRouter, profileRouter, requestRouter
- Import these routers in app.js