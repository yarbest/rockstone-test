import React from 'react';
import styles from './ATM.module.scss';

interface INumpad {
    handleInputFromNumpad: (value: string) => void;
}

const Numpad = ({ handleInputFromNumpad }: INumpad) => {
    const handleNumpadClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLElement;
        if (target.children.length) return; // if pressed numpad but not numpadItem then skip
        handleInputFromNumpad(target.innerText);
    };

    return (
        <div className={styles.numpad} onClick={handleNumpadClick}>
            <div className={styles.numpadItem}>7</div>
            <div className={styles.numpadItem}>8</div>
            <div className={styles.numpadItem}>9</div>
            <div className={styles.numpadItem}>4</div>
            <div className={styles.numpadItem}>5</div>
            <div className={styles.numpadItem}>6</div>
            <div className={styles.numpadItem}>1</div>
            <div className={styles.numpadItem}>2</div>
            <div className={styles.numpadItem}>3</div>
            <div className={styles.numpadItem}>0</div>
            <div className={styles.numpadItem}>{'Clear'}</div>
            <div className={styles.numpadItem}>{'Withdraw'}</div>
        </div>
    );
};

export default Numpad;
