import React from "react";
import "../../styles/applications.scss";
import { useQueryClient, useQuery } from "react-query";
import {
  AcceptApplication,
  GetAllApplications,
} from "../../services/hr.service";
import InnerLayout from "../../components/layout/inner";
import { Button, message } from "antd";
function Applications() {
  const { data: applications } = useQuery("applications", GetAllApplications);
  const queryClient = useQueryClient();
  const [loading, setLoading] = React.useState(false);
  const onRejectApplication = async (_id) => {
    setLoading(true);
    try {
      await AcceptApplication({ application: _id });
      message.success("Rejected!");
    } catch (err) {
      console.log("ERROR");
      console.log(err);
      message.error(err.response.data.message);
    } finally {
      setLoading(false);
      queryClient.invalidateQueries("applications");
    }
  };
  const onAcceptApplication = async (_id) => {
    setLoading(true);
    try {
      await AcceptApplication({ application: _id });
      message.success("Accepted!");
    } catch (err) {
      console.log("ERROR");
      console.log(err);
      message.error(err.response.data.message);
    } finally {
      setLoading(false);
      queryClient.invalidateQueries("applications");
    }
  };
  return (
    <InnerLayout>
      <div className="mainapplications">
        <h1 className="heading">Applications</h1>
        <div className="cards">
          <div className="card-row">
            {applications?.map(
              ({ name, position, status, yearsOfExperience, image, _id }) => (
                <div className="card">
                  {console.log(image)}
                  <div className="top">
                    <img src="data:image/jpeg;base64,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" />
                    <div className="header-content">
                      <span className="font-big">Name </span>
                      <span>{name}</span>
                      <br />
                      <span>Role </span>
                      <span>{position}</span>
                    </div>
                  </div>
                  <div className="content">
                    <ul>
                      <li>
                        <b>Experience : </b> <span>{yearsOfExperience}</span>
                      </li>
                      <li>
                        <b>Resume : </b>{" "}
                        <span>
                          <img src={"data:image/png;base64," + image} />
                        </span>
                      </li>
                      <li>
                        <b>Email : </b> <span>aryamann@gmail.com</span>
                      </li>
                      <li>
                        <b>Contact : </b> <span>234567890</span>
                      </li>
                      <li>
                        <b>Status : </b> <span>{status}</span>
                      </li>
                    </ul>
                    <div>
                      <Button
                        onClick={() => onAcceptApplication(_id)}
                        style={{ margin: "10px 4px" }}
                        loading={loading}
                      >
                        Accept
                      </Button>
                      <Button
                        onClick={() => onRejectApplication(_id)}
                        style={{ margin: "10px 4px" }}
                        loading={loading}
                      >
                        Reject
                      </Button>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </InnerLayout>
  );
}

export default Applications;
