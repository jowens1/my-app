"use client"

import { useState, useEffect, useRef } from "react"

interface GetQuery {
    query: string;
    value: string | number;
}

export const APITool = () => {
    const [inputAPI, setInputApi] = useState('')
    const [apiMethod, setAPIMethod] = useState('')
    const [callResponse, setCallResponse] = useState('')

    const [getQueryKey, setGetQueryKey] = useState('')
    const [getQueryValue, setGetQueryValue] = useState<string | number>('')
    const [getQueryKeyValue, setGetQueryKeyValue] = useState<GetQuery[]>([])

    const [fullAPI, setFullAPI] = useState('')

    useEffect(() => {
        console.log('inputAPI', inputAPI)
    }, [inputAPI])

    useEffect(() => {
        console.log('apiMethod', apiMethod)
    }, [apiMethod])

    useEffect(() => {
        console.log('callResponse', callResponse)
    }, [callResponse])

    useEffect(() => {
        console.log('getQueryKeyValue', getQueryKeyValue)

    }, [getQueryKeyValue])

    const apiCall = async () => {
        if (apiMethod === 'GET') {
            try {
                const response = await fetch(fullAPI)
                const data = await response.json()
                setCallResponse(data)
                console.log('data', data)
            } catch (error) {
                console.log('error', error)
            } finally {
                console.log('finally')
            }
        }

    }

    const buildURL = () => {

        let tempURL = '';
        if (inputAPI.length > 0) {
            tempURL = inputAPI
            if (getQueryKeyValue.length > 0) {
                getQueryKeyValue.map((qkv) => {
                    tempURL = `${tempURL}?${qkv.query}=${qkv.value}`
                })
            }
        }
        console.log('tempURL', tempURL)
        setFullAPI(tempURL)
    }

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
                            setInputApi(e.target.value)
                        }}
                    />
                    <button className="bg-blue-500 text-black w-24" onClick={() => {
                        console.log('TEST')
                        buildURL()
                    }}>Add</button>
                </div>
                <div>
                    <button className="bg-blue-500 w-24 text-black mt-1 mr-1" onClick={() => {
                        setAPIMethod('GET')
                    }}>GET</button>
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
                    <input
                        placeholder="Add Query"
                        className="bg-white text-black w-full mt-1"
                        value={getQueryKey}
                        type="string"
                        onChange={(e) => {
                            setGetQueryKey(e.target.value)
                        }}
                    />
                    <input
                        placeholder="Add Query value"
                        className="bg-white text-black w-full mt-1"
                        value={getQueryValue}
                        type="string"
                        onChange={(e) => {
                            setGetQueryValue(e.target.value)
                        }}
                    />
                    <button className="bg-blue-500 w-24 text-black mt-1 mr-1" onClick={() => {
                        setGetQueryKeyValue([...getQueryKeyValue, { query: getQueryKey, value: getQueryValue }])
                    }}>Add</button>
                </div>
                <div>
                    <button className="bg-blue-500 w-24 mt-1" onClick={() => apiCall()}>Call</button>
                </div>
            </div>
        </>
    )
}