import { memo } from 'react';
type Props = {
  label: string;
  id: string;
  defaultValue?: string;
  name?: string;
  required?: boolean;
  optionList: string[];
};

const FormSelect: React.FC<Props> = memo(
  ({ optionList, label, id, name, defaultValue = '', required }) => {
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
          defaultValue={defaultValue}
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
