"use client";

import { useGetContext } from "../context/GetContext";

export const GetView = () => {
  const { queryKeyValues, setQueryKeyValues } = useGetContext();

  const buildQueryKeyValueInputs = () => {
    return queryKeyValues.map((qKV, index) => {
      return (
        <div key={`grp${index}`} className="flex">
          <input
            key={`key${qKV.id}`}
            placeholder="Add Query"
            className="bg-white text-black w-full mt-1 mr-1"
            type="string"
            value={qKV.query}
            onChange={(e) => {
              handleOnChange("key", e.target.value, index);
            }}
          />
          <input
            key={`value${qKV.id}`}
            placeholder="Add Query value"
            className="bg-white text-black w-full mt-1"
            type="string"
            value={qKV.value}
            onChange={(e) => {
              handleOnChange("value", e.target.value, index);
            }}
          />
          <button
            key={`btn${qKV.id}`}
            className="bg-blue-500 text-black w-24 mt-1"
            onClick={() => {
              removeQueryKeyValue(index);
            }}
          >
            Remove
          </button>
        </div>
      );
    });
  };

  const handleOnChange = (
    key: string | number,
    value: string | number,
    index: number,
  ) => {
    const newQueryKeyValues = queryKeyValues.map((queryKeyValue, ind) => {
      if (ind === index) {
        if (key === "key") return { ...queryKeyValue, query: value };

        if (key === "value") return { ...queryKeyValue, value: value };
      }
      return queryKeyValue;
    });
    setQueryKeyValues(newQueryKeyValues);
  };

  const addQueryKeyValue = () => {
    setQueryKeyValues([
      ...queryKeyValues,
      { id: queryKeyValues.length - 1, query: "", value: "" },
    ]);
  };

  const removeQueryKeyValue = (index: number) => {
    setQueryKeyValues(
      queryKeyValues.filter((queryKeyValue, ind) => ind != index),
    );
  };

  return (
    <>
      <button
        className="bg-blue-500 text-black w-24 mt-1"
        onClick={() => {
          addQueryKeyValue();
        }}
      >
        Add
      </button>
      {buildQueryKeyValueInputs()}
    </>
  );
};
