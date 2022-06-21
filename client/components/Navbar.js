import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";

const Navbar = ({ handleClick, isLoggedIn }) => (
    <div>
        <img src="https://i.postimg.cc/8CT6Kj1Q/banner.png" />

        <nav id="navbar">
            {isLoggedIn ? (
                <div>
                    {/* The navbar will show these links after you log in */}
                    <Link to="/">Home</Link>
                    <Link to="/products">🛍️ All</Link>
                    <Link to="/products/face">🧴 Face</Link>
                    <Link to="/products/eye">👁️ Eye</Link>
                    <Link to="/products/lip">🫦 Lip</Link>
                    <Link to="/products/nail">💅🏻 Nail</Link>
                    <Link to="/logout" onClick={handleClick}>
                        Log Out
                    </Link>
                    <Link to="/cart">Cart</Link>
                </div>
            ) : (
                <div>
                    {/* The navbar will show these links after you log out */}
                    <Link to="/">Home</Link>
                    <Link to="/products">🛍️ All</Link>
                    <Link to="/products/face">🧴 Face</Link>
                    <Link to="/products/eye">👁️ Eye</Link>
                    <Link to="/products/lip">🫦 Lip</Link>
                    <Link to="/products/nail">💅🏻 Nail</Link>
                    <Link to="/login">Login</Link>
                    <Link to="/signup">Sign Up</Link>
                    <Link to="/cart/${userId}">🛒 Cart</Link>
                </div>
            )}
        </nav>
        <hr />
    </div>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
    return {
        isLoggedIn: !!state.auth.id,
    };
};

const mapDispatch = (dispatch) => {
    return {
        handleClick() {
            dispatch(logout());
        },
    };
};

export default connect(mapState, mapDispatch)(Navbar);
