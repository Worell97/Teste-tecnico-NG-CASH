import React from 'react';
import { useEffect, useState } from 'react';
import {StyledMenu, StyledNavMenu, NavMenuItem, NavMenuHome} from './styles';
import {NavBtn, NavBtnLink, Button} from '../button';
import { StyledButton, StyledSandWichButton } from '../button/styles';
import Router from 'next/router';

function Menu(){
    
  useEffect(() => {
    let connectedAccount = localStorage.getItem('accountId');
    if (connectedAccount){
        let accountToken = localStorage.getItem(connectedAccount);
        setToken(accountToken || '');
    }
  },[]);

  function handleHomeClick(){
    Router.push('/');
  };

  function handleSignin(){
    Router.push('/signin')
  };

  function handleSignout(){
    let connectedAccount = localStorage.getItem('accountId');
    if (connectedAccount){
        localStorage.removeItem(connectedAccount);
        setToken('');
    }
    localStorage.removeItem('accountId');
    Router.push('/');
    Router.reload();
  };
  
  const [token, setToken] = useState('');
    return(
        <StyledMenu>
            <NavMenuHome onClick={handleHomeClick}>Inicio</NavMenuHome>
            <StyledSandWichButton/>
            <NavBtn> 
                {token ?
                        <StyledButton  onClick={handleSignout}>
                            Sair
                        </StyledButton>
                    :
                    <>
                        
                        <NavMenuItem onClick={handleSignin}>
                          Login
                        </NavMenuItem>                        
                        <NavBtnLink to="/signup">
                            Registrar
                        </NavBtnLink>
                    </>
                }
            </NavBtn>
        </StyledMenu>
    ); 
}

export default Menu;