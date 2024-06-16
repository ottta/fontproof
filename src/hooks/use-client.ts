import { useEffect, useState } from "react";

export default function useClient() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => void setMounted(true), []);
  return mounted;
}
