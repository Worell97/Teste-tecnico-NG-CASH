import React from 'react';
import { StyledContainer } from './styles';
  
type Props = {
    children: React.ReactNode;
    HeaderText: string;
    customstyle: string;
}

function Container(content: Props){    
    return(
        <StyledContainer>
            {content.children}
        </StyledContainer>
    )
}

export default Container;