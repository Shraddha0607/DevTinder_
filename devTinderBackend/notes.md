1) npm init
to create "package.json"

2) create "src" folder and "app.js" file (which is starting point)

3) npm i express
4) create server 
5) install nodemon
npm run dev 
npm start

md - markdown file
understand "advanced routing techniques"
abc 
ab?c -- abc, ac both working
ab+c -- abbbbbc, abc, etc are working
ab*cd -- abcd, abbbbbcd, abghjghjcd all are working
regex also works in routing 

____________________________________________

req.query    (Query parameter)
app.get("/user/:Id/:name", (req, res) => {
    console.log(req.query);
    console.log(req.params);
    res.send({
        firstName: "Shraddha",
        lastName: "Gaur"
    });
});

req.params       (Route parameter)
app.get("/user/:userId/:name", (req, res) => {
    console.log(req.params);
    res.send({
        firstName: "Shraddha",
        lastName: "Gaur"
    });
});

6) route handler => express allowed many route handler, but you do need to take 
        care of "only single res.send()"

7) Arrays help when you want to group related middleware.

const authMiddlewares = [
  verifyToken,
  checkRole,
  checkSubscription
];

app.use('/dashboard', authMiddlewares, dashboardHandler);

app.use('/dashboard', verifyToken, checkRole, checkSubscription, dashboardHandler);

8) if in "Route handler", no res.send => then infinite loop
if in "Route handler", next()  => then give error

9) app.use() vs app.all()
app.use() is primarily used for middleware and matches route prefixes, 
while app.all() is used for handling all HTTP methods on an exact route path.


{
10) How to get the "username" and "password"

🔑 From where do username and password come?
👉 YOU create them in MongoDB Atlas
They are NOT your MongoDB login email/password.
}

✅ Step-by-Step: Get Username & Password (Atlas)
🔹 Step 1: Open MongoDB Atlas

Login to MongoDB Atlas

Open your Project

🔹 Step 2: Go to Database Access

📍 Left sidebar → Security → Database Access

🔹 Step 3: Create Database User

Click ➕ Add New Database User

Fill:

Authentication Method: Password

Username:
Example:

learnbydoing00


Password:

Click Autogenerate Secure Password
OR

Create your own strong password

Database User Privileges:

Select Read and write to any database

Click Add User

👉 This username & password is what goes in your connection string.

✅ How to Use It in Your URL

Given URL:

mongodb+srv://learnbydoing00:<db_password>@nodelearning.sel3b9f.mongodb.net/devTinder


Replace:

learnbydoing00 → Database username

<db_password> → Database user password

Example:

mongodb+srv://learnbydoing00:MyStrongPass@123@nodelearning.sel3b9f.mongodb.net/devTinder
}

11) db connect > then > server connect to port

12) JSon vs JS object
Json want both key-value in "string"

| Feature         | JS Object                 | JSON                                         |
| --------------- | ------------------------- | -------------------------------------------- |
| Type            | JavaScript data structure | Text / String format                         |
| Quotes on keys  | Optional                  | Mandatory (")                                |
| Functions       | ✅ Allowed                 | ❌ Not allowed                                |
| Data types      | Any JS type               | String, Number, Boolean, Array, Object, null |
| Usage           | Program logic             | Data transfer / storage                      |
| Trailing commas | Allowed                   | ❌ Not allowed                                |


13) Rules:
NO quotes needed
NO spaces around =
One variable per line

14)  to understand, why .env is not injecting properly, use "debug" key
require('dotenv').config({ 
    path: '.env',
    debug: true,
});

15) to collapse : Ctrl + K  →  Ctrl + 0
 to unfold: Ctrl + K  →  Ctrl + J

16) to start in debugging mode:
 - Create launch.json
 - Press Ctrl + Shift + D
 - Click Run and Debug
 - Select Node.js

 17) if want to unstill package from globally
 nodemon -v
 npm uninstall -g nodemon

 18) Cookies => 
 it is like a registration slip, 
 After which we are authorised one. So, again and again don't need to show and get verified by our credentials.

 19) JWT => header + payload + verify signature
 .sign(), .verify()

20) {
        "firstName": "Admin",
        "lastName" : "Verma",
        "emailId" : "admin@gmail.com",
        "password" : "Admin@123"
    }


21) Environment configuration should be relative to code, not editor state

question: “How do you handle env files in nested Node projects?”
answer: “I load environment variables using an absolute path derived from __dirname, so the application works regardless of how or where the project is opened.”

22) How to attach debugger with nodemon
in VSCode, ctrl+ shift+ P,
then type "Debug:Toggle auto Attach" : Enable it
Then run normally "npm run dev"
and run debugger normally

23) Relative and Absolute path
relative : jaha ho, waha se path
absolute : system ke root se (windows/ linux ke root se)

24) Ctrl + Shift + F =>  searching a keyword across the entire VS Code workspace.






GIT :
1) to create new branch and reflect all changes in that, by switching to that branch itself
 git checkout -b branch_name

2) to delete a branch(safely)
git branch -d branch_name





 ISSUES
 1) const userId = req.params?.userId;
 when saving, it becomes,
 const userId = req.params ? .userId;

 2) sometimes, error because of different url route 
 while u are hitting different