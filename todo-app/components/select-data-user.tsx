import { customFetch } from '@/lib/utils';
import { ControllerRenderProps } from 'react-hook-form';
import { useQuery } from 'react-query';

import SelectData from './select-data';

const SelectDataUser = (props: ControllerRenderProps) => {
  const { data, isLoading } = useQuery('user', customFetch('user', { method: 'GET' }));

  const options = (data?.records || []).map((item: { id: string; name: string }) => ({
    value: item.id,
    label: item.name,
  }));

  return (
    <SelectData
      id="assing"
      disabled={isLoading}
      placeholder={isLoading ? 'Loading...' : "Select user"}
      options={options}
      {...props}
    />
  )
}

export default SelectDataUser