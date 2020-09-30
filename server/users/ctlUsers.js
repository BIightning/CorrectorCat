//Nützliche Module
    var path = require('path');
    var fs = require('fs');

//Data File
    userDataPath = path.join(__dirname, "userData.json");

module.exports.getUsers = () => {
        data = fs.readFileSync(userDataPath, 'utf-8');
        return JSON.parse(data);
}

module.exports.writeUser = (user) => {
    users = this.getUsers();
    let newId = 0;
    for(let i = 0; i < users.length; i++){
        if(users[i].id >= newId){
            newId = users[i].id + 1;
        }
    }
    user.id = newId;
    users.push(user);
    writeData(users);
}

module.exports.getUserById = (id) => {
    users = this.getUsers();
    for(let i = 0; i < users.length; i++){
        if(users[i].id == id){
            return users[i];
        } 
    }
}

module.exports.getUserByEmail = (email) => {
    users = this.getUsers();
    for(let i = 0; i < users.length; i++){
        if(users[i].email == email){
            return users[i];
        } 
    }
}

module.exports.deleteUser = (id) => {
    users = this.getUsers();
    for(let i = 0; i < users.length; i++){
        if(users[i].id == id){
            users.splice(i,1);
        } 
    }
    writeData(users);
}

module.exports.changeUser = (id, user) => {
    users = this.getUsers();
    for(let i = 0; i < users.length; i++){
        if(users[i].id == id){
            uid = users[i].id;
            users[i] = user;
            users[i].id = uid;
        } 
    }
    writeData(users);
}

function writeData(data){
    fs.writeFileSync(userDataPath, JSON.stringify(data), 'utf-8');
}


