import { useState } from "react";
import "../../styles/login.scss";
import logo from "../../images/logo.svg";
import { Button, Form, Input, message } from "antd";
import { SignInEmployee } from "../../services/employee.service";
import store from "../../store/store";
import { loginUser } from "../../store/user.slice";
import { useNavigate } from "react-router-dom";
export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onLoginSubmit = async (values) => {
    setLoading(true);
    try {
      console.log(values);
      const response = await SignInEmployee(values);
      console.log(response);
      message.success("Signed in!");
      store.dispatch(loginUser(response));
      navigate(`/employee/details?uid=${response.userData.id}`);
    } catch (err) {
      console.log("ERROR");
      console.log(err);
      message.error(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="logincontainer">
      <div className="mainc">
        <div className="mainheading">
          <div>Hello, Family!</div>
          <div className="bold">Welcome Back</div>
        </div>
        <div className="logincard">
          <div className="image">
            <img src={logo} width={200} height={100} alt="" />
          </div>
          <Form className="form" onFinish={onLoginSubmit}>
            <Form.Item className="item" label="Email" name="email">
              <Input />
            </Form.Item>
            <Form.Item className="item" label="Password" name="password">
              <Input />
            </Form.Item>
            <Button loading={loading} htmlType="submit" className="button">
              Log In
            </Button>
            <div className="line"></div>
            <div className="forgot">Forgot your password?</div>
          </Form>
        </div>
      </div>
    </div>
  );
}
