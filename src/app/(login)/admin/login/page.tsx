import Form from 'next/form';
import * as Session from 'server/session';

export default function LoginForm() {
  return (
    <Form
      action={Session.login}
      className="absolute inset-0 grid content-center justify-center gap-2"
    >
      <input
        className="px-3 py-2 border border-medium rounded"
        name="email"
        type="text"
        placeholder="email"
      />
      <input
        className="px-3 py-2 border border-medium rounded"
        name="password"
        type="password"
        placeholder="password"
      />
      <input className="bg-accent rounded-lg py-2" type="submit" value="go" />
    </Form>
  );
}
