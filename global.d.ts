import { BrowserProvider, Eip1193Provider } from "ethers";

declare type EthereumProvider = Eip1193Provider & BrowserProvider;
declare global {
  interface Window {
    ethereum: EthereumProvider;
  }
}
