import _ from "lodash";

const getShiftToTheRight = (obj) => {
    let result = {};
    const listKey = Object.keys(obj);
    listKey.forEach(key => {
        if (obj[key] instanceof Object) {
            result = {...result, [`  ${key}`]: getShiftToTheRight(obj[key])};
            return;
        }
        result = {...result, [`  ${key}`]: obj[key]}
    })
    return result;
}

const searchDiff = (firstContent, secondContent, distinctiveMark) => {
    let result = {};
    const listKey = Object.keys(firstContent);
    listKey.forEach(key => {
        if (Object.hasOwn(secondContent, key) && firstContent[key] instanceof Object && secondContent[key] instanceof Object) {
            result = {...result, [`  ${key}`]: searchDiff(firstContent[key], secondContent[key], distinctiveMark)};
            return;
        }
        if (firstContent[key] instanceof Object ) {
            firstContent[key] = getShiftToTheRight(firstContent[key]);
        }
        result = Object.hasOwn(secondContent, key) && secondContent[key] === firstContent[key] ? 
        {...result, [`  ${key}`]: firstContent[key]} : 
        {...result, [`${distinctiveMark} ${key}`]: firstContent[key]};
    })
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

const getSortedTreeDiff = (firstFileContent, secondFileContent) => {
    const firstDiffContent = searchDiff(firstFileContent, secondFileContent, '-');
    const secondDiffContent = searchDiff(secondFileContent, firstFileContent, '+');
    const allContent = sortContent(_.merge(firstDiffContent, secondDiffContent));
    return allContent;
}

export default getSortedTreeDiff;