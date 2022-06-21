import React from "react";
import ProductTable from "./ProductTable";
import UserTable from "./UserTable";

const Admin = () => {
    return (
        <div>
            <div>
                <ProductTable />
                <UserTable />
            </div>
        </div>
    );
};

export default Admin;
