import usersMock from '../mock/users';

const getUsersMatch = (searchVal: string) => {
    const result: Record<string, string>[] = usersMock.filter((obj) => obj.name.toLowerCase().includes(searchVal.toLowerCase()) && obj.name.length !== searchVal.length);
    return new Promise((resolve) => {
        setTimeout(resolve, 400, result);
    })
};
export default getUsersMatch;