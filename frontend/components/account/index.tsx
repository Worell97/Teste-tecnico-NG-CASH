import React from 'react';
import { useEffect, useState } from 'react'
import { Tittle } from '../../pages/styles';
import api from '../../services/api';
import Transactions from '../transactions';
import { AccountFrame, Resume } from './styles';

export default function Account(){

    return(
        <AccountFrame> 
            <Resume>
                <Tittle>
                    Bem vindo de volta
                </Tittle>
            </Resume>
            <Transactions/>
        </AccountFrame>
    )
}