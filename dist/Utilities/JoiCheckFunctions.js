function parseJoiTypeItems(item, JoiItem) {
    var validationResult = JoiItem.validate(item);
    if (validationResult.error !== undefined) {
        return undefined;
    }
    else {
        return validationResult.value;
    }
}
function isJoiTypeItem(item, JoiItem) {
    return parseJoiTypeItems(item, JoiItem) !== undefined;
}
function generateParseFunction(JoiItem) {
    return (function (item) {
        return parseJoiTypeItems(item, JoiItem);
    });
}
function generateIsTypeItemFunction(JoiItem) {
    return (function (item) {
        return isJoiTypeItem(item, JoiItem);
    });
}
export { parseJoiTypeItems, isJoiTypeItem, generateIsTypeItemFunction, generateParseFunction };
//# sourceMappingURL=JoiCheckFunctions.js.map