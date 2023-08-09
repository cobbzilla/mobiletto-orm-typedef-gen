export const updateOrmList = (typeDef, list, id, opts) => {
    if (!opts)
        return;
    if (list) {
        const foundIndex = list.findIndex((e) => typeDef.id(e) === id);
        if (foundIndex && foundIndex >= 0) {
            if (opts && opts.remove === true) {
                list.splice(foundIndex, 1);
            }
            else if (opts && opts.object) {
                list.splice(foundIndex, 1, opts.object);
            }
        }
    }
};
