import styled from "styled-components";

export const StyledResetBtn = styled.button`  
    width: 100%;
    margin-top: 16px;
    border-radius: 4px;
    background: transparent;
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
        opacity: .5;
    }    
`;