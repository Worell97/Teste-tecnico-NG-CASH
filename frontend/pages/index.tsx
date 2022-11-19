import { useEffect, useState } from 'react';
import Account from '../components/account';
import Container from '../components/container';
import Content from '../components/content';
import Menu from '../components/menu';
import { ModalProvider} from 'styled-react-modal';
import { LeftContent, RightContent, SubTittle, Tittle } from './styles';
import Head from 'next/head';


export default function Home() {
  const [token, setToken] = useState('');

  useEffect(() => {
    let connectedAccount = localStorage.getItem('accountId') || '';
    let accountToken = localStorage.getItem(connectedAccount);
    setToken(accountToken || '');
  },[]);
 
  function storageEventHandler() {
    let connectedAccount = localStorage.getItem('accountId') || '';
    setToken(localStorage.getItem(connectedAccount) || '')
  };
  
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;700&display=swap" rel="stylesheet"/>
      </Head>
      <ModalProvider>
        <Container HeaderText="" customstyle="">
            <Menu/> 
            <Content elementName='' HeaderText='' customstyle=''>{
                token ? 
                <Account/>: 
                <>
                  <LeftContent>
                    <Tittle>
                      A CARTEIRA DA NOVA GERAÇÃO.
                    </Tittle>        
                    <SubTittle>                    
                      Venha fazer parte!
                    </SubTittle>        
                  </LeftContent>
                  <RightContent/>
                </>
            }</Content>
        </Container>
      </ModalProvider>
    </>
  )
}
