const secret = process.env.MONGOLAB_SECRET;
const database = process.env.MONGOLAB_URI;

module.exports = {
    'secret': "nodeauthsecret",
    'database': database
};