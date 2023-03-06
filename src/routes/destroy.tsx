import { redirect } from "react-router-dom";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const {deleteContact} = require('@routes/contacts.js');

export async function action({ params }: any) {
  // throw new Error("oh dang!");
  await deleteContact(params.contactId);
  return redirect("/");
}