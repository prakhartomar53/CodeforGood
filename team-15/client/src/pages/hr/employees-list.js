import { GetAllEmployees } from "../../services/hr.service";
import Navbar from "../../components/common/Navbar";
import "../../styles/employees-list.scss";
import { useQuery } from "react-query";
import { IoIosArrowDropdown } from "react-icons/io";
import InnerLayout from "../../components/layout/inner";
import { Link } from "react-router-dom";
export default function EmployeeList() {
  const { data: employees } = useQuery("employees", GetAllEmployees);
  console.log(employees);
  return (
    <InnerLayout>
      <div className="main">
        <div className="heading">
          <span>Employees</span>
        </div>
        <div className="filters">
          <span>Filters</span>
          <div className="filter">
            Age
            <IoIosArrowDropdown color="white" />
          </div>
          <div className="filter">
            Location
            <IoIosArrowDropdown color="white" />
          </div>
          <div className="filter">
            Gender <IoIosArrowDropdown color="white" />
          </div>
          <div className="filter">
            Role <IoIosArrowDropdown color="white" />
          </div>
        </div>
        <div className="list">
          {employees?.map(({ name, _id }) => (
            <FilterCard
              name={name}
              _id={_id}
              image="https://picsum.photos/200/300"
            />
          ))}
        </div>
      </div>
    </InnerLayout>
  );
}

function FilterCard({ _id, name, image }) {
  return (
    <Link to={`/employee/details?uid=${_id}`}>
      <div className="card2">
        <img src={image} />
        <span>{name}</span>
      </div>
    </Link>
  );
}
