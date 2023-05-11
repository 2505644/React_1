import React from "react";
import { Link } from "react-router-dom";
import MyButton from "../button/MyButton";
const Navbar = () =>{
  return(
    <div className='navbar'>
      <div className='navbar__login'>
      <Link to='/login'>
      <MyButton>Войти</MyButton>
      </Link>
      </div>
      <div className='navbar__links'>
      <Link to='/about'>
        <MyButton>О сайте</MyButton>
      </Link>
      <Link to='/posts'>
        <MyButton>Посты</MyButton>
      </Link>
      </div>
    </div>
  );
};
export default Navbar