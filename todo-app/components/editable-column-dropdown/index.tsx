import clsx from 'clsx';
import { ArrowDownCircle, Check, Loader2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useMutation } from 'react-query';

import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';

type EditableColumnDropdownProps = {
  data: Todo,
  dataKey: keyof Todo;
  label: string;
  options: { value: string; label: string }[];
}

const EditableColumnDropdown = ({ data, dataKey, label, options }: EditableColumnDropdownProps) => {
  const [currentValue, setCurrentValue] = useState(data[dataKey]);
  const [showSuccessIcon, setShowSuccessIcon] = useState(false);

  const { mutate, isLoading } = useMutation({
    mutationFn: (payload: any) => fetch('api/todo', { method: 'PATCH', body: JSON.stringify(payload) }),
    onSuccess: async (res: any) => {
      setShowSuccessIcon(true);
      setTimeout(() => {
        setShowSuccessIcon(false);
      }, 1500);
    },
  });

  const currentValueLabel = useMemo(() => {
    return options.find(({ value }) => currentValue === value)?.label;
  }, [currentValue, options]);

  const handleOnValueChange = (val: string) => {
    if (!val || (val === currentValue)) {
      return;
    }

    mutate({
      ...data,
      [dataKey]: val
    }, {
      onSuccess: () => setCurrentValue(val)
    })
  }

  return (
    <div className="flex gap-3 items-center">
      <div className="font-semibold">{currentValueLabel}</div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="transition ease-in-out hover:scale-110 cursor-pointer flex items-center gap-1 group">
            {isLoading ?
              <Loader2 className="h-4 w-4 animate-spin" />
              :
              (
                showSuccessIcon ?
                  <Check className={clsx('h-4 w-4 text-green-500 transition-transform duration-500 ease-in-out', showSuccessIcon && "scale-120")} />
                  :
                  <ArrowDownCircle className="h-4 w-4 transition-transform duration-500 ease-in-out" />
              )
            }
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out text-xs underline">Change {label}</span>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>{label}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={currentValue as string} onValueChange={handleOnValueChange}>
            {options.map((opt) => (
              <DropdownMenuRadioItem key={opt.value} value={opt.value} className="cursor-pointer">
                {opt.label}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default EditableColumnDropdown;
