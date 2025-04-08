import getSortedTreeDiff from "../tree/sorted-tree.js";

const json = (fileContent1, fileContent2) => {
    const sortedTreeDiff = getSortedTreeDiff(fileContent1, fileContent2);
    return JSON.stringify(sortedTreeDiff, null, 2);
}

export default json;