/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react';
import {
  Outlet,
  NavLink,
  useNavigation,
  Form,
  useLoaderData,
  redirect,
  useSubmit,
} from 'react-router-dom';

const {
  getContacts,
  createContact,
} = require('@routes/contacts.js');

export async function loader({ request }: any) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const contacts = await getContacts(q);
  return { contacts, q };
}

export async function action() {
  const contact = await createContact();
  return redirect(`/contacts/${contact.id}/edit`);
}

interface ContactItem {
  id: string;
  first: string;
  last: string;
  favorite: string;
}

const Root: React.FC = () => {
  const { contacts, q }: any = useLoaderData();
  const navigation = useNavigation();
  const submit = useSubmit();

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
              defaultValue={q}
              onChange={(event) => {
                submit(event.currentTarget.form);
              }}
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
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((contact: ContactItem) => (
                <li key={contact.id}>
                  <NavLink
                    to={`contacts/${contact.id}`}
                    className={({ isActive, isPending }) =>
                      isActive ? "active"
                        : isPending ? "pending"
                          : ""
                    }
                  >
                    {
                      contact.first || contact.last ?
                        (
                          <>
                            {contact.first} {contact.last}
                          </>
                        ) :
                        (
                          <i>No Name</i>
                        )
                    }{" "}
                    {contact.favorite && <span>★</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
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
