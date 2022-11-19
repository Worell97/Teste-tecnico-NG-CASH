import pool from '../config/database.js'; 
import { getAccountByName } from './userController.js';

const createTransaction = async (req, res) => {
    const client = await pool.connect();
    const {debtAccount, targetName, valueInCents, date } = req.body;
    const credAccount = await getAccountByName(targetName);
    const currentBalance = await getCurrentBalance(debtAccount);

    if (currentBalance < valueInCents){
        res.status(400).send({
            message: "Saldo insuficiente."
        });
        return;
    };

    if (debtAccount == credAccount){
        res.status(409).send({
            message: "Conta de origem e destino não podem ser iguais"
        });
        return;
    };

    if (!credAccount > 0){
        res.status(404).send({
            message: "Conta do destinatário informado não foi encontrada."
        });
        return; 
    };
    

    await client.query('BEGIN');    
    try {
        const queryText = "INSERT INTO transactions (debitedAccount, creditedAccount, value, createdAt) VALUES ($1, $2, $3, $4) RETURNING id";
        const result = await client.query(queryText, [debtAccount, credAccount, valueInCents, date.date]);

        updateBalance(debtAccount, credAccount, valueInCents, client);
        
        await client.query('COMMIT');
        res.status(201).send({
            message: "Transaction success",
            body:{
                transactionId: result.rows[0].id
            }
        });
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;        
    } finally {
        client.release()
    };
};

function createWhere(accountId, entradas, saidas, data){
    let where = ' WHERE true';
    
    if (data && data != ''){
        where = where + ` AND t.createdat = '${data}'`;
    };

    if (saidas == entradas ){
        where = where + ` AND (t.creditedaccount = ${accountId} OR t.debitedaccount = ${accountId})`;
    }else if(entradas == 'true'){
        where = where + ` AND t.creditedaccount = ${accountId}`;
    }else if(saidas == 'true'){
        where = where + ` AND t.debitedaccount = ${accountId}`;
    }

    return where;    
};

const getTransactionsByAccount = async (req, res) => {
    const client = await pool.connect();
    const  accountId = req.query.accountId;
    const  entradas = req.query.in;
    const  saidas = req.query.out;
    const  data = req.query.date;
    if (await getAccountByName(accountId) != 0){
        res.status(404).send({
            message: "Account not found"
        });
        return;
    }
    ;
    await client.query('BEGIN');    
    try {
        const queryText = `
            SELECT 
                t.id, d.username as debitedaccount, c.username as creditedaccount,  t.value, t.createdat
            FROM transactions t 
            LEFT JOIN users d on 
                t.debitedaccount = d.account_id
            LEFT JOIN users c on
                t.creditedaccount = c.account_id
            ${createWhere(accountId, entradas, saidas, data)} 
        `;


        const result = await client.query(queryText);
        await client.query('COMMIT');
        res.status(200).send({
            body:{
                data: result.rows
                }
            });
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;        
    } finally {
        client.release()
    };
};

const getTransactionsIn = async (req, res) => {
  const client = await pool.connect();
  const {accountId} = req.body;
  if (await getAccountByName(accountId) != 0){
      res.status(404).send({
          message: "Account not found"
      });
      return;
  }
  await client.query('BEGIN');    
  try {
      const queryText = `SELECT * FROM transactions WHERE creditedAccount = ${accountId} ${date && ' AND createdAt = ' + date}`;
      const result = await client.query(queryText);
      await client.query('COMMIT');
      res.status(200).send({
          body:{
              data: result.rows
          }
      });
  } catch (error) {
      await client.query('ROLLBACK');
      throw error;        
  } finally {
      client.release()
  };
};

const getTransactionsOut = async (req, res) => {
  const client = await pool.connect();
  const {accountId, date} = req.body;
  if (await getAccountByName(accountId) != 0){
      res.status(404).send({
          message: "Account not found"
      });
      return;
  }
  await client.query('BEGIN');    
  try {
      const queryText = `SELECT * FROM transactions WHERE debitedAccount = ${accountId} ${date && ' AND createdAt = ' + date}`;
      const result = await client.query(queryText);
      await client.query('COMMIT');
      res.status(200).send({
          body:{
              data: result.rows
          }
      });
  } catch (error) {
      await client.query('ROLLBACK');
      throw error;        
  } finally {
      client.release()
  };
};



async function getCurrentBalance(accountId){    
    if(!accountId) return;

    const client = await pool.connect();
    try {
        const queryText = 
            `SELECT 
                balance FROM accounts WHERE 
                    id = ${accountId}`;
        const result = await client.query(queryText);
        if(result.rows.length > 0){
            return result.rows[0].balance                
        }else{
            return 0;
        }
    } catch (error) {
        throw error;        
    } finally {
        client.release();
    };
}

async function updateBalance(origin, destination, value, client){
    if(!origin) return;
    if(!destination) return;
    if(!value) return;
    const currentBalanceOrigin = await getCurrentBalance(origin);
    const currentBalanceDestination = await getCurrentBalance(destination);
    const newBalanceOrigin = currentBalanceOrigin - value;
    const newBalanceDestination = currentBalanceDestination + value;
    await client.query(`UPDATE accounts set balance = ${newBalanceOrigin} WHERE id = ${origin}`);
    await client.query(`UPDATE accounts set balance = ${newBalanceDestination} WHERE id = ${destination}`);
};

export { createTransaction, getTransactionsByAccount, getTransactionsIn, getTransactionsOut };