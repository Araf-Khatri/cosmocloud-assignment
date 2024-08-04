import { FC, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Employee } from "../../types/employee";
import { deleteEmployee, listEmployees } from "../../requests/employees";

import "./index.css";

const LIMIT = 2;
const Employees: FC = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const employeesAPIRef = useRef<AbortController | null>(null);
  const [deletePopup, setDeletePopup] = useState<{
    show: boolean;
    _id: null | string;
    name: string | null;
  }>({ show: false, _id: null, name: null });
  const [page, setPage] = useState({
    currentPage: 0,
    totalRecords: 0,
  });

  const fetchEmployees = async (pageNumber: number = 0) => {
    if (employeesAPIRef.current) employeesAPIRef.current.abort();
    try {
      const controller = new AbortController();
      employeesAPIRef.current = controller;

      const response = await listEmployees(
        { limit: 2, offset: pageNumber * LIMIT },
        controller.signal
      );
      const employees = response.data?.data;
      const totalRecords = response.data?.page?.total;
      setEmployees(employees);
      setPage((prevState) => ({ ...prevState, totalRecords }));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchEmployees(0);
    return () => {
      employeesAPIRef?.current?.abort();
    };
  }, []);

  const editEmployeeHandler = (_id: string) => {
    navigate(`/view-profile/${_id}`);
  };

  const deleteEmployeeHandler = async (_id: string) => {
    try {
      await deleteEmployee({ _id });
      await fetchEmployees();
    } catch (err) {
      console.error("Something went wrong!");
    }
  };

  return (
    <>
      <div id="overlay"></div>
      <dialog open={deletePopup.show}>
        <h2>Delete Record</h2>
        <p>ID: {deletePopup._id}</p>
        <p>Name: {deletePopup.name}</p>
        <form method="dialog">
          <button
            onClick={() => {
              deleteEmployeeHandler(deletePopup._id!);
              setDeletePopup({ show: false, _id: null, name: null });
            }}
          >
            Yes, Delete Record
          </button>
        </form>
      </dialog>
      <div className="wrapper">
        <div className="wrapper-flex">
          <div className="employees">
            {employees.map(({ _id, name }) => (
              <div key={_id} className="card">
                <div className="card-content">
                  <div className="card-info">
                    <div className="card-id-badge">{`ID: ${
                      _id ?? "not found"
                    }`}</div>
                    <span className="card-name">{name}</span>
                  </div>
                  <div className="card-cta">
                    <button
                      onClick={() => editEmployeeHandler(_id!)}
                      className="cta-button edit-button"
                    >
                      View
                    </button>
                    <button
                      onClick={() =>
                        setDeletePopup({ show: true, _id: _id!, name })
                      }
                      className="cta-button delete-button"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="pagination">
            {new Array(Math.ceil(page.totalRecords / LIMIT))
              .fill("")
              .map((_, idx) => (
                <button key={idx}
                  className={idx === page.currentPage ? `active` : ""}
                  onClick={() => {
                    fetchEmployees(idx);
                    setPage((prevState) => ({
                      ...prevState,
                      currentPage: idx,
                    }));
                  }}
                >
                  {idx + 1}
                </button>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Employees;
