import { Web3 } from "web3";
import { useMemo } from "react";
import type { Chain, Client, Transport } from "viem";
import { type Config, useClient, useConnectorClient } from "wagmi";

export function clientToWeb3js(client?: Client<Transport, Chain>) {
  if (!client) {
    return new Web3();
  }

  const { transport } = client;

  if (transport.type === "fallback") {
    return new Web3(transport.transports[0].value.url);
  }
  return new Web3(transport);
}

/** Action to convert a viem Client to a web3.js Instance. */
export function useWeb3js({ chainId }: { chainId?: number } = {}) {
  const client = useClient<Config>({ chainId });
  return useMemo(() => clientToWeb3js(client), [client]);
}

/** Action to convert a viem ConnectorClient to a web3.js Instance. */
export function useWeb3jsSigner({ chainId }: { chainId?: number } = {}) {
  const { data: client } = useConnectorClient<Config>({ chainId });
  return useMemo(() => clientToWeb3js(client), [client]);
}
