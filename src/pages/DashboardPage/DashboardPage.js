import React, { useState, useEffect, Fragment } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import Media from "react-media";

import Header from "../../components/Header";
import Navigation from "../../components/Navigation";
import Balance from "../../components/Balance";
import Currency from "../../components/Currency/Currency";

import { getCurrentUser } from "../../redux/auth/auth-operations";

import "./Dashboard.scss";

const DashboardPage = () => {
  const location = useLocation();
  const path = location.pathname;
  const [display, setDisplay] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    setDisplay(path === "/home" ? true : false);
  }, [path]);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <>
      <Header />
      <div className="Dashboard__bg">
        <main className="Dashboard__wrap">
          <aside className="Dashboard__aside">
            <section className="Dashboard__nav">
              <Navigation />
              <Media
                queries={{
                  mobile: { maxWidth: 767 },
                  other: { minWidth: 768 },
                }}
              >
                {(matches) => {
                  return (
                    <Fragment>
                      {matches.mobile && display && <Balance />}
                      {matches.other && <Balance />}
                    </Fragment>
                  );
                }}
              </Media>
            </section>
            <section className="Dashboard__currency">
              <Currency />
            </section>
          </aside>
          <article className="Dashboard__main">
            <Outlet />
          </article>
        </main>
      </div>
    </>
  );
};

export default DashboardPage;
