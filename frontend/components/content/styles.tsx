import styled from 'styled-components';

type Props ={
    customstyle: string 
}

export const DeafaultSection = styled.section<Props>`
    justify-content: center;
    align-items: center;
    position: absolute;
    box-sizing: border-box;
    background-color: transparent;
    height: 90vh;
    width: 100vw;
    scroll-snap-align: start;
    display: flex;
    flex-flow: row;
    ${props => (props.customstyle !== '' ? props.customstyle : '')}
`;

export const Header = styled.h1` 
    text-align: center;
`;