import styled from "styled-components";

export const NewUser = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const NewUserContent = styled.div`
    border-radius: 0.5rem;
    display: flex;
    background-color: #0d1117;
    box-shadow: 0 0 10px #231f20;
    width: 30%;
    padding: 2rem;
    max-width: 1120px;
    border-radius: 0.5rem;
    justify-content: center;
    align-items: center;
`;

export const NewUserForm = styled.div`
    width: 100%;
    max-width: 450px;
`;

export const CenteredContent = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    color: #737380;
    line-height: 32px;    
`;

export const NewUserP = styled.p`  
    font-size: 18px;
    color: #FFFFFF;
    line-height: 32px;  
`;

export const NewUserInput = styled.input`
    box-sizing: border-box;
    margin: 16px 0 4px 0;  
    width: 100%;  
    border: none;
    border-radius: 0.2rem;    
    padding: 5px 12px;
    font-size: 14px;
    line-height: 20px;
    background:#231f20;
`;
