const printNumbers = numbers => {
    if (numbers.length === 0) return 0;

    console.log(numbers[0]);
    printNumbers(numbers.slice(1));
};

printNumbers([1,2,3]);
