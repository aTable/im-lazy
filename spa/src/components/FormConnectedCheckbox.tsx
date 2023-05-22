import { FieldProps } from 'formik'

export type FormConnectedCheckboxProps = FieldProps & {
    label: string
}
const FormConnectedCheckbox = ({ field, form, meta, label, ...props }: FormConnectedCheckboxProps) => {
    const hasValidationErrors = form.touched[field.name] && form.errors[field.name]
    return (
        <div className="col-12">
            <div className="form-check">
                <input
                    className={`form-check-input ${hasValidationErrors ? 'is-invalid' : ''}`}
                    type="checkbox"
                    id={field.name}
                    {...field}
                    {...props}
                />
                <label className="form-check-label" htmlFor={field.name}>
                    {label}
                </label>
                {hasValidationErrors && <div className="invalid-feedback">{form.errors[field.name]}</div>}
            </div>
        </div>
    )
}

export default FormConnectedCheckbox
