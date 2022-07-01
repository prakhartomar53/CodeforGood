import InnerLayout from "../../components/layout/inner";
import { GetAllRoles } from "../../services/hr.service.js";
import { useQuery } from "react-query";
import "../../styles/role.scss";
import { Tooltip, Pie, PieChart, ResponsiveContainer } from "recharts";
export default function RolesPage() {
  const { data: roles } = useQuery("roles", GetAllRoles);
  console.log(roles);

  return (
    <InnerLayout>
      <div className="rolemaincontainer">
        <div className="heading">Roles</div>
        <div className="cards">
          {Object.keys(roles || {}).map((role) => (
            <div className="rolecard">
              <div className="heading">{role}</div>
              <div className="stats">
                <div className="stat">
                  <span>Employees</span>
                  <span>{roles[role].employees || 0}</span>
                </div>
                <div className="stat">
                  <span>Applicants</span>
                  <span>{roles[role].applicants || 0}</span>
                </div>
              </div>
              <div className="stats">
                <div className="stat">
                  <span>Probation</span>
                  <span>{roles[role].probation || 0}</span>
                </div>
                <div className="stat">
                  <span>Exited</span>
                  <span>{roles[role].left || 0}</span>
                </div>
              </div>
              <div>
                <ResponsiveContainer width={200} height={180}>
                  <PieChart width={200} height={180}>
                    <Pie
                      data={[
                        { name: "Left", count: roles[role].left || 0 },
                        {
                          name: "Applicants",
                          count: roles[role].applicants || 0,
                        },
                        {
                          name: "probation",
                          count: roles[role].probation || 0,
                        },
                        {
                          name: "employees",
                          count: roles[role].employees || 0,
                        },
                      ]}
                      cx={80}
                      cy={100}
                      innerRadius={0}
                      outerRadius={70}
                      fill="#003974"
                      paddingAngle={5}
                      dataKey={"count"}
                      nameKey={"name"}
                    />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          ))}
        </div>
      </div>
    </InnerLayout>
  );
}
