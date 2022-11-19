import { useEffect, useState } from 'react';
import Container from '../../components/container';
import Content from '../../components/content';
import { NewUser, CenteredContent, NewUserContent, NewUserForm, NewUserInput, NewUserP } from './styles';
import Link from 'next/link';
import { StyledSubmitBtn } from '../../components/button/styles';
import api from '../../services/api';
import Router from 'next/router';


export default function Home() {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [accountId, setAccountId] = useState('');
    const [token, setToken] = useState('');

    useEffect(() => {
        let connectedAccount = localStorage.getItem('accountId');
        if (connectedAccount){
            let accountToken = localStorage.getItem(connectedAccount) || '';
            setToken(accountToken);
            Router.push('/');
        };
    },[]);

    useEffect(() => {
        localStorage.setItem(accountId, token);
        localStorage.setItem('accountId', accountId);
        window.dispatchEvent(new Event("storage"));
    },[token]);
    

    function getHeaderText(){
        if(token){
            return 'Conectado, retornando a tela inicial.'
        }else{
            return 'Sign in to NG-Cash Test';
        }
    }

    function handleDisconect(e: React.FormEvent<EventTarget>){
        e.preventDefault();        
    }
    async function handleSubmit(e: React.FormEvent<EventTarget>){
        e.preventDefault();
        const data = {
            username, 
            password
        };
        try {
            await api.post('signin', data).then((res: any) =>{
                setUserName('');
                setPassword('');
                setAccountId(res.data.body.accountId);
                setToken(res.data.body.tokenJWT);
                setTimeout(() => Router.push('/'), 2000);
            })
        } catch (error: any) {
            let message = '';
            if(error?.response?.status == 404){
                message = 'User and password combination not found';
            }else{
               message = 'Something went wrong, try again later.'; 
            }
            alert(message)
        }
    };
    return (
        <Container HeaderText="" customstyle="">
            <Content elementName='home' HeaderText='' customstyle=''>
                <NewUser>
                    <NewUserContent>
                        <NewUserForm> 
                            <CenteredContent>
                                <NewUserP>{getHeaderText()}</NewUserP>                 
                            </CenteredContent> 
                            {token 
                                ?
                                <>                                
                                    <StyledSubmitBtn onClick={handleDisconect}>
                                       Sign out
                                    </StyledSubmitBtn>
                                </>
                                : 
                                <>
                                    <form onSubmit={handleSubmit}>
                                        <NewUserInput 
                                            placeholder="User"
                                            value={username}
                                            onChange={e => setUserName(e.target.value)}                                
                                        />
                                        <NewUserInput 
                                            placeholder="Password"
                                            type={'password'}
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}                                
                                        />
                                        <StyledSubmitBtn type="submit">Submit</StyledSubmitBtn>
                                    </form>         
                                    <CenteredContent>
                                        <div style={{marginRight: '10px'}}>Don't have an account?</div>                        
                                        <Link href="/signup">
                                            Sign Up
                                        </Link>  
                                    </CenteredContent> 
                                </>
                            }                   
                        </NewUserForm>
                    </NewUserContent>
                </NewUser>
            </Content>
        </Container>
  )
}
