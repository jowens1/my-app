"use client";

import { useState, useEffect, useRef } from "react";

import { GetView } from "./components/get";
import { ResponseView } from "./components/response";

interface GetQuery {
  query: string | number;
  value: string | number;
}

export const APITool = () => {
  const [inputAPI, setInputApi] = useState("");
  const [apiMethod, setAPIMethod] = useState("");
  const [callResponse, setCallResponse] = useState({});

  const [getQueryKey, setGetQueryKey] = useState<string | number>("");
  const [getQueryValue, setGetQueryValue] = useState<string | number>("");
  const [getQueryKeyValue, setGetQueryKeyValue] = useState<GetQuery[]>([]);

  const [fullAPI, setFullAPI] = useState("");

  useEffect(() => {
    console.log("inputAPI", inputAPI);
  }, [inputAPI]);

  useEffect(() => {
    console.log("apiMethod", apiMethod);
  }, [apiMethod]);

  useEffect(() => {
    console.log("callResponse", callResponse);
  }, [callResponse]);

  useEffect(() => {
    console.log("getQueryKeyValue", getQueryKeyValue);
  }, [getQueryKeyValue]);

  useEffect(() => {
    console.log("getQueryKey", getQueryKey);
  }, [getQueryKey]);

  useEffect(() => {
    console.log("getQueryValue", getQueryValue);
  }, [getQueryValue]);

  const apiCall = async () => {
    if (apiMethod === "GET") {
      try {
        const response = await fetch(fullAPI);
        const data = await response.json();
        setCallResponse(data);
        console.log("data", data);
      } catch (error) {
        console.log("error", error);
      } finally {
        console.log("finally");
      }
    }
  };

  const buildURL = () => {
    let tempURL = "";
    if (inputAPI.length > 0) {
      tempURL = inputAPI;
      if (getQueryKeyValue.length > 0) {
        getQueryKeyValue.map((qkv, i) => {
          tempURL =
            i === 0
              ? `${tempURL}?${qkv.query}=${qkv.value}`
              : `${tempURL}&${qkv.query}=${qkv.value}`;
        });
      }
    }
    console.log("tempURL", tempURL);
    setFullAPI(tempURL);
  };

  const handleQueryKeyValueInputs = (
    key: string | number,
    value: string | number,
  ) => {
    console.log("key", key);
    console.log("value", value);
    if (key === "key") setGetQueryKey(value);

    if (key === "value") setGetQueryValue(value);
  };

  const handleQueryAdd = () => {
    setGetQueryKeyValue([
      ...getQueryKeyValue,
      { query: getQueryKey, value: getQueryValue },
    ]);
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
              console.log("TEST");
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
        <div>
          {apiMethod === "GET" && (
            <GetView
              onChange={handleQueryKeyValueInputs}
              onClick={handleQueryAdd}
              getQueryKey={getQueryKey}
              getQueryValue={getQueryValue}
            />
          )}
        </div>
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
