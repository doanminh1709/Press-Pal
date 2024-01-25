'use strict';

class User {
    constructor(firstname, lastname, username, password , pageSize = 5 , category = "business") {
        this.firstname = firstname;
        this.lastname = lastname;
        this.username = username;
        this.password = password;
        this.pageSize = pageSize;
        this.category = category;
    }
}
