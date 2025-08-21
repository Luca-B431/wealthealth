import * as React from "react";

declare global {
  interface JQuery {
    selectmenu(): JQuery;
  }
}

type SelectProps = {
  label: string;
  name: string;
  children: React.ReactNode;
};

export default function Select(props: SelectProps) {
  const { label, name, children } = props;

  React.useEffect(() => {
    $(`#${name}`).selectmenu();
  }, []);

  return (
    <>
      <label htmlFor={name}>{label}</label>
      <select id={name} name={name}>
        {children}
      </select>
    </>
  );
}
