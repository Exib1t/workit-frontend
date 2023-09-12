import useThemeClass from "../../../../hooks/useThemeClass.ts";
import { ISelectItem } from "../../../../models/Select/Select.types.ts";
import { useState } from "react";
import MultiSelect from "../../../control/MultiSelect/MultiSelect.tsx";

const ComponentsPageMultiSelect = () => {
  const themeClass = useThemeClass("b-componentsPage");
  const [selected, setSelected] = useState<ISelectItem[]>([
    {
      id: 1,
      title: "Item 1",
    },
  ]);
  const handleChange = (items: ISelectItem[]) => {
    setSelected(items);
  };

  return (
    <>
      <h3 className={`${themeClass}__title`}>Multi Select</h3>
      <div className={`${themeClass}__row`}>
        <MultiSelect
          placeholder={"Select"}
          type={"on-bgd"}
          selected={[]}
          items={[
            { id: 1, title: "Item 1" },
            { id: 2, title: "Item 2" },
            { id: 3, title: "Item 3" },
            { id: 4, title: "Item 4" },
          ]}
          onChange={() => {}}
        />
        <MultiSelect
          placeholder={"Select"}
          type={"on-srf"}
          selected={[]}
          items={[
            { id: 1, title: "Item 1" },
            { id: 2, title: "Item 2" },
            { id: 3, title: "Item 3" },
            { id: 4, title: "Item 4" },
          ]}
          onChange={() => {}}
        />
      </div>
      <div className={`${themeClass}__row`}>
        <MultiSelect
          placeholder={"Select"}
          type={"on-bgd"}
          items={[
            { id: 1, title: "Item 1" },
            { id: 2, title: "Item 2" },
            { id: 3, title: "Item 3" },
            { id: 4, title: "Item 4" },
          ]}
          selected={selected}
          onChange={handleChange}
        />
        <MultiSelect
          placeholder={"Select"}
          type={"on-srf"}
          items={[
            { id: 1, title: "Item 1" },
            { id: 2, title: "Item 2" },
            { id: 3, title: "Item 3" },
            { id: 4, title: "Item 4" },
          ]}
          selected={selected}
          onChange={handleChange}
        />
      </div>
    </>
  );
};
export default ComponentsPageMultiSelect;
