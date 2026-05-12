"use client";

import JsonView from "@uiw/react-json-view";
type Props = {
  response: Object;
};
export const ResponseView = ({ response }: Props) => {
  return <JsonView value={response || {}} />;
};
