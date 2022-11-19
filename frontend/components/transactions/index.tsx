import api from "../../services/api"
import { useState, useEffect } from 'react';
import NewTransaction from "../newTransaction";
import { StyledTransactionBtn } from "../button/styles";
import { ModalHeader, StyledModal } from "../account/styles";
import { GrAdd, GrClose } from 'react-icons/gr';
import { Column, DateField, Destination, Filters, Id, InputDate, NoResultsInfo, Origin, Row, TransactionList, TransactionListFooter, TransactionListHeader, Value } from "./styles";
import { SubTittle } from "../../pages/styles";
import { NavMenuItem } from "../menu/styles";

export default function Transactions(){
    const [accountId, setAccountId] = useState('');
    const [transactions, setTransactions] = useState([]);
    const [showModalTransaction, setShowModalTransaction] = useState(false);
    const [token, setToken] = useState('');
    const [balance, setBalance] = useState(0);
    const [filter, setFilter] = useState({ in: true, out: true, date: '' });
    const [defaultFilter, setDefaultFilter] = useState(filter);
    const [hasFilters, setHasFilters] = useState(false);

    useEffect(() => {
        if(localStorage.getItem('accountId')) {
            setAccountId(localStorage.getItem('accountId') || '');
            setToken(localStorage.getItem(localStorage.getItem('accountId') || '') || '');
        }
    }, []);
    
    useEffect(() => {
        getActualBalance();  
    }, [token])

    useEffect(() => {
        if(accountId){
            getTransactions();
            getActualBalance();
        };
        setHasFilters(filter != defaultFilter);
    }, [filter])

    useEffect(() => {    
        if(accountId != ''){     
            getTransactions();
            getActualBalance();
        };
    }, [accountId]);

    async function getActualBalance(){
        if(token != '' && accountId !=''){
            await api.get('balance', { params: { accountId: accountId } }).then((res) => {
                setBalance(res.data.body.balance);
            })
        }

    };
    

    async function getTransactions(){ 
        if(accountId == '') return;

        try {
            await api.get('transactions', { params: {...filter, accountId: accountId}}).then((res: any) =>{
                setTransactions(res.data.body.data);
            })
        } catch (error: any) {
            if(error?.response?.status != 404){
                throw error;
            }
        }
    }

    function openModal(){
        setShowModalTransaction(true);
    }

    function closeModal(){
        setShowModalTransaction(false);
    }

    function afterCloseModal(){
        getTransactions();
        getActualBalance();  
    };

    function limparFiltros() {
        setFilter(defaultFilter);
    };

    function changeFilter(e: any){
        e.preventDefault;
        switch (e.target.id) {
            case 'entradas':
                setFilter({
                    ...filter,
                    in: !filter.in
                });
                
                break;
            case 'saidas':
                setFilter({
                    ...filter,
                    out: !filter.out
                });
                
                break;
            case 'data':
                setFilter({
                    ...filter,
                    date: e.target.value ||  ''
                });              
                break;
            default:
                break;
        }
    }

    return(
        <>  
            {transactions && transactions.length > 0
                ? 
                    <TransactionList>{
                        <>  
                            <TransactionListHeader>
                                <h2>Ultimos lançamentos</h2>
                            </TransactionListHeader>
                            <Filters>
                                <input type="checkbox" id="entradas" name="fav_language" checked={filter.in} onChange={changeFilter}/>
                                <label htmlFor="entradas">Entradas</label><br/>
                                <input type="checkbox" id="saidas" name="fav_language" checked={filter.out} onChange={changeFilter}/>
                                <label htmlFor="saidas">Saídas</label><br/>
                                <label htmlFor="data">Data</label>
                                <InputDate type="date" id="data" name="fav_language" placeholder="dd-mm-yyyy" value={filter.date} onChange={changeFilter}/>
                            </Filters>
                            <Column key={0}>
                                <Id>Número</Id>
                                <Origin>Conta de origem</Origin>
                                <Destination>Conta de destino</Destination>
                                <DateField>Data</DateField>
                                <Value>Valor</Value>
                            </Column>
                            {
                                transactions.map((transaction: any) => (
                                    <Row key={transaction.id}>
                                        <Id>{transaction.id}</Id>
                                        <Origin>{transaction.debitedaccount}</Origin>
                                        <Destination>{transaction.creditedaccount}</Destination>
                                        <DateField>{String(transaction.createdat).slice(0, 10)}</DateField>
                                        <Value>R$ {(transaction.value/100).toFixed(2)}</Value>
                                    </Row>
                                ))
                            } 
                            <TransactionListFooter>
                                <h3>
                                    Saldo atual: R$ {(balance/100).toFixed(2)}
                                </h3>   
                                <StyledTransactionBtn  onClick={openModal}>
                                    <GrAdd/>
                                </StyledTransactionBtn>                        
                            </TransactionListFooter>
                        </>
                        }
                    </TransactionList>
                : 
                    <NoResultsInfo>{hasFilters ?
                        <>                        
                            <SubTittle>
                                Nenhuma transação encontrada para os filtros informados.
                            </SubTittle>
                            <NavMenuItem onClick={limparFiltros}>Limpar</NavMenuItem>
                        </>
                        :
                        <>
                            <SubTittle>
                                Você ainda não possui nenhuma transação
                            </SubTittle>
                            <NavMenuItem onClick={openModal}>Cadastrar</NavMenuItem>
                        </>
                        }
                    </NoResultsInfo>
                }
            <StyledModal
                isOpen={showModalTransaction}
                onBackgroundClick={closeModal}
                onEscapeKeydown={closeModal}
                afterClose={afterCloseModal}>
                <ModalHeader>
                    <h2>Nova transferência</h2>
                    <StyledTransactionBtn  onClick={closeModal}>
                        <GrClose/>
                    </StyledTransactionBtn>  
                </ModalHeader>
                <NewTransaction/>
            </StyledModal>
        </>
    )
};