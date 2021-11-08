import { IBanknotes } from '../types/ATMTypes';

const getBanknoteWithBiggestAmount = (amountOfBanknotes: IBanknotes) => {
    const biggestAmount = Math.max(...Object.values(amountOfBanknotes));
    return Object.keys(amountOfBanknotes)
        .reverse()
        .find((key: string) => amountOfBanknotes[key] === biggestAmount);
};

const calcHowMuchWasWithdrawn = (amount: number, amountOfBanknotes: IBanknotes, arrOfGivenBanknotes: string[]): any => {
    let maxBanknoteAmount = getBanknoteWithBiggestAmount(amountOfBanknotes) as string;
    while (amount > 0) {
        maxBanknoteAmount = getBanknoteWithBiggestAmount(amountOfBanknotes) as string;
        let copy = { ...amountOfBanknotes };
        while (Number(maxBanknoteAmount) > amount || amountOfBanknotes[maxBanknoteAmount] <= 0) {
            delete copy[maxBanknoteAmount];
            //сорян конечно за сложность алгоритма O(n^3), но иначе никак
            maxBanknoteAmount = getBanknoteWithBiggestAmount(copy) as string;
            if (Object.keys(copy).length === 0) break;
        }
        if (amount >= Number(maxBanknoteAmount)) {
            amountOfBanknotes[maxBanknoteAmount] = amountOfBanknotes[maxBanknoteAmount] - 1;
            amount -= Number(maxBanknoteAmount);
            arrOfGivenBanknotes.push(maxBanknoteAmount);
        } else break;
    }

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
