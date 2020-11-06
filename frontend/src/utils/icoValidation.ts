// validation formula: https://cs.wikipedia.org/wiki/Identifika%C4%8Dn%C3%AD_%C4%8D%C3%ADslo_osoby#Struktura_I%C4%8CO
export const validateICO = (icoString: string): boolean => {
    let icoLen = icoString.length;
    let weight = 2;
    let sum = 0;

    //dont use the last number
    for (let i = icoLen - 2; i >= 0; i--)
        sum += parseInt(icoString.charAt(i), 10) * weight++;

    let tmp = sum % 11;
    tmp = (11 - tmp) % 10;

    return parseInt(icoString.charAt(icoLen - 1), 10) === tmp;
}