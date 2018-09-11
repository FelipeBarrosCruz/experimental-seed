module.exports = {
    width:  function(value) {
        return value ? Math.ceil(value / 5) : 150;
    },
    heigth: function(value) {
        return value ? Math.ceil(value / 5) : 160;
    },
    mimetype: 'PNG'
};
