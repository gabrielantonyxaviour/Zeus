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

  const [message, setMessage] = React.useState("");
  const [chats, setChats] = React.useState([]);
  const [pgpDecryptedPvtKey, setPgpDecryptedPvtKey] = React.useState(null);

  async function sendMessage(message) {
    if (recipient && pgpDecryptedPvtKey) {
      // actual api
      const response = await PushAPI.chat.send({
        messageContent: message,
        messageType: "Text", // can be "Text" | "Image" | "File" | "GIF"
        receiverAddress: `eip155:${recipient_address}`,
        signer: signer,
        pgpPrivateKey: pgpDecryptedPvtKey,
      });
    }
  }

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

  return !loading ? (
    <div>
      <div className="row">
        {chats.map((chat, index) => (
          <div key={index}>
            <p>{JSON.stringify(chat)}</p>
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={() => sendMessage(message)}>Send</button>
      </div>
    </div>
  ) : (
    <h1>Loading...</h1>
  );
};
