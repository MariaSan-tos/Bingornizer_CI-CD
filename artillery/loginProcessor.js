const users = [
    { email: "getuliofurtado03@gmail.com", password: "032023" },
    { email: "nicolas.03@gmail.com", password: "12345" }
];

module.exports = {
    beforeRequest: function (req, context, ee, next) {
        const index = Math.floor(Math.random() * users.length);
        const user = users[index];
        context.vars.email = user.email;
        context.vars.password = user.password;
        next();
    },
    postProcessor: function (req, res, context, ee, next) {
        const setCookie = res.headers['set-cookie'];
        if (setCookie) {
            context.vars.authCookie = setCookie.map(c => c.split(';')[0]).join('; ');
        }
        next();
    }
};
