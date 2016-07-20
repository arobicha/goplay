/**
 * Created by arobichaud on 7/20/2016.
 */
module.exports = {
    user: "dbusername",
    password: "dbpassword",
    url: "example.com",
    port: "12345",
    db: "exampledb",
    getUri: function() {
        return "mongodb://" + this.user + ":" + this.password + "@" + this.url + ":" + this.port + "/" + this.db;
    }
};