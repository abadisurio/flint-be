module.exports = function (headers) {
    if (headers && headers.authorization) {
        var parted = headers.authorization.split('.');
        console.log("parted", parted)
        if (parted.length === 3) {
            return parted[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
};