import { memo } from 'react';
interface Props extends React.InputHTMLAttributes<HTMLSelectElement> {
  label: string;
  id: string;
  name?: string;
  required?: boolean;
  optionList: string[];
}

const FormSelect: React.FC<Props> = memo(
  ({ optionList, label, id, name, required, ...props }) => {
    return (
      <div className='form-row'>
        <label htmlFor={id} className='form-label'>
          {label}
        </label>
        <select
          className='form-input'
          id={id}
          name={name}
          required={required}
          value={props.value}
          {...props}
        >
          {optionList.map((list, idx) => {
            return <option key={list + idx}>{list}</option>;
          })}
        </select>
      </div>
    );
  }
);

export default FormSelect;
