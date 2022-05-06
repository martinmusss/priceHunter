import Pages from "./pages/Pages";
import Category from "./components/Category";
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom';
import styled from "styled-components";
import {GiKnifeFork} from 'react-icons/gi'
import Vegetables from "./components/Vegetables";
import Fruits from "./components/Fruits";
import Bread from "./components/Bread";
import Berries from "./components/Berries";
import {MdPriceChange} from 'react-icons/md'
import LoginForm from './components/LoginForm'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./redux/reducers/authReducer";
function App() {
  const user = useSelector(store => store.authReducer.user)
  const dispatch = useDispatch()
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(checkAuth())
    }
  }, [])
  return (
    <div className="App">
      <BrowserRouter>
      <Nav>
        <Logo to={'/'}>Price <GiKnifeFork />Hunter</Logo>
        <div>{user ? `Пользователь ${user.email} в системе` : "Авторизуйтесь"}</div>
      </Nav>      
        <Pages />
        <Routes>
          <Route path='/auth/signin' element={<LoginForm />}></Route>
        <Route path="/" element={<Category />} />
        <Route path="/vegetables" element={<Vegetables />} />
        <Route path="/fruits" element={<Fruits />} />
        <Route path="/bread" element={<Bread />} />
        <Route path="/berries" element={<Berries />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
const Logo = styled(Link)`
  text-decoration: none;
  font-size: 3rem;
  font-weight: 400;
  font-family: 'Montserrat', sans-serif;
`;
const Nav = styled.div`
padding: 4rem 0rem;
display: flex;
justify-content: center;
align-items: center;
svg{
  font-size: 4rem;
}
`

export default App;
