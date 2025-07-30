interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  type: React.HTMLInputTypeAttribute;
  label: string;
  id: string;
  defaultValue?: string;
  name?: string;
  required?: boolean;
  ref?: React.Ref<HTMLInputElement> | undefined;
}

const FormRow: React.FC<Props> = ({
  type,
  label,
  id,
  name,
  ref,
  defaultValue = '',
  required,

  ...props
}) => {
  return (
    <div className='form-row'>
      <label htmlFor={id} className='form-label'>
        {label}
      </label>
      <input
        {...props}
        ref={ref}
        type={type}
        className='form-input'
        id={id}
        name={name}
        required={required}
        defaultValue={defaultValue}
      />
    </div>
  );
};

export default FormRow;
