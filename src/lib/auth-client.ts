import { createAuthClient } from "better-auth/react";
import { organizationClient } from "better-auth/client/plugins";
import { admin, member, owner, ac } from "./auth-permissions";

export const authClient = createAuthClient({
  plugins: [
    organizationClient({
      ac,
      roles: {
        owner,
        admin,
        member,
      },
    }),
  ],
});

export const { signIn, signUp, signOut, useSession } = authClient;
