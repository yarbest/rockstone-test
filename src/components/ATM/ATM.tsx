import React, { useRef, useState } from 'react';
import { ATMLogic } from '../../utils/ATMLogic';
import ATMInfo from './ATMInfo';
import Numpad from './Numpad';
import styles from './ATM.module.scss';
import ATMResult from './ATMResult';
import { IBanknotes } from '../../types/ATMTypes';
import SelectBanknotes from './SelectBanknotes';

const ATM = () => {
    const amountOfBanknotes = useRef({
        '5000': 100,
        '2000': 400,
        '1000': 1000,
        '500': 300,
        '200': 5000,
        '100': 8000,
        '50': 10000,
    });

    const [atmResult, setAtmResult] = useState<IBanknotes>();
    const [atmInfoVisible, setAtmInfoVisible] = useState(false);
    const [amountOfMoneyLeft, setAmountOfMoneyLeft] = useState(0);
    const [amountOfEnteredMoney, setAmountOfEnteredMoney] = useState('');
    const [errorInInput, setErrorInInput] = useState(false);

    const handleAmountOfBanknotesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        amountOfBanknotes.current = e.target.value
            .split('; ')
            .map((el) => el.split('='))
            .reduce((acum: any, el) => {
                acum[el[0]] = el[1];
                return acum;
            }, {});
    };

    const handleEnteredAmountOfMoney = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = event.currentTarget.value;
        value = value.replace(/[^0-9.]/g, (match) => '');
        setAmountOfEnteredMoney(value);
    };

    const handleInputFromNumpad = (value: string) => {
        if (value === 'Withdraw') {
            handleSubmit();
            return;
        }
        if (value === 'Clear') setAmountOfEnteredMoney((prev) => prev.slice(0, -1));
        else setAmountOfEnteredMoney((prev) => prev + value);
    };

    const validateInputValue = (value: string) => {
        let flag = true;
        if (amountOfEnteredMoney === '') flag = false;
        else if (value[0] === '0' || value[0] === '.') flag = false;
        else if (value.includes('.') && (value.match(/\./g)!.length > 1 || value.split('.')[1].length > 2)) flag = false;

        return flag;
    };

    const handleSubmit = () => {
        if (!validateInputValue(amountOfEnteredMoney)) {
            setErrorInInput(true);
            return;
        }
        setErrorInInput(false);
        const { givenBanknotesToUser, moneyLeft } = ATMLogic(Number(amountOfEnteredMoney), amountOfBanknotes.current);
        setAtmResult(givenBanknotesToUser);
        setAmountOfMoneyLeft(moneyLeft);
    };

    const handleAtmInfoClose = () => {
        setAtmInfoVisible(false);
    };

    const handleAtmInfoOpen = () => {
        setAtmInfoVisible(true);
    };

    return (
        <>
            <SelectBanknotes handleAmountOfBanknotesChange={handleAmountOfBanknotesChange} />
            <div className={styles.inputWrapper}>
                <input
                    value={amountOfEnteredMoney}
                    onChange={handleEnteredAmountOfMoney}
                    className={errorInInput ? `${styles.inputError} ${styles.input}` : styles.input}
                    placeholder="Enter the amount of money to withdraw"
                />
                <label className={styles.inputLabel}>{errorInInput ? 'Enter valid data' : ''}</label>
            </div>
            <Numpad handleInputFromNumpad={handleInputFromNumpad} />
            <div className={styles.btnShowAtmInfo} onClick={handleAtmInfoOpen}>
                i
            </div>
            {atmResult && <ATMResult atmResult={atmResult} amountOfMoneyLeft={amountOfMoneyLeft} />}
            {atmInfoVisible && <ATMInfo atmResult={amountOfBanknotes.current} onAtmInfoClose={handleAtmInfoClose} />}
        </>
    );
};

export default ATM;
