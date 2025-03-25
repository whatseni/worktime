
interface Option {
  key: string;
  value: string;
}

interface SelectProps {
  options: Option[];
  placeholder?: string;
  onChange: any;
  className?: string;
  defaultValue?: string;
  selectedValue: any;
}

export default function Select({
  options,
  placeholder,
  onChange,
  className = "",
  defaultValue = "",
  selectedValue
}: SelectProps) {

  return (
    <select
    className={`h-11 w-full appearance-none rounded-lg border border-gray-300  px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 ${
      selectedValue
        ? "text-gray-800 dark:text-white/90"
        : "text-gray-400 dark:text-gray-400"
    } ${className}`}
    value={selectedValue}
    onChange={onChange}
    >
      <option
        value=""
        disabled
        className="text-gray-700"
      >
        {placeholder}
      </option>
      {
        options.map((option) => (
          <option key={option.key} value={option.key} className="text-gray-700">
            {option.value}
          </option>
        ))
      }
    </select>
  )
}