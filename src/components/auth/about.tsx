import React, { useEffect } from "react";
import { Avatar, Card } from "antd";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getAboutPage, UserProfile } from "../../redux/reducer";

const { Meta } = Card;

const About = () => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.store.userProfile);
  const user: UserProfile = userData;
  const token = localStorage.getItem("token");

  useEffect(() => {
    dispatch(getAboutPage());
  }, [token]);

  return (
    <>
      <Card style={{ width: 500, margin: "auto", marginBottom: 0 }}>
        <Meta
          avatar={<Avatar src={user.avatar} size={100} />}
          title={user.username}
          description={user.about}
        />
      </Card>
      <Link to={"/register"} style={{ margin: "auto", marginTop: 0 }}>
        Register new account
      </Link>
    </>
  );
};

export default About;
