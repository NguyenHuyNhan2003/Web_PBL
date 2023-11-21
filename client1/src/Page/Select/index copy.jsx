import React from 'react';
import { Select, SelectItem, SelectSection } from '@nextui-org/react';
import { animals } from './data';

export default function Option({  setselectLuong }) {
  const handleSelectChange = (selectedValue) => {
    // Use setselecItem to update the state with the selected value
    setselectLuong(selectedValue.target.value);
  };
  return (
    <Select
      label='Lương'
      placeholder=''
      className='max-w-xs'
      onChange={handleSelectChange} // Attach the onChange handler
    >
      <SelectSection showDivider title='Tất cả lương'>
        <SelectItem key='all'>Tất cả các lương</SelectItem>
        <SelectItem key='10-15'>10-15 triệu</SelectItem>
        <SelectItem key='15-25'>15-20 triệu</SelectItem>
        <SelectItem key='thỏa thuận'>Thỏa Thuận</SelectItem>
      </SelectSection>
    </Select>
  );
}
