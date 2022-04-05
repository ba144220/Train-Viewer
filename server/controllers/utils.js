export const pinGenerator = () => {
    let pinLength = 6;
    let result = [];
    for (let i = 0; i < pinLength; i++) {
        result.push(Math.floor(Math.random() * 10).toString());
    }
    return result.join("");
};
export const checkIfDuplicateExists = (arr) => {
    return new Set(arr).size !== arr.length;
};
export const removeDuplicate = (arr) => {
    return [...new Set(arr)];
};
