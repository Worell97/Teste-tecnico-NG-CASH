import React from 'react';
import {DeafaultSection, Header} from './styles';


type Props = {
  elementName: string; // used on react-scroll
  children: React.ReactNode;
  HeaderText: string;
  customstyle: string;
};

function Content({elementName, children, HeaderText, customstyle }: Props) {
  return(
    <DeafaultSection customstyle={customstyle} id={elementName}>
        {(HeaderText !== ''? <Header>{HeaderText}</Header>:<></>)}
        {children}
    </DeafaultSection>
  );
};
  
export default Content;