function todayGenerator() {
    const today = new Date();
    date = today.toISOString()
    return date
}

module.exports = {
    beforeCreate({params:{data}}) {
        data.first_registration = todayGenerator();
    },
};