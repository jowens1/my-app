"use client";

import { useState } from "react";

import { GetView } from "./components/get";
import { ResponseView } from "./components/response";

import { useGetContext } from "./context/GetContext";

interface GetQuery {
  query: string | number;
  value: string | number;
}

export const APITool = () => {
  const { queryKeyValues } = useGetContext();

  const [inputAPI, setInputApi] = useState("");
  const [apiMethod, setAPIMethod] = useState("");
  const [callResponse, setCallResponse] = useState({});

  const [fullAPI, setFullAPI] = useState("");

  const apiCall = async () => {
    if (apiMethod === "GET") {
      try {
        const response = await fetch(fullAPI);
        const data = await response.json();
        setCallResponse(data);
      } catch (error) {}
    }
  };

  const buildURL = () => {
    let tempURL = "";
    if (inputAPI.length > 0) {
      tempURL = inputAPI;
      if (queryKeyValues.length > 0) {
        queryKeyValues.map((qkv, i) => {
          tempURL =
            i === 0
              ? `${tempURL}?${qkv.query}=${qkv.value}`
              : `${tempURL}&${qkv.query}=${qkv.value}`;
        });
      }
    }

    setFullAPI(tempURL);
  };

  return (
    <>
      <div>
        <div className="flex-row">
          <p>{fullAPI}</p>
        </div>
        <div className="flex justify-start">
          <input
            placeholder="Enter API"
            className="bg-white text-black mr-1 w-full"
            value={inputAPI}
            type="string"
            onChange={(e) => {
              setInputApi(e.target.value);
            }}
          />
          <button
            className="bg-blue-500 text-black w-24"
            onClick={() => {
              buildURL();
            }}
          >
            Add
          </button>
        </div>
        <div>
          <button
            className="bg-blue-500 w-24 text-black mt-1 mr-1"
            onClick={() => {
              setAPIMethod("GET");
            }}
          >
            GET
          </button>
          {/* <button className="bg-white text-black mt-1 mr-1" onClick={() => {
                        setAPIMethod('POST')
                    }}>POST</button>
                    <button className="bg-white text-black mt-1 mr-1" onClick={() => {
                        setAPIMethod('PUT')
                    }}>PUT</button>
                    <button className="bg-white text-black mt-1 mr-1" onClick={() => {
                        setAPIMethod('DELETE')
                    }}>DELETE</button> */}
        </div>
        <div>{apiMethod === "GET" && <GetView />}</div>
        <div>
          <button className="bg-blue-500 w-24 mt-1" onClick={() => apiCall()}>
            Call
          </button>
        </div>
        <div>
          <ResponseView response={callResponse} />
        </div>
      </div>
    </>
  );
};
