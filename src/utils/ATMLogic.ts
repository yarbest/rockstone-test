import { IBanknotes } from '../types/ATMTypes';

const getBanknoteWithBiggestAmount = (amountOfBanknotes: IBanknotes) => {
    const biggestAmount = Math.max(...Object.entries(amountOfBanknotes).map((el: [string, number]) => +el[0] * el[1]));
    return Object.keys(amountOfBanknotes).find((key: string) => +key * amountOfBanknotes[key] === biggestAmount);
};

const getValidBanknoteWithBiggestAmount = (maxBanknote: string | undefined, amount: number, amountOfBanknotes: IBanknotes) => {
    const copy = { ...amountOfBanknotes };
    while (+maxBanknote! > amount) {
        delete copy[maxBanknote!];
        maxBanknote = getBanknoteWithBiggestAmount(copy);
    }
    return maxBanknote;
};

const calcHowMuchWasWithdrawn = (amount: number, amountOfBanknotes: IBanknotes): any => {
    const minimalBanknote = Math.min(...Object.keys(amountOfBanknotes).map((el) => +el));
    const arrOfGivenBanknotes: string[] = [];
    let maxBanknote: string | undefined = getBanknoteWithBiggestAmount(amountOfBanknotes);
    maxBanknote = getValidBanknoteWithBiggestAmount(maxBanknote, amount, amountOfBanknotes);

    while (amount - +maxBanknote! >= 0 || amount > minimalBanknote) {
        maxBanknote = getValidBanknoteWithBiggestAmount(maxBanknote, amount, amountOfBanknotes);

        if (maxBanknote === undefined || amountOfBanknotes[maxBanknote] === 0) break;

        amount -= +maxBanknote!;
        amountOfBanknotes[maxBanknote] = amountOfBanknotes[maxBanknote] - 1;
        arrOfGivenBanknotes.push(maxBanknote);
    }

    return { arrOfGivenBanknotes, amount };
};

export const ATMLogic = (amount: number, amountOfBanknotes: IBanknotes) => {
    const { arrOfGivenBanknotes, amount: moneyCouldntWithdraw } = calcHowMuchWasWithdrawn(amount, amountOfBanknotes);

    return {
        givenBanknotesToUser: getGivenBanknotesWithTheirFrequency(arrOfGivenBanknotes),
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
