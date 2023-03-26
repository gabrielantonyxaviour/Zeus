import * as React from "react";
import * as PushAPI from "@pushprotocol/restapi";
import { usePolybase } from "@polybase/react";
import { useAccount, useSigner } from "wagmi";

export const PushChat = ({ recipient_address }) => {
  const polybase = usePolybase();
  const { address } = useAccount();
  const { data: signer, isError, isLoading } = useSigner();
  const [loading, setLoading] = React.useState(true);
  const [recipient, setRecipient] = React.useState(null);
  const [chats, setChats] = React.useState([]);
  const [pgpDecryptedPvtKey, setPgpDecryptedPvtKey] = React.useState(null);

  React.useEffect(() => {
    if (!isLoading) {
      (async () => {
        let user = await PushAPI.user.get({
          account: `eip155:${recipient_address}`,
        });

        if (user === null) {
          user = await PushAPI.user.create({
            account: `eip155:${recipient_address}`,
          });
        }

        setRecipient(user);

        // console.log({
        //   encryptedPGPPrivateKey: user.encryptedPrivateKey,
        //   signer: signer,
        // });

        const decryptedPvtKey = await PushAPI.chat.decryptPGPKey({
          encryptedPGPPrivateKey: user.encryptedPrivateKey,
          signer: signer,
        });

        console.log("decryptedPvtKey", decryptedPvtKey);

        setPgpDecryptedPvtKey(decryptedPvtKey);

        if (decryptedPvtKey) {
          // actual api
          const chats = await PushAPI.chat.chats({
            account: `eip155:${recipient_address}`,
            toDecrypt: true,
            pgpPrivateKey: decryptedPvtKey,
          });

          console.log("chats", chats);

          setChats(chats);
          setLoading(false);
        }
      })();
    }
  }, [isLoading, signer, pgpDecryptedPvtKey]);

  return !loading ? <h1>{JSON.stringify(chats)}</h1> : <h1>Loading...</h1>;
};
