import { encrypt, getToken, login } from '../../util.js';
import pool from '../config/database.js'; 

async function createAccount(client){
    const queryText = "INSERT INTO accounts (balance) VALUES (10000) RETURNING id";
    const res = await client.query(queryText);
    return res.rows[0].id;
};  

const createUser = async (req, res) => {
    const client = await pool.connect();
    const {username, password } = req.body;
    if (await getAccountByName(req.body.username) != 0){
        res.status(409).send({
            message: "User name already in use"
        });
        return;
    }
    const hashedPassword = encrypt(password);
    await client.query('BEGIN');    
    try {
        const account_id = await createAccount(client); 
        const queryText = "INSERT INTO users (username, password, account_id, salt) VALUES ($1, $2, $3, $4) RETURNING username, account_id";
        const result = await client.query(queryText, [username, hashedPassword.hash, account_id, hashedPassword.salt]);
        await client.query('COMMIT');
        res.status(201).send({
            message: "User added successfully",
            body:{
                user: result.rows[0].username,
                accountId: result.rows[0].account_id
            }
        });
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;        
    } finally {
        client.release()
    };
}

const signin = async(req, res) => {
    const client = await pool.connect();
    const {username, password } = req.body;

    if (!(username && password)) {
      res.status(400).send("All input is required");
      return;
    }

    try {
        const queryText = 
            `SELECT 
                password, salt, account_id FROM users WHERE 
                    username = '${username}'`

        const result = await client.query(queryText);
        if(result.rowCount > 0 && login(password, result.rows[0].salt, result.rows[0].password)){
            const token = getToken(username);
            res.status(200).send({
                message: "User conected successfully",
                body:{
                    accountId: result.rows[0].account_id,
                    tokenJWT: token
                }
            });
        }else{
            res.status(404).send({msg: 'User and password combination not found'});
        }       
    } finally {
        client.release();
    };
}

async function getAccountByName(username){    
    const client = await pool.connect();
    try {
        const queryText = 
            `SELECT 
                account_id FROM users WHERE 
                    username = '${username}'`;
        const res = await client.query(queryText);
        if(res.rows.length > 0){
            return res.rows[0].account_id || 0;
        }else{
            return 0;
        }
    } catch (error) {
        throw error;        
    } finally {
        client.release();
    };
}

async function getBalanceByAccount(req, res){    
    const client = await pool.connect();
    const { accountId } = req.query;
    try {
        const queryText = 
            `SELECT 
                balance FROM accounts WHERE 
                    id = ${accountId}`;

        const result = await client.query(queryText);
        if(result.rows.length > 0){
            res.status(200).send({
                body:{
                    balance: result.rows[0].balance
                }
            });
        }else{
            res.status(404).send({msg: 'Balance for this account id not found'});
        }
    } catch (error) {
        throw error;        
    } finally {
        client.release();
    };
}

export { createUser, signin, getAccountByName, getBalanceByAccount };