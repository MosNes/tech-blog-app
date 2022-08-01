module.exports = {
    //formats date to MM/DD/YYYY
    format_date: date => {
        return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(
            date
        ).getFullYear()}`;
    },

    //pluralizes a word if the number is 0 or more than 1
    format_plural: (word, number) => {
        if (number === 1) {
            return word;
        }
        return `${word}s`;
    }
}