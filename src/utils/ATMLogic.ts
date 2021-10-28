// (купюры 5000= 100; 2000= 400; 1000= 1000; 500= 3000; 200= 5000; 100= 8000;
// 50= 10000)

//количество выдаваемых купюр и остаток
//справки, в которой будет информация сколько купюр каждого вида осталось;

export const ATMLogic = (amount: number): [any, string, any] => {
    // let amount = 53111.22;
    const amountOfBanknotes: any = {
        5000: 100,
        2000: 400,
        1000: 1000,
        500: 3000,
        200: 5000,
        100: 8000,
    };

    let arrOfGivenBanknotes: string[] = [];

    const ATM = () => {
        if (amount < 100) return arrOfGivenBanknotes;

        Object.keys(amountOfBanknotes)
            .reverse()
            .forEach((banknote: string) => {
                if (amount >= Number(banknote)) {
                    amountOfBanknotes[banknote] = amountOfBanknotes[banknote] - 1;
                    amount -= Number(banknote);
                    arrOfGivenBanknotes.push(banknote);
                }
            });

        arrOfGivenBanknotes = amount > 0 ? ATM() : arrOfGivenBanknotes;
        return arrOfGivenBanknotes;
    };

    const getGivenBanknotes = (givenBanknotesArr: string[]) => {
        return givenBanknotesArr.reduce((acum: any, banknote) => {
            if (banknote in acum) acum[banknote] += 1;
            else acum[banknote] = 1;
            return acum;
        }, {});
    };

    const givenBanknotesArr1 = ATM();
    const givenBanknotes1 = getGivenBanknotes(givenBanknotesArr1);

    // const [givenBanknotesArr2, left2] = ATM(57011)
    // const givenBanknotes2 = getGivenBanknotes(givenBanknotesArr2)

    // console.log(givenBanknotes1, 'left', amount.toFixed(2));
    // console.log(givenBanknotes2, left2)
    return [givenBanknotes1, amount.toFixed(2), amountOfBanknotes];
};
