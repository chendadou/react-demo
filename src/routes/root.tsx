import React from 'react';
import {
  Outlet,
  NavLink,
  useNavigation,
  Form,
} from 'react-router-dom';

const Root: React.FC = () => {
  const navigation = useNavigation();

  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <Form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
            />
            <div
              id="search-spinner"
              aria-hidden
              hidden={true}
            />
            <div
              className="sr-only"
              aria-live="polite"
            ></div>
          </Form>
          <form method="post">
            <button type="submit">New</button>
          </form>
        </div>
        <nav>
          <ul>
            <li>
              <NavLink
                to={`/contacts/1`}
                className={({ isActive, isPending }) =>
                  isActive ? "active" :
                    isPending ? "pending" : ""
                }
              >
                Your Name
              </NavLink>
            </li>

            <li>
              <NavLink
                to={`/contacts/2`}
                className={({ isActive, isPending }) =>
                  isActive ? "active" :
                    isPending ? "pending" : ""
                }
              >
                Your Friend
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <div
        id="detail"
        className={navigation.state === "loading" ? "loading" : ""}
      >
        <Outlet />
      </div>
    </>
  );
};

export default Root;
