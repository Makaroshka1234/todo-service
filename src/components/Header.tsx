import React, { memo } from "react";
import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { Button } from "@mui/material";
import { removeUser } from "../store/slices/userSlice";

const Header = () => {
  const { isAuth } = useAuth();
  const { email } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  return (
    <header className="flex items-center bg-customOrange mb-5">
      <div className="flex justify-around items-center w-full header__inner">
        <p className="logo-text">Todo service</p>
        <nav className="flex gap-2 py-3 nav--list">
          <Link to={"/"}>
            <li className="list-item">Home</li>
          </Link>

          {isAuth ? (
            <>
              <Link to={"/lists"}>
                <li className="list-item">My lists</li>
              </Link>
              <li>{email}</li>
              <li>
                <Button
                  variant="outlined"
                  sx={{
                    color: "black",
                  }}
                  onClick={() => dispatch(removeUser())}
                >
                  Logout
                </Button>
              </li>
            </>
          ) : (
            <>
              <Link to={"/register"}>
                <li className="list-item">reg</li>
              </Link>
              <Link to={"/login"}>
                <li className="list-item">LOG</li>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default memo(Header);
