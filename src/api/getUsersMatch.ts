import usersMock from '../mock/users';

const getUsersMatch = (searchVal: string) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(usersMock.filter((obj) => obj.name.toLowerCase().includes(searchVal.toLowerCase())));
        }, 400);
    })
};
export default getUsersMatch;