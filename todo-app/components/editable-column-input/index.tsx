import clsx from 'clsx';
import { Check, Loader2, PencilLine } from 'lucide-react';
import { useState } from 'react';
import { useMutation } from 'react-query';

import { Input } from '../ui/input';

type EditableColumnInputProps = {
  data: Todo,
  dataKey: keyof Todo;
  label: string;
}

const EditableColumnInput = ({ data, dataKey, label }: EditableColumnInputProps) => {
  const [currentValue, setCurrentValue] = useState(data[dataKey]);
  const [showSuccessIcon, setShowSuccessIcon] = useState(false);
  const [showInput, setShowInput] = useState(false);

  const { mutate, isLoading } = useMutation({
    mutationFn: (payload: any) => fetch('api/todo', { method: 'PATCH', body: JSON.stringify(payload) }),
    onSuccess: async (res: any) => {
      setShowSuccessIcon(true);
      setTimeout(() => {
        setShowSuccessIcon(false);
      }, 1500);
    },
  });

  const handleOnValueChange = (val: string) => {
    if (!val || (val === currentValue)) {
      setShowInput(false);
      return;
    }

    mutate({
      ...data,
      [dataKey]: val
    }, {
      onSuccess: () => {
        setCurrentValue(val);
        setShowInput(false);
      }
    })
  }

  return (
    <div className="flex gap-3 items-center">
      {showInput ? (
        <Input
          placeholder="Input task name..."
          defaultValue={currentValue as string}
          onBlur={(e) => handleOnValueChange(e.target.value)}
        />
      ) : (
        <div className="font-semibold">🔖 {currentValue as string}</div>
      )}
      <div className="transition ease-in-out hover:scale-110 cursor-pointer flex items-center gap-1 group">
        {isLoading ?
          <Loader2 className="h-4 w-4 animate-spin" />
          :
          (
            showSuccessIcon ?
              <Check className={clsx('h-4 w-4 text-green-500 transition-transform duration-500 ease-in-out', showSuccessIcon && "scale-120")} />
              :
              (!showInput && (
                <button type="button" className="flex gap-1" onClick={() => setShowInput(true)}>
                  <PencilLine className="h-4 w-4 transition-transform duration-500 ease-in-out" />
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out text-xs underline">Change {label}</span>
                </button>
              ))
          )
        }
      </div>
    </div>
  )
}

export default EditableColumnInput