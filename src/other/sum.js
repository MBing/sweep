const rest = list => list.slice(1);
const first = list => list[0];
const sum = numbers => {
    if (numbers.length === 0) return 0;
    return first(numbers) + sum(rest(numbers));
};

const join = separator => list => {
    if (list.length === 0) return '';
    if (list.length === 1) return first(list);
    return first(list) + separator + join(separator, rest(list));
};

const makeList = first => rest => [first].concat(rest);
const getEmails = users => {
    if (users.length === 0) return [];
    makeList(first(users).email, getEmails(rest(users)));
};
