const mockUser = {
    id: 0,
    userName: 'JackTheLearner',
    email: 'Jack.lr@gmail.com',
    password: '1234',
    contributions: 10,  // Number of new translations recieved from him
    score: 100,         // Number of correct translations made this month
    role: 'player'      // Role used for authentication
};

// Set's up an user at local's storage begin
const loadMockUser = (key, mkUser) => {
    localStorage.setItem(key, JSON.stringify(mkUser));
}

// Get's an user from this key at local storage
const mkGetUser = (key) => {
    const user = JSON.parse(localStorage.getItem(key));
    return user;
}

const mkLogin = async (email, password) => {
    const user = mkGetUser('myUser');

    // Verifying if the given already user exists
    if(!user)
        return null;

    // Verifying if he has correct credentials
    if(email !== user.email || password !== user.password)
        return null
    return user;
};

const mkRegister = async (data) => {
    const newMkUser = {
        id: 1,
        userName: data.userName,
        email: data.email,
        password: data.password,
        contributions: 0,
        score: 0,
        role: 'player' 
    };

    loadMockUser('myUser', newMkUser);
    return newMkUser;
}

export { loadMockUser, mkGetUser, mkLogin, mkRegister };