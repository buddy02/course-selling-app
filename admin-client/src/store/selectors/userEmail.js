import { selector } from "recoil";

const userEmail = selector({
    key: 'userEmail',
    get: ({ get }) => {
        const user = get(userState);
        return user.userEmail;
    },
});