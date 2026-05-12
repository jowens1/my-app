"use client";
import { useState } from "react";

type QueryKeyValues = {
  id: number | undefined;
  key: string | number | undefined;
  value: string | number | undefined;
};

export const GetView = () => {
  const [queryKeyValues, setQueryKeyValues] = useState<QueryKeyValues[]>([
    { id: 0, key: "", value: "" },
  ]);

  const buildQueryKeyValueInputs = () => {
    return queryKeyValues.map((qKV, index) => {
      return (
        <div key={`grp${index}`} className="flex">
          <input
            key={`key${qKV.id}`}
            placeholder="Add Query"
            className="bg-white text-black w-full mt-1 mr-1"
            type="string"
            value={qKV.key}
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
              console.log("Remove");
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
        if (key === "key") return { ...queryKeyValue, key: value };

        if (key === "value") return { ...queryKeyValue, value: value };
      }
      return queryKeyValue;
    });
    setQueryKeyValues(newQueryKeyValues);
  };

  const addQueryKeyValue = () => {
    setQueryKeyValues([
      ...queryKeyValues,
      { id: queryKeyValues.length - 1, key: "", value: "" },
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
          console.log("Add");
          addQueryKeyValue();
        }}
      >
        Add
      </button>
      {buildQueryKeyValueInputs()}
    </>
  );
};
