import React, { Component } from "react";
import MaterialTable, { MTableToolbar } from "material-table";
import tableIcons from "./MaterialTableIcons";
import { connect } from "react-redux";
import { fetchUsers } from "../store/createUser";

const columns = [
    { title: "Email", field: "email" },
    { title: "User Type", field: "userType" },
];

class UserTable extends Component {
    componentDidMount() {
        this.props.fetchUsers();
    }

    render() {
        return (
            <MaterialTable
                title={"User Table"}
                icons={tableIcons}
                options={{
                    grouping: true,
                    dense: true,
                    filtering: true,
                    exportButton: true,
                    search: true,
                }}
                components={{
                    Toolbar: (props) => <MTableToolbar {...props} />,
                }}
                columns={columns}
                data={this.props.users}
            />
        );
    }
}

const mapStateToProps = (state) => ({
    // pay attention to the reducer name
    users: state.createUserReducer,
});

const mapDispatchToProps = (dispatch) => ({
    fetchUsers: () => dispatch(fetchUsers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserTable);
