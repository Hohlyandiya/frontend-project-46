import plain from "./plain/plain.js";
import tree from "./tree/tree.js";

const useFormatter = (fileContent1, fileContent2, formatter) => {
        switch (formatter) {
            case 'plain':
                return plain(fileContent1, fileContent2);
            case 'tree':
                return tree(fileContent1, fileContent2);
            default:
                throw new Error('There is no such formatter');
        }
}

export default useFormatter; 