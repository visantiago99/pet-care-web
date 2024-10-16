interface FormInputProps {
  value: string;
  name: string;
  labelValue: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormInputField = ({
  value,
  name,
  labelValue,
  onChange,
}: FormInputProps) => {
  return (
    <>
      <label htmlFor={name}>{labelValue}</label>
      <input
        type="text"
        onChange={onChange}
        value={value}
        name={name}
        id={name}
      />
    </>
  );
};

export default FormInputField;
