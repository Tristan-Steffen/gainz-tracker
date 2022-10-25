import * as api from "lib/client-api";
import { CreateUserSchema } from "lib/validators";
import Router from "next/router";
import { FormEvent, useEffect, useState } from "react";
import { typeToFlattenedError } from "zod";
import Form from "./Form";
import FormErrors from "./FormErrors";
import InputText from "./InputText";

export default function AuthenticationForm({ actionProp }: { actionProp: string; }) {

  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [state, setState] = useState<"error" | "idle" | "loading" | "success">("idle");

  const [fieldErrors, setFieldErrors] = useState<typeToFlattenedError<CreateUserSchema>["fieldErrors"]>();
  const [createErrors, setCreateErrors] = useState<string | string[]>();

  useEffect(() => {

    if (!username && !password) return;

    const _errors = CreateUserSchema.safeParse({ username, password });

    if (_errors.success === false) {
      const err = _errors.error.flatten().fieldErrors;
      setFieldErrors(err)
    } else {
      setFieldErrors(undefined)
    }


  }, [username, password])


  async function handleSubmit(ev: FormEvent<HTMLFormElement>) {

    if (state === "loading") return;
    setState("loading");

    ev.preventDefault();

    const res = CreateUserSchema.parse({ username, password });

    const response = await api.send(actionProp, { body: res });

    if (response.ok) {
      setState("success")
    } else {
      setState("error")
      setCreateErrors(response.errors)
      console.log(response);
    }

  }

  if (state === "loading") {
    return <div>Loading</div>
  }

  if (state === "error") {
    return <div>
      <p>{createErrors}</p>
      <button onClick={() => {
        setState("idle")
        setCreateErrors(undefined)
      }}>back</button>
    </div>
  }

  if (state === "success") {

    Router.prefetch("/home");

    setTimeout(() => {
      Router.push("/home")
    }, 1000)

    return <div>
      <h3>Success!</h3>
    </div>
  }

  return (
    <Form action={actionProp} onSubmit={handleSubmit}>
      <InputText type="username" name="username" onChange={setUsername} />
      <FormErrors errors={fieldErrors?.username} />
      <br />
      <InputText type="password" name="password" onChange={setPassword} />
      <FormErrors errors={fieldErrors?.password} />
      <br />
      {state === "idle" &&
        <button type="submit" disabled={!!fieldErrors}>Submit</button>
      }
    </Form>
  );
};
