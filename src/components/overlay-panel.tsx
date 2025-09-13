import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { useState } from "react";
export default function SelectRows() {
  const [value, setValue] = useState<number>(0);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <InputNumber
        value={value}
        onValueChange={(e) => {
          setValue(e.value);
        }}
        placeholder="select rows"
      />
      <Button label="submit"/>
    </div>
  );
}
