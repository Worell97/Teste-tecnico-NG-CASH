import styled from "styled-components";

export const Tittle = styled.h1` 
    color: #ffffff;
    font-family: "IBM Plex Sans",sans-serif;
    font-size: 3rem;
    font-weight: 700;
    line-height: 1.125;   
    margin-bottom: 0.75rem;
`;

export const SubTittle = styled.h2` 
    color: #ffffff;
    font-family: "IBM Plex Sans",sans-serif;
    font-size: 2.5rem;
    font-weight: 300;
    line-height: 1.25;
    margin-top: 0;
`;

export const LeftContent = styled.div`
    margin-left: 3rem;
    width: 60%;
    justify-content: flex-start;
`;

export const RightContent = styled.div`
    width: 40%;
    height: 100%;
    max-height: 700px;
    justify-content: flex-end;
    background-image: url('/smartphone.png');
    background-repeat:no-repeat;
    background-position:left;
    background-size: cover;
`;