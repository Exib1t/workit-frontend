import useThemeClass from "../../../../hooks/useThemeClass.ts";
import Select from "../../../control/Select/Select.tsx";
import { ISelectItem } from "../../../../models/Select/Select.types.ts";
import { useState } from "react";

const ComponentsPageSelect = () => {
  const themeClass = useThemeClass("b-componentsPage");
  const [selected, setSelected] = useState<ISelectItem>({
    id: 1,
    title: "Item 1",
  });
  const handleChange = (item: ISelectItem) => {
    setSelected(item);
  };

  return (
    <>
      <h3 className={`${themeClass}__title`}>Select</h3>
      <div className={`${themeClass}__row`}>
        <Select
          placeholder={"Select"}
          type={"on-bgd"}
          items={[
            { id: 1, title: "Item 1" },
            { id: 2, title: "Item 2" },
            { id: 3, title: "Item 3" },
            { id: 4, title: "Item 4" },
          ]}
          onChange={() => {}}
        />
        <Select
          placeholder={"Select"}
          type={"on-srf"}
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
        <Select
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
        <Select
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
export default ComponentsPageSelect;
