import formWrapper from "./FormErrors.module.css";

function FormError(props: { errors?: string[] }) {

  if (!props.errors?.length) return <></>;

  return <div className={formWrapper["form-error-wrapper"]}>
    {props.errors.map(e => {
      return <p key={e}>{e}</p>
    })}
  </div>
}

export default FormError
