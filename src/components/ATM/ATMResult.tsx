import React from 'react';
// import { IBanknotes } from '../../types/ATMTypes';

interface IATMResult {
    // atmResult: [IBanknotes, string, IBanknotes];
    atmResult: any;
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
                {+amountOfMoneyLeft ? 'Couldn"t withdraw: ' + amountOfMoneyLeft : null}
            </div>
            <hr />
        </div>
    );
};

export default ATMResult;
