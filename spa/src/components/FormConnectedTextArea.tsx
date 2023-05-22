import { FieldProps } from 'formik'

export type FormConnectedTextFieldProps = FieldProps & {
    label: string
}
const FormConnectedTextField = ({ field, form, meta, label, ...props }: FormConnectedTextFieldProps) => {
    const hasValidationErrors = form.touched[field.name] && form.errors[field.name]
    return (
        <div className="mb-3">
            <label htmlFor={field.name} className="form-label">
                {label}
            </label>
            <textarea
                className={`form-control ${hasValidationErrors ? 'is-invalid' : ''}`}
                id={field.name}
                {...field}
                {...props}
            ></textarea>
            {hasValidationErrors && <div className="invalid-feedback">{form.errors[field.name]}</div>}
        </div>
    )
}

export default FormConnectedTextField
