import React from 'react';
import { IBanknotes } from '../../types/ATMTypes';

interface IATMResult {
    atmResult: IBanknotes;
    amountOfMoneyLeft: number;
}

const ATMResult = ({ atmResult, amountOfMoneyLeft }: IATMResult) => {
    return (
        <div>
            <div>
                Withdrawn:
                {Object.keys(atmResult).map((banknote, i) => {
                    return (
                        <p key={i}>
                            banknote: {banknote}, amount: {atmResult[banknote]}
                        </p>
                    );
                })}
                <p>{+amountOfMoneyLeft ? 'Couldn"t withdraw: ' + amountOfMoneyLeft : null}</p>
            </div>
        </div>
    );
};

export default ATMResult;
