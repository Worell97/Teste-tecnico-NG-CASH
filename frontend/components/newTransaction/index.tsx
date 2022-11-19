import { NewUserInput } from "../../pages/signin/styles";
import { StyledSubmitBtn } from "../button/styles";
import { useState } from 'react';
import api from "../../services/api";


export default function NewTransaction(){
    const [targetName, setTargetName] = useState('');
    const [value, setValue] = useState('');
    const [date, setDate] = useState({date: new Date()});

    async function handleSubmit(e: React.FormEvent<EventTarget>){
        e.preventDefault();
        if  (value && (Number(value) < 0)) {
            alert('O valor da transferência precisa ser maior que zero.');
            return;
        };
        const debtAccount = localStorage.getItem('accountId');
        const valueInCents = Number(value) * 100;
        setDate({date: new Date()});

        const data = {
            debtAccount, 
            targetName,
            valueInCents,
            date
        };
        try {
            await api.post('transaction', data, {}).then((res) =>{
                setTargetName('');
                setValue('');
                setDate({date: new Date()});
                alert(`Transferência numero ${res.data.body.transactionId} gravada com sucesso.`);
            });
        } catch (error: any) {            
            if(error?.response?.data?.message){
                alert(error?.response?.data?.message);                
            }else{
                throw error;
            }
        }
    };

    return(        
        <>
            <form onSubmit={handleSubmit}>
                <NewUserInput 
                    placeholder="Conta de destino"
                    value={targetName}
                    onChange={e => setTargetName(e.target.value)}
                    required
                />
                
                <NewUserInput 
                    placeholder="Valor"
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    required
                />
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <StyledSubmitBtn type="submit">Enviar</StyledSubmitBtn>
                </div>
            </form>         
        </>
    )
}