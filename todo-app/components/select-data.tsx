import { ControllerRenderProps } from 'react-hook-form';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from './ui/select';
import { FormControl } from './ui/form';

type ItemType = {
  value: string;
  label: string;
}

type SelectDataProps = {
  placeholder?: string;
  options: ItemType[];
} & ControllerRenderProps;

const SelectData = (props: SelectDataProps) => {
  const { options, placeholder, ...field } = props || {};

  return (
    <Select onValueChange={field.onChange} defaultValue={field.value}>
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {options.map(({ label, value }) => (
          <SelectItem key={value} value={value}>{label}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default SelectData