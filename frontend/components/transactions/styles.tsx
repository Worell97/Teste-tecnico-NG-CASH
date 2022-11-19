import styled from "styled-components";

export const TransactionList = styled.ul`
    width: 100%;
    border-radius: 0.5rem;
    display: flex;
    flex-direction: column;
    background-color: #000;
    box-shadow: 0 0 10px #231f20;
    padding: 2rem;
    max-width: 1120px;
    justify-content: space-around;
    align-items: center;
    margin: auto;
`;

export const Row = styled.li`
    margin: auto;
    width: 100%;
    text-decoration: none;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-bottom: 1px solid;
    border-color: #ffffff;
    margin-bottom: 7px;
`;

export const Column = styled.li`
    width: 100%;
    text-decoration: none;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-bottom: 1px solid;
    border-color: #ffffff;
`;

export const TransactionListHeader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;    
`;

export const Filters = styled.form`
    width: 50%;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
`;

export const TransactionListFooter = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
`;

export const InputDate = styled.input`
  padding: 5px;
  border:0; 
  border-bottom:1px solid #eee; 
  border-radius:10px;
  font-family:inherit;
  font-size: inherit;
`;

export const NoResultsInfo = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 90%;    
    margin-right: 3rem;
`;

export const Id = styled.div`
    width: 15rem;
`;

export const Origin = styled.div`
    width: 15rem;
`;

export const Destination = styled.div`
    width: 15rem;
`;

export const DateField = styled.div`
    width: 15rem;
`;

export const Value = styled.div`
    width: 15rem;
`;