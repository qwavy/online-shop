import * as Select from "@radix-ui/react-select";
import { useEffect,useState } from "react";
import {sortProducts} from '../api/Api'

export const BaseSelect = ({ values, sortByCategoryButton, setProducts }) => {

    const [sortValue,setSortValue] = useState("")

    useEffect(() => {
        sortProducts(sortValue,sortByCategoryButton).then((response) => setProducts(response))
    },[sortValue])

  return (
    <Select.Root value={sortValue} onValueChange={setSortValue}>
      <Select.Trigger className="inline-flex items-center justify-between rounded px-[15px] text-[13px] leading-none h-[35px] gap-[5px] bg-white text-violet11 shadow-[0_2px_10px] shadow-black/10 hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-violet9 outline-none min-w-[100px]">
        <Select.Value placeholder="Select a category">{sortValue}</Select.Value>
        <Select.Icon className="text-indigo-600" />
      </Select.Trigger>

      <Select.Portal>
        <Select.Content className="overflow-hidden bg-white rounded-md shadow-basic" >
          <Select.Viewport>
            {values.map((value) => (
              <Select.Item key={value} value={value} className="text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1">
                <Select.ItemText>{value}</Select.ItemText>
              </Select.Item>
            ))}

          </Select.Viewport>
          <Select.Arrow />
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};
