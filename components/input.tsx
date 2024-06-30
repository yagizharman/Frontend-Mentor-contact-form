interface InputProps {
  label: string;
}

const InputEx = ({ label }: InputProps) => {
  return (
    <div className="flex flex-col w-full">
      <label className="text-xs font-semibold  text-texts-color mb-2">
        {label} <span className="text-background-prim-900">*</span>
      </label>
      <input required className="border-2 pl-2 rounded-md h-10 " />
    </div>
  );
};

export default InputEx;
