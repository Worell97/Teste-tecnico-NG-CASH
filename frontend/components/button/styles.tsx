import styled from 'styled-components';
import {FaBars} from 'react-icons/fa';

export const StyledButton = styled.button`
    font-size: 1.5rem;
    border-radius: 5px;
    width: 10rem;
    height: 3rem;
    background: #256ce1;
    color: #fff;
    border: none;
    outline: none;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.2s ease-in-out;
    opacity: 1;
    &:hover,
    &:focus {
        transition: all 0.2s ease-in-out;
        opacity: 0.8;
    }    
`;

export const StyledTransactionBtn = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    border-radius: 50px;
    width: 3.5rem;
    height: 3.5rem;
    background: #c5c5c5;
    color: #fff;
    border: none;
    outline: none;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.2s ease-in-out;
    opacity: 1;
    &:hover,
    &:focus {
        transition: all 0.2s ease-in-out;
        opacity: 0.8;
    }    
`;

export const StyledButtonList = styled.div`

`;

export const StyledNavBtn = styled.nav`
    display: flex;
    align-items: center;

    @media screen and (max-width: 768px){
        display: none;
    }
`;

export const StyledNavBtnLink = styled.a`
    margin-left: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    border-radius: 5px;
    width: 10rem;
    height: 3rem;
    background: #256ce1;
    color: #fff;
    border: none;
    outline: none;
    cursor: pointer;
    text-decoration: none;
    padding: auto;
    transition: all 0.2s ease-in-out;
    &:hover,
    &:focus {
        transition: all 0.2s ease-in-out;
        background: #256ce1;
        color: #010606;
    }    
`;


export const StyledSandWichButton = styled(FaBars)`
    display: none;
    color: #fff;

    @media screen and (max-width: 768px){
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(-100%, 75%);
        font-size: 1,8rem;
        cursor: pointer;
    }
`;

export const StyledSubmitBtn = styled.button`  
    width: 100%;
    margin-top: 16px;
    border-radius: 4px;
    background: #238636;
    padding: 10px 22px;
    color: #ffffff;
    border: none;
    outline: none;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.2s ease-in-out;
    &:hover,
    &:focus {
        transition: all 0.2s ease-in-out;
        background: #238636;
        color: #010606;
    }    
`;