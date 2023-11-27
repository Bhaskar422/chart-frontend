import { GridColDef } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Add from "../../components/add/Add";
import DataTable from "../../components/dataTable/DataTable";
import { apiUrl } from "../../lib/config";
import "./users.scss";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "img",
    headerName: "Avatar",
    width: 100,
    renderCell: (params) => {
      return <img className="cellImg" src={params.row.img || "/noavatar.png"} alt="" />;
    },
  },
  {
    field: "firstName",
    headerName: "First name",
    width: 150,
    editable: true,
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 150,
    editable: true,
  },
  {
    field: "email",
    headerName: "Email",
    type: "string",
    width: 200,
  },
  {
    field: "phone",
    headerName: "Phone",
    type: "string",
    width: 200,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 200,
  },
  {
    field: "verified",
    headerName: "Verified",
    type: "boolean",
    width: 150,
  },
];

const Users = () => {
  const [open, setOpen] = useState<boolean>(false);

  const { isLoading, data } = useQuery({
    queryKey: ["allusers"],
    queryFn: () => fetch(`${apiUrl}/users`).then((res) => res.json()),
  });
  return (
    <div className="users">
      <div className="info">
        <h1>Users</h1>
        <button onClick={() => setOpen(true)}>Add New User</button>
      </div>
      {isLoading ? "Loading" : <DataTable slug="users" columns={columns} rows={data} />}
      {open && <Add slug="user" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default Users;
