"use client";

type Props = {
  onChange: (key: string | number, value: string | number) => void;
  getQueryKey: string | number;
  getQueryValue: string | number;
};

export const GetView = ({ onChange, getQueryKey, getQueryValue }: Props) => {
  return (
    <>
      <input
        placeholder="Add Query"
        className="bg-white text-black w-full mt-1"
        value={getQueryKey}
        type="string"
        onChange={(e) => {
          onChange("key", e.target.value);
        }}
      />
      <input
        placeholder="Add Query value"
        className="bg-white text-black w-full mt-1"
        value={getQueryValue}
        type="string"
        onChange={(e) => {
          onChange("value", e.target.value);
        }}
      />
    </>
  );
};
