import React from 'react';

interface IATMResult {
    atmResult: any;
}

const ATMResult = ({ atmResult }: IATMResult) => {
    return (
        <div>
            <div>
                Withdrawn:
                {Object.keys(atmResult[0]).map((banknote) => {
                    return (
                        <p>
                            banknote: {banknote}, amount: {atmResult[0][banknote]}
                        </p>
                    );
                })}
                Couldn't withdraw: {atmResult[1]}
            </div>
            <hr />
            <div>
                Left in ATM:
                {Object.keys(atmResult[2]).map((banknote) => {
                    return (
                        <p>
                            banknote: {banknote}, amount: {atmResult[2][banknote]}
                        </p>
                    );
                })}
            </div>
        </div>
    );
};

export default ATMResult;
