import _ from "lodash";

const getShiftToTheRight = (obj) => {
    let result = {};
    for (const key in obj) {
        if (obj[key] instanceof Object) {
            result = {...result, [`  ${key}`]: getShiftToTheRight(obj[key])};
            continue;
        }
        result = {...result, [`  ${key}`]: obj[key]}
    }
    return result;
}

const searchDiff = (firstContent, secondContent, distinctiveMark) => {
    let result = {};
        for (const key in firstContent) {
            if (Object.hasOwn(secondContent, key) && firstContent[key] instanceof Object && secondContent[key] instanceof Object) {
                result = {...result, [`  ${key}`]: searchDiff(firstContent[key], secondContent[key], distinctiveMark)};
                continue;
            }
            if (firstContent[key] instanceof Object ) {
                firstContent[key] = getShiftToTheRight(firstContent[key]);
            }
            result = Object.hasOwn(secondContent, key) && secondContent[key] === firstContent[key] ? 
            {...result, [`  ${key}`]: firstContent[key]} : 
            {...result, [`${distinctiveMark} ${key}`]: firstContent[key]};
        }
    return result;
}

const sortContent = (arrData) => {
    const ignoringIndentation = 2;
    const result = Object.keys(arrData)
    .sort((currentKey, nextKey) => {
        const editedCurrentKey = currentKey.slice(ignoringIndentation);
        const editedNextKey = nextKey.slice(ignoringIndentation );
        if (editedCurrentKey < editedNextKey) {
            return -1;
        }
        if (editedCurrentKey > editedNextKey) {
            return 1;
        }
        return 0;
    })
    .reduce((acc, key) => {
        acc[key] = arrData[key] instanceof Object ? sortContent(arrData[key]) : arrData[key];
        return acc;
    }, {});
    return result;
}

const stringify = (obj, repeatChar, repeatAmount, deep = 1) => {
    let result = '';
    const leftShift = 2;
    const offsetIndent = repeatChar.repeat(deep * repeatAmount - leftShift);
    const indentWithoutOffset = repeatChar.repeat(deep * repeatAmount);
    for (const key in obj) {
        if (obj[key] instanceof Object) {
            result = `${result}\n${offsetIndent}${key}: {${stringify(obj[key], repeatChar, repeatAmount, deep + 1)}\n${indentWithoutOffset}}`;
            continue;
        }
        result = `${result}\n${offsetIndent}${key}: ${obj[key]}`;
    }
    return result;
}

const tree = (firstFileContent, secondFileContent) => {
    const firstDiffContent = searchDiff(firstFileContent, secondFileContent, '-');
    const secondDiffContent = searchDiff(secondFileContent, firstFileContent, '+');
    const allContent = sortContent(_.merge(firstDiffContent, secondDiffContent));
    const result = `{${stringify(allContent, ' ', 4)}\n}`;
    console.log(result);
    return result;
};

export default tree;