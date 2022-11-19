import styled from 'styled-components';

export const StyledMenu = styled.nav`
    box-sizing: border-box;
    min-height: 10vh;
    max-height: 10vh;
    padding: 0 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
`;


export const StyledNavMenu = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media screen and (max-width: 768px){
        display:none;
    }
`;

export const NavMenuHome = styled.button`
    color: #ffffff;
    font-family: "IBM Plex Sans",sans-serif;
    font-size: 2.5rem;
    font-weight: 700;
    line-height: 1.125;   
    border: none;
    background: transparent;
    box-sizing: border-box;
    cursor: pointer;
    padding: 16px 24px;
    outline: none;
    border-radius: 4px;
    text-decoration: none;
    display: inline-block;
    transition: opacity .3s, easy-in-out;  
    &:hover,
    &:focus {
        opacity: .5;
    }
`;

export const NavMenuItem = styled.button` 
    border: 1px solid #fff;
    color: #ffffff;
    font-family: "IBM Plex Sans",sans-serif;
    font-size: 1.5rem;
    width: 10rem;
    height: 3rem;
    border-radius: 5px;
    background: transparent;
    box-sizing: border-box;
    cursor: pointer;
    outline: none;
    text-decoration: none;
    display: inline-block;
    transition: opacity .3s, easy-in-out;  
    &:hover,
    &:focus {
        opacity: .5;
    }
`;