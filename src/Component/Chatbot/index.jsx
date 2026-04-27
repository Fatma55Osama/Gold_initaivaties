import React, { useEffect, useRef, useState } from "react";
import styles from "./index.module.css";
import { IoIosRefresh, IoMdClose, IoMdSend } from "react-icons/io";
import { FaMicrophone } from "react-icons/fa6";
import { getDomain } from "../../configLoader";
import { postChat } from "../../Data/API/postChat";
import { useModalChatbot } from "../../Store";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
export default function Chatbot() {
  const [message, setMessage] = useState([]);
  const [input, setInput] = useState("");
  const { closeModalChatbot } = useModalChatbot();
  const [isSoundOn, setIsSoundOn] = useState(true);
  const currentUtteranceRef = useRef(null);
  const inputRef = useRef();
  const domain = getDomain();
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const [playingId, setPlayingId] = useState(null);

  useEffect(() => {
    const synth = window.speechSynthesis;

    const loadVoices = () => {
      const voices = synth.getVoices();
      console.log("Voices:", voices);
    };

    loadVoices();

    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = loadVoices;
    }
  }, []);

  useEffect(() => {
    const unlock = () => {
      const utter = new SpeechSynthesisUtterance(" ");
      window.speechSynthesis.speak(utter);
      document.removeEventListener("click", unlock);
    };

    document.addEventListener("click", unlock);
  }, []);

  const speakBotReply = (text, id) => {
    if (!isSoundOn || !text) return;

    const synth = window.speechSynthesis;

    synth.cancel();

    text = text.replace(/[#*.:()]/g, "");

    const utterance = new SpeechSynthesisUtterance(text);
    const voices = synth.getVoices();
    const arabicVoice = voices.find((v) => v.name.includes("Hoda"));

    if (arabicVoice) {
      utterance.voice = arabicVoice;
      utterance.lang = "ar-EG";
    }

    utterance.onstart = () => {
      setPlayingId(id); 
    };

    utterance.onend = () => {
      setPlayingId(null); 
    };

    utterance.onerror = () => {
      setPlayingId(null);
    };

    synth.speak(utterance);
  };

useEffect(() => {
  const savedMessages = JSON.parse(localStorage.getItem("chat_messages")) || [];
  const currentTime = new Date().getTime();
  const maxAge = 24 * 60 * 60 * 1000; 

  const filteredMessages = savedMessages.filter(msg => !msg.time || currentTime - msg.time < maxAge);

  const lastFiveMessages = filteredMessages.slice(-6);

  setMessage(lastFiveMessages);
}, []);


  useEffect(() => {
  const messagesWithTime = message.map(msg => ({
    ...msg,
    time: msg.time || new Date().getTime(),
  }));


  const currentTime = new Date().getTime();
  const maxAge = 24 * 60 * 60 * 1000;
  const filteredMessages = messagesWithTime.filter(msg => currentTime - msg.time < maxAge);
  const lastFiveMessages = filteredMessages.slice(-5);

  localStorage.setItem("chat_messages", JSON.stringify(lastFiveMessages));
  messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
}, [message]);

const sendMessage = async (text = input) => {
  if (isTyping || !text.trim()) return;

  const userMessage = { sender: "user", text };
  const updatedMessages = [...message, userMessage];
  setMessage(updatedMessages);
  setInput("");
  setIsTyping(true);

  // نرسل آخر 6 رسائل كسياق
  const lastSixMessages = updatedMessages
    .slice(-2)
    .map(msg => ({ sender: msg.sender, text: msg.text }));

  try {
    // إرسال مؤقت بدون سياق
    let contextToSend = lastSixMessages;

   
    // const independentKeywords = ["ضرر", "أضرار", "سن أكبر", "دواء", "مرض"];
    // const isIndependent = independentKeywords.some(kw => text.includes(kw));

    // if (isIndependent) {
    //   contextToSend = []; // نبعت بدون سياق
    // }

    const res = await postChat(text, domain, contextToSend);

    const { aiAnswer, fullDetails, isFollowUp } = res.data;

    const botMessage = {
      sender: "bot",
      text: aiAnswer,
      fullDetails,
      id: Date.now()
    };

    setMessage(prev => [...prev, botMessage]);
    speakBotReply(aiAnswer, botMessage.id);

    // تخزين الرسائل حسب نوع السؤال
    if (!isFollowUp ) {
      localStorage.setItem("chat_messages", JSON.stringify([userMessage, botMessage]));
    } else {
      localStorage.setItem("chat_messages", JSON.stringify(updatedMessages.slice(-6)));
    }


  } catch (err) {
    console.error(err);
  } finally {
    setIsTyping(false);
  }
};
  const handelkeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  let sessionId = localStorage.getItem("chat_session_id");

  if (!sessionId) {
    // sessionId = crypto.randomUUID();
    sessionId = uuidv4();
    localStorage.setItem("chat_session_id", sessionId);
    console.log(sessionId);
  }

  const startRecording = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();

    recognition.lang = "ar-EG";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const speechText = event.results[0][0].transcript;
      setInput((prev) => (prev ? prev + " " + speechText : speechText));
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    recognition.start();
  };

  const toggleSound = () => {
    const synth = window.speechSynthesis;

    if (isSoundOn) {
      synth.cancel();
    }

    setIsSoundOn((prev) => !prev);
  };

  const showMoreDetails = (fullContent) => {
    const detailedMessage = {
      sender: "bot",
      text: fullContent,
      isDetailedPart: true,
    };

    setMessage((prev) => [...prev, detailedMessage]);
    speakBotReply(fullContent);
  };

  return (
    <div className={`${styles.modalChatbot}`}>
      <div
        className={
          styles.content + " d-flex flex-column justify-content-between"
        }
      >
        <div className="headChat border-bottom p-2 d-flex flex-column justify-content-between align-items-end">
           <IoMdClose
            onClick={closeModalChatbot}
            style={{ cursor: "pointer", fontSize: "20px" }}
          />
          <div className="d-flex  align-items-center gap-3">
           
            <div
              className={`${styles.iconAi} rounded-5 d-flex justify-content-center align-items-center`}
            >
              <strong>AI</strong>
            </div>
            <div className={styles.texthead}>
              <h1>المساعد الذكي لمبادرة الألف يوم الذهبية</h1>
              <strong className="">المعلومات المقدمه استرشادية، لمزيد من التفاصيل برجاء حجز مشورة اونلاين</strong>
            </div>
          </div>
         
        </div>

        <div className="bodyChat flex-grow-1">
          <div className="border h-100" style={{ backgroundColor: "#f8f9fa" }}>
            <div className={`${styles.chatbodymassage} p-3`}>
              {message?.map((msg, index) => (
                <div
                  key={index}
                  className={`d-flex mb-2 ${
                    msg.sender === "user" ? "justify-content-end" : ""
                  }`}
                >
                  <div
                    className={`p-2 rounded-3 text-wrap ${
                      msg.sender === "user"
                        ? styles.rightBubble
                        : styles.leftBubble
                    }`}
                  >
                    {msg.text}

                    {msg.sender !== "user" && (
                      <div className={styles.botActions}>
                        <div className="d-flex align-items-center gap-2">
                          {isSoundOn ? (
                            <FaVolumeUp
                              onClick={toggleSound}
                              className={styles.actionIcon}
                            />
                          ) : (
                            <FaVolumeMute
                              onClick={toggleSound}
                              className={styles.actionIcon}
                            />
                          )}
                        </div>
                        <IoIosRefresh
                          onClick={() => {
                            if (playingId !== msg.id) {
                              speakBotReply(msg.text, msg.id);
                            }
                          }}
                          className={`${styles.actionIcon} ${
                            playingId === msg.id ? styles.loading : ""
                          }`}
                        />
                        {/* <span
                          className={styles.showMoreBtn}
                          onClick={() => {
                            if (msg.full_details) {
                              showMoreDetails(
                                msg.full_details
                              );
                            } else {
                              alert(
                                "عذراً، لا توجد تفاصيل إضافية لهذا الرد."
                              );
                            }
                          }}
                        >
                          | عرض التفاصيل
                        </span> */}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="d-flex mb-2">
                  <div className={`${styles.leftBubble} p-2 rounded-3`}>
                    ...
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>

        <div className="footerChat position-relative d-flex justify-content-end ">
          <textarea
            ref={inputRef}
            className={`${styles.textareaChat} col-12`}
            value={input}
            onKeyDown={handelkeyPress}
            onChange={(e) => setInput(e.target.value)}
            placeholder="اكتب رسالتك..."
          />

          <div className={`${styles.icons} position-absolute`}>
            <FaMicrophone onClick={startRecording} />
            <IoMdSend onClick={() => sendMessage(input)} />
          </div>
        </div>
      </div>
    </div>
  );
}
