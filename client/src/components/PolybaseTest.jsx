import * as React from "react";
import { usePolybase, useDocument } from "@polybase/react";

export const PolybaseComponent = () => {
  const polybase = usePolybase();
  const { data, error, loading } = useDocument(
    polybase
      .collection("Profiles")
      .record("0x3d0282c28E1088EE83E8BAEA2EDb6506a6F8026B")
  );

  return !loading ? <h1>{JSON.stringify(data.data)}</h1> : <h1>Loading...</h1>;
};
