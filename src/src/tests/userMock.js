const mockUser = {
    id: 0,
    userName: 'JackTheLearner',
    password: '1234',
    contributions: 10,  // Number of new translations recieved from him
    score: 100,         // Number of correct translations made this month
    role: 'player'      // Role used for authentication
};

// Set's up an user at local's storage begin
const loadMockUser = () => {
    localStorage.setItem('mockUser', JSON.stringify(mockUser));
}

// Get's an user from this key at local storage
const mkGetUser = (key) => {
    const user = JSON.parse(localStorage.getItem(key));
    return user;
}


export { loadMockUser, mkGetUser };