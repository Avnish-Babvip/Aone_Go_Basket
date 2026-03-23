import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiSolidSend } from "react-icons/bi";
import { subscribeNow } from "../features/actions/customer";

export default function SubscribeNow() {
  const dispatch = useDispatch();
  const { siteData } = useSelector((state) => state.home);
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (!email) return;

    dispatch(subscribeNow({ email })) // only email in payload
      .unwrap()
      .then(() => {
        setEmail("");
      });
  };

  return (
    <div className="lg:col-span-1">
      <h3 className="text-black font-bold text-base mb-6">
        {" "}
        {siteData?.subscribe_title}
      </h3>

      <p className="text-gray-500 text-[14px] mb-6 leading-6">
        {siteData?.subscribe_description}
      </p>

      <div className="relative group">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Write your email here"
          className="w-full h-12 bg-white border border-gray-200 rounded-md px-4 pr-12 text-sm focus:border-brand-green outline-none transition-all"
        />

        <button
          onClick={handleSubscribe}
          className="absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-brand-green text-white rounded-md hover:bg-brand-green transition-colors"
        >
          <BiSolidSend size={18} />
        </button>
      </div>
    </div>
  );
}
