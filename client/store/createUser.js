import Axios from "axios";

const CREATE_USER = "CREATE_USER";
const SET_USERS = "SET_USERS";

export const _createUser = (email) => {
    return {
        type: CREATE_USER,
        email,
    };
};

export const setUsers = (users) => {
    return {
        type: SET_USERS,
        users,
    };
};

export const createUser = (user, history) => {
    return async (dispatch) => {
        const { data: token } = await Axios.post("/api/users", user);
        window.localStorage.setItem("token", token);
        const { data: email } = await Axios.get("/api/users/email", {
            headers: {
                token,
            },
        });
        dispatch(_createUser(email));
        history.push("/");
    };
};

export const fetchUsers = () => {
    return async (dispatch) => {
        try {
            const { data } = await Axios.get("/api/users");
            dispatch(setUsers(data));
        } catch (err) {
            console.log(err);
        }
    };
};
const initialState = [];

export default function createUserReducer(state = initialState, action) {
    switch (action.type) {
        case CREATE_USER:
            return action.email;
        case SET_USERS:
            return action.users;
        default:
            return state;
    }
}
