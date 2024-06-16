"use client";

import { ReactNode, createContext, useContext } from "react";
import { IBrowser, IDevice, IEngine, IOS, UAParser } from "ua-parser-js";

type ContextAgentAttr = {
  browser: IBrowser;
  device: IDevice;
  engine: IEngine;
  os: IOS;
};
const ContextAgent = createContext<ContextAgentAttr>(undefined!);

export function useAgent() {
  const agent = useContext(ContextAgent);
  if (!agent) throw new Error("Must be inside <ProviderAgent />");
  return agent;
}

export default function ProviderAgent({
  children,
  agent,
}: {
  children: ReactNode;
  agent: string | null;
}) {
  const uAgent = new UAParser(agent!);
  const browser = uAgent.getBrowser();
  const device = uAgent.getDevice();
  const os = uAgent.getOS();
  const engine = uAgent.getEngine();
  // console.log(uAgent.getResult());
  return (
    <ContextAgent.Provider value={{ browser, device, engine, os }}>
      {children}
    </ContextAgent.Provider>
  );
}
