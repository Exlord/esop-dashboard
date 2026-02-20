import { useEffect, useState } from "react"
import { providerService } from "@/services/provider.service"

export function useBlockNumber() {
  const [block, setBlock] = useState<number>()

  useEffect(() => {
    const provider = providerService.getReadProvider()

    provider.on("block", setBlock)

    return () => {
      provider.off("block", setBlock)
    }
  }, [])

  return block
}
