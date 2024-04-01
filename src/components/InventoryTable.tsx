import React, { ReactNode, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Styles.css"; // Import CSS file
import {
  setProducts,
  deleteProduct,
  disableProduct,
  updateProduct,
} from "../redux/Inventory";
import { RootState } from "../redux/RootReducer";
import { Product } from "../types/Inventory";
import {
  AttachMoney,
  BlockOutlined,
  Category,
  DeleteOutline,
  EditOutlined,
  EmojiObjects,
  ExitToApp,
  RemoveRedEyeOutlined,
} from "@mui/icons-material";
import {
  IconButton,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

interface StatsBoxProps {
  icon: ReactNode;
  title: string;
  value: number;
  color: string;
}

const StatsBox: React.FC<StatsBoxProps> = ({ icon, title, value, color }) => {
  return (
    <Paper
      className="stats-box"
      style={{ backgroundColor: color, color: "white" }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {icon}
        <div>
          <div>{title}</div>
          <div style={{ fontWeight: "bold", fontSize: 30 }}>{value}</div>
        </div>
      </div>
    </Paper>
  );
};

const InventoryTable: React.FC = () => {
  const dispatch = useDispatch();
  const { products, totalProducts, totalStoreValue, outOfStock, categories } =
    useSelector((state: RootState) => state.inventory);

  useSelector((state: RootState) => state.inventory);

  useEffect(() => {
    fetch("https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory")
      .then((response) => response.json())
      .then((data) => dispatch(setProducts(data)));
  }, [dispatch]);

  const [isAdminViewState, setisAdminViewState] = useState(false);
  const handleSwitchChange = () => {
    setisAdminViewState(!isAdminViewState);
  };
  console.log(isAdminViewState);

  return (
    <div
      className="inventory-container"
      style={{ backgroundColor: "#1a1a1a", color: "white" }}
    >
      <nav className="top-bar">
        <div></div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div>admin</div>
          <Switch checked={isAdminViewState} onChange={handleSwitchChange} />
          <div>user</div>
          <ExitToApp style={{ marginLeft: 35 }} />
        </div>
      </nav>

      <h2 className="inventory-stats-title">Inventory Stats</h2>

      <div
        className="stats-container"
        style={{
          paddingBottom: 50,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <StatsBox
          icon={<EmojiObjects />}
          title="Total Products"
          value={totalProducts}
          color="#3cb371"
        />
        <StatsBox
          icon={<AttachMoney />}
          title="Total Store Value"
          value={totalStoreValue}
          color="#3cb371"
        />
        <StatsBox
          icon={<AttachMoney />}
          title="Out of Stock"
          value={outOfStock}
          color="#3cb371"
        />
        <StatsBox
          icon={<Category />}
          title="No. of Categories"
          value={categories.length}
          color="#3cb371"
        />
      </div>

      <TableContainer
        component={Paper}
        style={{
          backgroundColor: "#434547",
          color: "white",
          marginBottom: 50,
        }}
      >
        <Table
          className="inventory-table"
          style={{ backgroundColor: "#434547", color: "white" }}
        >
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products &&
              products.length &&
              products?.map((product) => (
                <TableRow
                  key={product?.id}
                  className={product?.isDisabled ? "disabled" : ""}
                >
                  <TableCell>{product?.name}</TableCell>
                  <TableCell>{product?.category}</TableCell>
                  <TableCell>{product?.price}</TableCell>
                  <TableCell>{product?.quantity}</TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="delete"
                      // onClick={() => handleDelete(product?.id)}
                      style={{ color: isAdminViewState ? "gray" : "green" }}
                      disabled={isAdminViewState}
                    >
                      <EditOutlined />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      // onClick={() => handleDelete(product?.id)}
                      style={{ color: isAdminViewState ? "gray" : "purple" }}
                      disabled={isAdminViewState}
                    >
                      <RemoveRedEyeOutlined />
                    </IconButton>
                    <IconButton
                      aria-label="disable"
                      // onClick={() => handleDisable(product?.id)}
                      style={{ color: isAdminViewState ? "gray" : "red" }}
                      disabled={isAdminViewState}
                    >
                      <DeleteOutline />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default InventoryTable;
