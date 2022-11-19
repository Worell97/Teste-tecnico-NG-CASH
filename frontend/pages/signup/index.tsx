import { useEffect, useState } from 'react';
import Container from '../../components/container';
import Content from '../../components/content';
import { NewUser, NewUserCenter, NewUserContent, NewUserForm, NewUserInput, NewUserP } from './styles';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import Link from 'next/link';
import { StyledSubmitBtn } from '../../components/button/styles';
import api from '../../services/api';
import Router from 'next/router';


export default function Home() {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [registered, setRegistered] = useState(false);

    function getHeaderText(){
        if(registered){
            return 'You can access your account now.'
        }else{
            return "Let's get started";
        }
    }
    async function handleSubmit(e: React.FormEvent<EventTarget>){
        e.preventDefault();
        const data = {
            username, 
            password
        };
        try {
            await api.post('signup', data, {}).then(() =>{
                setUserName('');
                setPassword('');
                setRegistered(true);
                setTimeout(() => Router.push('/'), 2000);
            })
        } catch (error: any) {
            let message = '';
            if(error.response.status == 409){
                message = 'User name already in use';
            }else{
               message = 'Something went wrong, try again later.'; 
            }
            console.log(error.response.status)
            alert(message)
        }
    };
    useEffect(() => {
        let tokenAux = localStorage.getItem('token')?.toString;
        if (tokenAux){
            setToken(tokenAux);
        }
        console.log(tokenAux)
    },[]);
    
    const [token, setToken] = useState('');
    return (
        <Container HeaderText="" customstyle="">
            <Content elementName='home' HeaderText='' customstyle=''>
                <NewUser>
                    <NewUserContent>
                        <NewUserForm>
                            <NewUserCenter>
                                <NewUserP>{getHeaderText()}</NewUserP>                 
                            </NewUserCenter> 
                            {registered 
                                ?
                                <>                                
                                    <StyledSubmitBtn>
                                        <Link href="/signin">
                                            Sign In
                                        </Link>
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
                                    <NewUserCenter>
                                        <div style={{marginRight: '10px'}}>Already have an account?</div>                        
                                        <Link href="/signin">
                                            Sign In
                                        </Link>  
                                    </NewUserCenter> 
                                </>
                            }                   
                        </NewUserForm>
                    </NewUserContent>
                </NewUser>
            </Content>
        </Container>
  )
}
