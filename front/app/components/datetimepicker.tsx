import { useEffect } from "react";

declare global {
  interface JQuery {
    datetimepicker(options: { timepicker: boolean; format: string }): void;
  }
}

type DatetimepickerProps = {
  label: string;
  name: string;
  format?: string;
};

export default function Datetimepicker(props: DatetimepickerProps) {
  const { label, name, format = "m/d/Y" } = props;

  useEffect(() => {
    $(`#${name}`).datetimepicker({
      timepicker: false,
      format: format,
    });
  }, []);

  return (
    <>
      <label htmlFor={name}>{label}</label>

      <input id={name} type="text" name={name} />
    </>
  );
}
