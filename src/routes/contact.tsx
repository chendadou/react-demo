/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react';
import { Form, useLoaderData } from "react-router-dom";

const {
  getContact,
} = require('@routes/contacts.js');

export async function loader({ params }: any) {
  const contact = await getContact(params.contactId);
  return { contact };
}

interface Contact {
  first: string;
  last: string;
  avatar: string;
  twitter: string;
  notes: string;
  favorite: boolean;
}

const Favorite: React.FC<{ contact: Contact }> = (props) => {
  const favorite = props.contact.favorite;

  return (
    <Form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={
          favorite
            ? "Remove from favorites"
            : "Add to favorites"
        }
      >
        {favorite ? "★" : "☆"}
      </button>
    </Form>
  );
};

const Contact: React.FC = () => {
  // const contact = {
  //   first: "Your",
  //   last: "Name",
  //   avatar: "https://placekitten.com/g/200/200",
  //   twitter: "your_handle",
  //   notes: "Some notes",
  //   favorite: true,
  // };

  const { contact }: any = useLoaderData();

  return (
    <div id="contact">
      <div>
        <img
          key={contact.avatar}
          src={contact?.avatar}
        />
      </div>

      <div>
        <h1>
          {contact.first || contact.last ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
          <Favorite contact={contact} />
        </h1>

        {contact.twitter && (
          <p>
            <a
              rel='noreferrer'
              target='_blank'
              href={`https://twitter.com/${contact.twitter}`}
            >
              {contact.twitter}
            </a>
          </p>
        )}

        {contact.notes && <p>{contact.notes}</p>}

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (
                !confirm(
                  "Please confirm you want to delete this record."
                )
              ) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
