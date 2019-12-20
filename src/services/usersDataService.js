import users from '../db/users.json';
import uuidv1 from 'uuid/v1';

class UserService {
    constructor(initUsers = []) {
        this.userList = initUsers;
    }

    getAllUsers() {
        return this.userList.filter(user => !user.isDeleted);
    }

    getUserById(id) {
        const userIndex = this.userList.findIndex(user => user.id === id);
        if (userIndex > -1 && !this.userList[userIndex].isDeleted) {
            return this.userList[userIndex];
        }
        return null;
    }

    removeUserById(id) {
        const userIndex = this.userList.findIndex(user => user.id === id);
        if (userIndex > -1 && !this.userList[userIndex].isDeleted) {
            this.userList[userIndex].isDeleted = true;
            return this.userList[userIndex];
        }
        return null;
    }

    updateUserById(id, payload) {
        const userIndex = this.userList.findIndex(user => user.id === id);
        if (userIndex > -1 && !this.userList[userIndex].isDeleted) {
            return Object.assign(this.userList[userIndex], payload);
        }
        return null;
    }

    createUser({ login, password, age }) {
        const newUser = {
            login,
            password,
            age,
            isDeleted: false,
            id: uuidv1()
        };
        this.userList.push(newUser);
        return newUser;
    }

    getAutoSuggestUsers(loginSubstring, limit) {
        return this.userList
            .filter(item => item.login.startsWith(loginSubstring))
            .map(item => item.login)
            .sort()
            .slice(0, Number(limit));
    }
}

export default new UserService(users);
