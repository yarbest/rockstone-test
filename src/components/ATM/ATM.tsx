import React, { useEffect, useState } from 'react';
import { ATMLogic } from '../../utils/ATMLogic';
import ATMInfo from './ATMInfo';
import Numpad from './Numpad';
import styles from './ATM.module.scss';
import ATMResult from './ATMResult';

const ATM = () => {
    const [amountOfEnteredMoney, setAmountOfEnteredMoney] = useState('');
    const [atmResult, setAtmResult] = useState<[any, string, any]>();

    const handleEnteredAmountOfMoney = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAmountOfEnteredMoney(event.currentTarget.value);
    };

    useEffect(() => {
        console.log(amountOfEnteredMoney);
    }, [amountOfEnteredMoney]);

    const handleInputFromNumpad = (value: string) => {
        if (value === 'Enter') {
            handleSubmit();
            return;
        }
        if (value === 'Clear') setAmountOfEnteredMoney((prev) => prev.slice(0, -1));
        else setAmountOfEnteredMoney((prev) => prev + value);
    };
    console.log(atmResult);

    const handleSubmit = () => {
        setAtmResult(ATMLogic(Number(amountOfEnteredMoney)));
    };

    return (
        <>
            <div className={styles.inputWrapper}>
                <input
                    value={amountOfEnteredMoney}
                    onChange={handleEnteredAmountOfMoney}
                    className={styles.input}
                    placeholder="Enter the amount of money to withdraw"
                />
            </div>
            <ATMInfo />
            <Numpad handleInputFromNumpad={handleInputFromNumpad} />
            {atmResult && <ATMResult atmResult={atmResult} />}
        </>
    );
};

export default ATM;
