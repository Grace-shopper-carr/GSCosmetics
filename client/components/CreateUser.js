import React from "react";
import { connect } from "react-redux";
import { createUser } from "../store/createUser";

// this is our Signup component
export class CreateUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "", //???
            password: "", // ???
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value,
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        try {
            this.props.createUser(this.state);
        } catch (error) {
            this.setState({
                email: "",
                password: "",
            });
        }
    }
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor="email">
                            <p>Email</p>
                        </label>
                        <input
                            type="text"
                            name="email"
                            onChange={this.handleChange}
                            value={this.state.email}
                        />
                    </div>
                    <div>
                        <label htmlFor="password">
                            <p>Password</p>
                        </label>
                        <input
                            type="password"
                            name="password"
                            onChange={this.handleChange}
                            value={this.state.password}
                        />
                    </div>
                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch, otherProps) => {
    return {
        createUser: (props) => dispatch(createUser(props, otherProps.history)),
    };
};

export default connect(null, mapDispatchToProps)(CreateUser);
