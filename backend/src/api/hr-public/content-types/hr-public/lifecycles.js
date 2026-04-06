function formatTitle(data) {
    const { pub_date, pub_title } = data;
    if (!pub_title || !pub_date) {
        return data.dropdownLabel;
    }
    return `${pub_date} ${pub_title}`;
}

module.exports = {
    beforeCreate({params:{data}}) {
        data.dropdownLabel = formatTitle(data);
    },
    beforeUpdate({params:{data}}) {
        data.dropdownLabel = formatTitle(data);
    },

    
    
};