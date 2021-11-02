import { IBanknotes } from '../types/ATMTypes';

const calcHowMuchWasWithdrawn = (amount: number, amountOfBanknotes: IBanknotes, arrOfGivenBanknotes: string[]): any => {
    if (amount < 50) return { arrOfGivenBanknotes, amount };

    let amountOfBanknotesEnded = 0; //this varriable shows, how many of banknotes has quantity zero
    Object.keys(amountOfBanknotes)
        .reverse()
        .forEach((banknote: string) => {
            if (amountOfBanknotes[banknote] <= 0) {
                amountOfBanknotesEnded++;
                return;
            }
            if (amount >= Number(banknote)) {
                amountOfBanknotes[banknote] = amountOfBanknotes[banknote] - 1;
                amount -= Number(banknote);
                arrOfGivenBanknotes.push(banknote);
            }
        });

    if (amountOfBanknotesEnded >= Object.keys(amountOfBanknotes).length) return { arrOfGivenBanknotes, amount };
    if (amount > 0) ({ arrOfGivenBanknotes, amount } = calcHowMuchWasWithdrawn(amount, amountOfBanknotes, arrOfGivenBanknotes));

    return { arrOfGivenBanknotes, amount };
};

export const ATMLogic = (amount: number, amountOfBanknotes: IBanknotes) => {
    let givenBanknotesToUser: string[] = [];
    const { arrOfGivenBanknotes, amount: moneyCouldntWithdraw } = calcHowMuchWasWithdrawn(amount, amountOfBanknotes, []);
    givenBanknotesToUser = arrOfGivenBanknotes;

    return {
        givenBanknotesToUser: getGivenBanknotesWithTheirFrequency(givenBanknotesToUser),
        moneyLeft: moneyCouldntWithdraw.toFixed(2),
        amountOfBanknotesInATM: amountOfBanknotes,
    };
};

const getGivenBanknotesWithTheirFrequency = (givenBanknotesArr: string[]) => {
    return givenBanknotesArr.reduce((acum: any, banknote) => {
        if (banknote in acum) acum[banknote] += 1;
        else acum[banknote] = 1;
        return acum;
    }, {});
};
