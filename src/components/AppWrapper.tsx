import { FC, ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";

type AppWrapperProps = {
  children: ReactNode;
};

const navLinks = [
  {
    path: "/",
    name: "List of Employees",
    replace: true,
  },
  {
    path: "/create",
    name: "Create Employee",
    replace: true,
  },
];

const AppWrapper: FC<AppWrapperProps> = ({ children }) => {
  const location = useLocation();
  console.log(location);
  return (
    <div>
      <div className="navbar-container">
        <nav className="navbar">
          {navLinks.map(({ name, path, replace }) => (
            <Link
              className={`nav-link ${
                path === location.pathname ? "active" : ""
              }`}
              to={path}
              replace={replace}
            >
              {name}
            </Link>
          ))}
        </nav>
      </div>
      {children}
    </div>
  );
};

export default AppWrapper;
