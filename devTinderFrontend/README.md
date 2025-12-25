# DevTinder

- Create a Vite + React application
- Remove unnecessary code and create a Helloworld app
- install tailwind css
- install daisyUI 
(Windows Key + . (Period) => to open emoji picker in VS Code)
- add navbar component in App.jsx
- create a Navbar.jsx seperate component file
- install  react-router-dom
- create BrowserRouter > Routes > Route = '/Body' > RouteChildren
- create an Outlet in your Body component
- create footer

- Create a Login page
- Install axios
- CORS - install cors in backend => add middleware to with configuration: origin, credentials
- Whenever making API call, so pass axios => { withCredentials: true }
- Install Redux toolkit - https://redux-toolkit.js.org/tutorials/quick-start
- install react-redux + @reduxjs/toolkit 
=> configureStore => Provider => createSlice => add reducer to store
- Add redux devtools in chrome
- Login and see if your data is coming properly in store
- NavBar should update as soon as user logs in
- Refactor our code to add constants file + create a components folder

- You should not be able to access other routes without login
- If token is not present, redirect user to login page
- Logout feature => remove token, remove user
- build the UserCard on feed



Body 
    Navbar
    Route = / => Feed
    Route = /login => Login
    Route = /connection => Connection
    Route = /profile => Profile