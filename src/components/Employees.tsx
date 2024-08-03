import { FC } from "react";
import { Link } from "react-router-dom";

const Employees: FC = () => {
  return (
    <div>
      <nav className="navbar">
        <Link to={"/"} replace={true}>
          List of Employees
        </Link>
        <Link to={"/"} replace={true}>
          Create Employee
        </Link>
      </nav>

      <div className="employees">
        <div className="card">
          <div className="flex gap-4">
            <div className="badge">
              <p>ID</p>
            </div>
            <p>NAME</p>
          </div>
          <div className="card buttons">
            <button>Edit</button>
            <button>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employees;
