'use client';

import { Check, ChevronsUpDown, XCircle } from 'lucide-react';
import { useState } from 'react';

import { cn } from '../../lib/utils'

import { Button } from './button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './command';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './popover';

type ComboboxProps = {
  value: string
  placeholder?: string
  onChange: (newValue: string) => void;
  options: { value: string; label: string }[];
}

export const Combobox = ({ value, onChange, options, placeholder }: ComboboxProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className="flex gap-2 items-center">
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="lg:w-[200px] justify-between"
          >
            {value
              ? options.find((framework) => framework.value === value)?.label
              : placeholder
            }
            <ChevronsUpDown className="transition ease-in-out hover:scale-110 ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        {value && (
          <XCircle className="transition ease-in-out hover:scale-110 h-4 w-4 shrink-0 cursor-pointer" onClick={() => onChange('')} />
        )}
      </div>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandList>
            <CommandEmpty>No status found.</CommandEmpty>
            <CommandGroup>
              {options.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    onChange(currentValue === value ? '' : currentValue)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
