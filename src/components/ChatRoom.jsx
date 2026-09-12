import { useState, useEffect } from "react";
import { auth, loginWithGoogle, logout, db, isFirebaseConfigured } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp
} from "firebase/firestore";

export default function ChatRoom() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // Cek login
  useEffect(() => {
    if (!auth) return;
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  // Ambil pesan real-time
  useEffect(() => {
    if (!db) return;
    const q = query(collection(db, "messages"), orderBy("createdAt"));
    const unsub = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, []);

  // Kirim pesan
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!db || !user || !message.trim()) return;

    await addDoc(collection(db, "messages"), {
      text: message,
      uid: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
      createdAt: serverTimestamp()
    });
    setMessage("");
  };

  return (
    <div className="flex h-full w-full flex-col gap-5 rounded-[14px] bg-[#212121] px-6 py-8 sm:px-8">
      <h2 className="text-lg font-semibold text-white">💬 Chat Room</h2>

      {/* Header user */}
      {user && (
        <div className="flex items-center justify-between border-b border-[#414141] pb-3">
          <div className="flex items-center gap-3">
            <img src={user.photoURL} alt="avatar" className="h-10 w-10 rounded-full" />
            <span className="font-semibold text-white">{user.displayName}</span>
          </div>
          <button
            onClick={logout}
            className="rounded-md border border-[#414141] bg-[#313131] px-4 py-2 text-sm font-semibold text-[#717171] transition-colors hover:border-white hover:bg-white hover:text-[#212121] active:scale-95"
          >
            Logout
          </button>
        </div>
      )}

      {/* Area pesan */}
      <div
        className={`min-h-48 flex-1 space-y-3 overflow-y-auto rounded-lg border border-[#414141] bg-transparent p-3 ${
          !isFirebaseConfigured && !user ? "pointer-events-none opacity-50" : ""
        }`}
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-2 ${msg.uid === user?.uid ? "justify-end" : "justify-start"}`}
          >
            {msg.uid !== user?.uid && (
              <img
                src={msg.photoURL || "https://via.placeholder.com/40"}
                alt="avatar"
                className="h-8 w-8 rounded-full"
              />
            )}
            <div
              className={`max-w-[75%] rounded-lg p-3 ${
                msg.uid === user?.uid
                  ? "bg-[#313131] text-white"
                  : "border border-[#414141] bg-transparent text-white"
              }`}
            >
              <div className="mb-1 text-xs text-[#717171]">{msg.displayName}</div>
              <div>{msg.text}</div>
            </div>
            {msg.uid === user?.uid && (
              <img
                src={msg.photoURL || "https://via.placeholder.com/40"}
                alt="avatar"
                className="h-8 w-8 rounded-full"
              />
            )}
          </div>
        ))}
      </div>

      {/* Form login / kirim pesan */}
      {user ? (
        <form onSubmit={sendMessage} className="flex w-full flex-wrap gap-2 sm:flex-nowrap">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ketik pesan..."
            className="min-w-0 flex-1 rounded-lg border border-[#414141] bg-transparent px-4 py-3 text-white placeholder-white/50 outline-none transition-colors focus:border-[#e81cff]"
          />
          <button
            type="submit"
            className="w-full cursor-pointer rounded-md border border-[#414141] bg-[#313131] px-4 py-3 text-sm font-semibold text-[#717171] transition-colors hover:border-white hover:bg-white hover:text-[#212121] active:scale-95 sm:w-auto"
          >
            Send
          </button>
        </form>
      ) : isFirebaseConfigured ? (
        <div className="flex flex-col items-center justify-center gap-4">
          <button
            onClick={loginWithGoogle}
            className="flex items-center gap-3 rounded-md border border-[#414141] bg-[#313131] px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white hover:text-[#212121] active:scale-95"
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google logo"
              className="h-5 w-5"
            />
            Login with Google
          </button>
          <p className="text-sm font-medium text-[#717171]">Login untuk mengirim pesan</p>
        </div>
      ) : (
        <p className="text-center text-sm font-medium text-[#717171]">
          Chat is unavailable until Firebase is configured.
        </p>
      )}
    </div>
  );
}
