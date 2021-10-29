import React, { useRef, useState } from 'react';
import { ATMLogic } from '../../utils/ATMLogic';
import ATMInfo from './ATMInfo';
import Numpad from './Numpad';
import styles from './ATM.module.scss';
import ATMResult from './ATMResult';
import { IBanknotes } from '../../types/ATMTypes';

const ATM = () => {
    const amountOfBanknotes = useRef({
        5000: 1,
        2000: 2,
        1000: 3,
        500: 4,
        200: 5,
        100: 6,
        50: 7,
    });

    const [amountOfEnteredMoney, setAmountOfEnteredMoney] = useState('');
    const [atmResult, setAtmResult] = useState<IBanknotes>();
    const [amountOfMoneyLeft, setAmountOfMoneyLeft] = useState(0);
    const [atmInfoVisible, setAtmInfoVisible] = useState(false);

    const handleEnteredAmountOfMoney = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAmountOfEnteredMoney(event.currentTarget.value);
    };

    const handleInputFromNumpad = (value: string) => {
        if (value === 'Withdraw') {
            handleSubmit();
            return;
        }
        if (value === 'Clear') setAmountOfEnteredMoney((prev) => prev.slice(0, -1));
        else setAmountOfEnteredMoney((prev) => prev + value);
    };

    const handleSubmit = () => {
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
            <div className={styles.inputWrapper}>
                <input
                    value={amountOfEnteredMoney}
                    onChange={handleEnteredAmountOfMoney}
                    className={styles.input}
                    placeholder="Enter the amount of money to withdraw"
                />
            </div>
            <Numpad handleInputFromNumpad={handleInputFromNumpad} />
            <div className={styles.btnShowAtmInfo} onClick={handleAtmInfoOpen}>
                i
            </div>
            {atmResult && <ATMResult atmResult={atmResult} amountOfMoneyLeft={amountOfMoneyLeft} />}
            {atmInfoVisible && <ATMInfo atmResult={amountOfBanknotes.current} onAtmInfoClose={handleAtmInfoClose} />}
            Купюры в банкомате должны расходоваться в равной пропорции и заканчиваться максимально близко друг к другу. Необходимо выводить
            кнопки с набором купюр (варианты) и при нажатии на одну из этих кнопок перезапускать программу.
        </>
    );
};

export default ATM;
