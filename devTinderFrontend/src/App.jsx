import Body from "./Body"
import Login from "./Login"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Profile from "./Profile"
import Feed from "./Feed"


function App() {

  return (
    <>
      <BrowserRouter basename='/'>
        <Routes>
          <Route path='/' element={<Body />} >
          <Route path='' element={<Feed />} ></Route>
            <Route path='/login' element={<Login />} />
            <Route path='/profile' element={<Profile />} />
          </Route>
        </Routes>

      </BrowserRouter>

    </>
  )
}

export default App
