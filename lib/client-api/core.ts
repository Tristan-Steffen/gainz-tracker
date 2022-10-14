type SendOptions = Omit<RequestInit, "body"> & { body: unknown }

type SendReturnError = {
  errors?: string,
  status: number,
  ok: false
}

type SendReturnSuccess<T> = {
  data: T
  ok: true
}

type SendReturn<T> = SendReturnError | SendReturnSuccess<T>;

export async function send<T>(url: string, { method = "GET", body }: SendOptions): Promise<SendReturn<T>> {

  const options = { method } as Omit<RequestInit, "headers"> & { headers: Headers };

  if (body) {
    if (!method || method === "GET") {
      options["method"] = "POST";

      if (!options["headers"]) {
        options["headers"] = new Headers()
      }

      options.headers.append("Content-Type", "application/json")

    }

    options["body"] = JSON.stringify(body);
  }

  console.log("FETCH", { url, options })

  const response = await fetch(url, options);

  if (!response.ok) {

    try {
      const err = await response.json();
      return {
        ok: false,
        status: response.status,
        errors: err.error
      }
    } catch (err) {
      return {
        ok: false,
        status: response.status
      }
    }

  }

  try {

    const json = await response.json();

    return {
      ok: true,
      data: json
    }
  } catch (err) {
    return {
      ok: false,
      status: 400,
      errors: "Failed to parse body"
    }
  }
}
