function formatName(data) {
    const { first_name, sir_name } = data;
    if (!first_name || !sir_name) {
        return data.full_name;
    }
    return `${first_name} ${sir_name}`;
}

module.exports = {
    beforeCreate({params:{data}}) {
        data.full_name = formatName(data);
    },
    beforeUpdate({params:{data}}) {
        data.full_name = formatName(data);
    },
};