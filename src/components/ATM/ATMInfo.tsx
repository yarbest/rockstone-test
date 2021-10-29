import React from 'react';
import styles from './ATM.module.scss';

interface IATMInfo {
    // atmResult: [IBanknotes, string, IBanknotes];
    atmResult: any;
    onAtmInfoClose: any;
}

const ATMInfo = ({ atmResult, onAtmInfoClose }: IATMInfo) => {
    return (
        <div className={styles.atmInfoWrapper}>
            <div className={styles.atmInfoInnerWrapper}>
                Left in ATM:
                {Object.keys(atmResult).map((banknote, i) => {
                    return (
                        <p key={i}>
                            banknote: <b>{banknote}</b>, amount: <b>{atmResult[banknote]}</b>
                        </p>
                    );
                })}
                <button className={styles.btnAtmInfoClose} onClick={onAtmInfoClose}>
                    X
                </button>
            </div>
        </div>
    );
};

export default ATMInfo;
