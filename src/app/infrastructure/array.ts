export const listWithItemRemoved = <T>(val: T, list: T[]) => {

    if (!list) return list;

    return list.filter(li => li !== val);
}