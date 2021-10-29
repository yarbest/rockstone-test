// import { IBanknotes } from '../types/ATMTypes';

//эта функция показывает сколько и какого типа банкнот было выдано
const getGivenBanknotesWithTheirFrequency = (givenBanknotesArr: string[]) => {
    return givenBanknotesArr.reduce((acum: any, banknote) => {
        if (banknote in acum) acum[banknote] += 1;
        else acum[banknote] = 1;
        return acum;
    }, {});
};

const getBanknoteWithBiggestAmount = (amountOfBanknotes: any, prevMaxBanknote?: any) => {
    let maxBanknote: any = 0;
    Object.keys(amountOfBanknotes).forEach((el, i, arr) => {
        if (maxBanknote === 0) maxBanknote = arr[0];
        else if (amountOfBanknotes[el] > amountOfBanknotes[maxBanknote] && el !== prevMaxBanknote && amountOfBanknotes[maxBanknote] > 0)
            maxBanknote = el;
    });
    return maxBanknote;
};

const calcHowMuchWasWithdrawn = (amount: any, amountOfBanknotes: any) => {
    let maxBanknote: any = getBanknoteWithBiggestAmount(amountOfBanknotes);
    const arrOfGivenBanknotes = [];
    while (amount > 0) {
        maxBanknote = maxBanknote > amount ? getBanknoteWithBiggestAmount(amountOfBanknotes, maxBanknote) : maxBanknote;

        console.log(maxBanknote);
        amount -= maxBanknote;
        amountOfBanknotes[maxBanknote] = amountOfBanknotes[maxBanknote] - 1;
        arrOfGivenBanknotes.push(maxBanknote);
    }

    return { arrOfGivenBanknotes, amount };
};

export const ATMLogic = (amount: number, amountOfBanknotes: any): any => {
    const { arrOfGivenBanknotes, amount: moneyCouldntWithdraw }: any = calcHowMuchWasWithdrawn(amount, amountOfBanknotes);

    const givenBanknotesWithTheirFrequency = getGivenBanknotesWithTheirFrequency(arrOfGivenBanknotes);

    return {
        givenBanknotesToUser: givenBanknotesWithTheirFrequency,
        moneyLeft: moneyCouldntWithdraw.toFixed(2),
        amountOfBanknotesInATM: amountOfBanknotes,
    };
};
