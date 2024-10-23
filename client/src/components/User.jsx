import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { useState, useEffect } from "react";

const columns = [
  { field: "id", headerName: "ID", width: 200 },
  { field: "fullName", headerName: "Full Name", width: 150 },
  { field: "email", headerName: "Email", width: 150 },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 90,
  },
  { field: "pic", headerName: "picture", width: 150 },
  { field: "isAdmin", headerName: "isAdmin", width: 150 },
];

export default function DataTable() {
  const [rows, setRows] = useState([]);

  // const paginationModel = { page: 0, pageSize: 5 };

  const fetchData = async () => {
    // Fetch data from your API or any other source
    const response = await fetch(`${import.meta.env.VITE_REACT_PUBLIC_BACKEND_URL}/api/user/all`);
    const data = await response.json();
    console.log("data", data, data.length);
    setRows(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    // <Paper sx={{ height: "100%", width: "100%" }}>
    //   <DataGrid
    //     rows={rows}
    //     columns={columns}
    //     initialState={{ pagination: { paginationModel } }}
    //     pageSizeOptions={[5, 10]}
    //     // checkboxSelection
    //     sx={{ border: 0 }}
    //   />
    // </Paper>
    <div className="container mx-auto p-2 md:p-6">
      <h1 className="text-2xl font-bold mb-4">Customer List</h1>
      <table className="min-w-full bg-white rounded-lg shadow-lg">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm">
            <th className="py-1 px-2 lg:py-3 lg:px-4 text-left">ID</th>
            <th className="py-1 px-2 lg:py-3 lg:px-4 text-left">Name</th>
            <th className="py-1 px-2 lg:py-3 lg:px-4 text-left">Email</th>
            <th className="py-1 px-2 lg:py-3 lg:px-4 text-left">Picture</th>
            <th className="py-1 px-2 lg:py-3 lg:px-4 text-left">Role</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            return (
              <tr className="hover:bg-gray-100 text-black border" key={row._id}>
                <td className="py-1 px-2 lg:py-3  lg:px-4 border">{row._id}</td>
                <td className="py-1 px-2 lg:py-3  lg:px-4 border">{row.name}</td>
                <td className="py-1 px-2 lg:py-3  lg:px-4 border">{row.email}</td>
                <td className="py-1 px-2 lg:py-3  lg:px-4 border">
                  <img
                    src={row.picture}
                    alt="Customer Picture"
                    className="rounded-full border"
                  />
                </td>
                <td className={`py-1 px-2 lg:py-3 lg:px-4 border ${row.isAdmin && "text-blue-500"}`}>
                  {row.isAdmin ? "Admin" : "User"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
