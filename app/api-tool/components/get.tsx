"use client";
import { useState } from "react";

type QueryKeyValues = {
  id: number;
  key: string | number;
  value: string | number;
};

type Props = {
  onChange: (key: string | number, value: string | number) => void;
  onClick: () => void;
};

export const GetView = ({ onChange, onClick }: Props) => {
  const [queryKeyValues, setQueryKeyValues] = useState<QueryKeyValues[]>([
    { id: 0, key: "limit", value: 10 },
  ]);

  const buildQueryKeyValueInputs = () => {
    return queryKeyValues.map((qKV, index) => {
      console.log("qKV", qKV);
      return (
        <div key={`grp${index}`} className="flex">
          <input
            key={`key${qKV.id}`}
            placeholder="Add Query"
            className="bg-white text-black w-full mt-1 mr-1"
            type="string"
            value={qKV.key}
            onChange={(e) => {
              onChange("key", e.target.value);
            }}
          />
          <input
            key={`value${qKV.id}`}
            placeholder="Add Query value"
            className="bg-white text-black w-full mt-1"
            type="string"
            value={qKV.value}
            onChange={(e) => {
              onChange("value", e.target.value);
            }}
          />
          <button
            key={`btn${qKV.id}`}
            className="bg-blue-500 text-black w-24 mt-1"
            onClick={() => {
              console.log("TEST");
              onClick();
            }}
          >
            Add
          </button>
        </div>
      );
    });
  };

  return <>{buildQueryKeyValueInputs()}</>;
};
