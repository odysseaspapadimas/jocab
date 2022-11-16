import { useSession } from "next-auth/react";
import { trpc } from "./trpc";

const useUser = () => {
  const { data: session } = useSession();
  const user = trpc.auth.getUser.useQuery(undefined, { enabled: !!session });

  return user.data;
};
export default useUser;
