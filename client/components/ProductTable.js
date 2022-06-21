import React, { Component } from "react";
import MaterialTable, { MTableToolbar } from "material-table";
import tableIcons from "./MaterialTableIcons";
import { connect } from "react-redux";
import { fetchProducts } from "../store/products";

var columns = [
    { title: "Brand Name", field: "brandName" },
    { title: "Product Name", field: "productName" },
    { title: "Product Type", field: "productType" },
    { title: "Price", field: "price" },
    { title: "Stock", field: "stock" },
];

class ProductTable extends Component {
    componentDidMount() {
        this.props.fetchProducts();
    }

    render() {
        return (
            <MaterialTable
                title={"Product Table"}
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
                data={this.props.products}
            />
        );
    }
}

const mapStateToProps = (state) => ({
    products: state.products,
});

const mapDispatchToProps = (dispatch) => ({
    fetchProducts: () => dispatch(fetchProducts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductTable);
