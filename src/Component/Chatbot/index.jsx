import React, { useEffect, useRef, useState } from "react";
import styles from "./index.module.css";
import { IoIosRefresh, IoMdClose, IoMdSend } from "react-icons/io";
import { FaMicrophone } from "react-icons/fa6";
import { getDomain } from "../../configLoader";
import { postChat } from "../../Data/API/postChat";
import { useModalChatbot } from "../../Store";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import { BsRecordCircle } from "react-icons/bs";
import { BiSolidDislike, BiSolidLike } from "react-icons/bi";
import { postChatbotEvaluation } from "../../Data/API/postChatbotEvaluation";

export default function Chatbot() {
  const [message, setMessage] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [playingId, setPlayingId] = useState(null);

  const inputRef = useRef();
  const messagesEndRef = useRef(null);
  const currentUtteranceRef = useRef(null);
  const recognitionRef = useRef(null);

  const { closeModalChatbot } = useModalChatbot();
  const domain = getDomain();

  useEffect(() => {
    const synth = window.speechSynthesis;

    const loadVoices = () => {
      synth.getVoices();
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

  useEffect(() => {
    const savedMessages =
      JSON.parse(localStorage.getItem("chat_messages")) || [];

    const currentTime = new Date().getTime();
    const maxAge = 24 * 60 * 60 * 1000;

    const filteredMessages = savedMessages.filter(
      (msg) => !msg.time || currentTime - msg.time < maxAge,
    );

    setMessage(filteredMessages.slice(-6));
  }, []);

  useEffect(() => {
    const messagesWithTime = message.map((msg) => ({
      ...msg,
      time: msg.time || new Date().getTime(),
    }));

    const currentTime = new Date().getTime();
    const maxAge = 24 * 60 * 60 * 1000;

    const filteredMessages = messagesWithTime
      .filter((msg) => currentTime - msg.time < maxAge)
      .slice(-5);

    localStorage.setItem("chat_messages", JSON.stringify(filteredMessages));

    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [message]);

  const speakBotReply = async (text, id) => {
    if (!isSoundOn || !text) return;

    if (currentUtteranceRef.current) {
      currentUtteranceRef.current.pause();
      currentUtteranceRef.current.src = "";
      currentUtteranceRef.current = null;
    }

    setPlayingId(null);

    text = text
      .replace(/[#*.:()0-9٠-٩]/g, "")
      .replace(/\s+/g, " ")
      .trim();

    if (!text) return;

    setPlayingId(id);

    try {
      const res = await fetch(
        "https://api.elevenlabs.io/v1/text-to-speech/meAbY2VpJkt1q46qk56T",
        {
          method: "POST",
          headers: {
            "xi-api-key": "sk_417d54848844363fc855b92e0f10796ad6e8607d95d88ec8",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text,
            model_id: "eleven_multilingual_v2",
            voice_settings: {
              stability: 0.5,
              similarity_boost: 0.75,
            },
          }),
        },
      );

      if (!res.ok) {
        const err = await res.json();
        console.error("ElevenLabs error:", err);
        setPlayingId(null);
        return;
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      const audio = new Audio(url);

      currentUtteranceRef.current = audio;

      audio.onended = () => {
        setPlayingId(null);
        URL.revokeObjectURL(url);
        currentUtteranceRef.current = null;
      };

      audio.onerror = (e) => {
        console.error("Audio error:", e);
        setPlayingId(null);
        currentUtteranceRef.current = null;
      };

      await audio.play();
    } catch (err) {
      console.error(err);
      setPlayingId(null);
      currentUtteranceRef.current = null;
    }
  };

  const sendMessage = async (text = input) => {
    if (isTyping || !text.trim()) return;

    const userMessage = {
      sender: "user",
      text,
    };

    setMessage((prev) => [...prev, userMessage]);

    setInput("");
    setIsTyping(true);

    try {
      const res = await postChat(text, domain);

      const { aiAnswer, fullDetails } = res.data;

      const botMessage = {
        sender: "bot",
        text: aiAnswer,
        fullDetails,
        id: Date.now(),
        question: text,
        evaluation: null,
      };

      setMessage((prev) => [...prev, botMessage]);

      speakBotReply(aiAnswer, botMessage.id);

      localStorage.setItem(
        "chat_messages",
        JSON.stringify([userMessage, botMessage]),
      );
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
    sessionId = uuidv4();
    localStorage.setItem("chat_session_id", sessionId);
  }

  // const startRecording = async () => {
  //   try {
  //     await navigator.mediaDevices.getUserMedia({
  //       audio: true,
  //     });

  //     const SpeechRecognition =
  //       window.SpeechRecognition ||
  //       window.webkitSpeechRecognition;

  //     if (!SpeechRecognition) {
  //       alert("المتصفح لا يدعم المايك");
  //       return;
  //     }

  //     recognitionRef.current?.stop();

  //     const recognition = new SpeechRecognition();

  //     recognitionRef.current = recognition;

  //     recognition.lang = "ar-EG";
  //     recognition.interimResults = false;
  //     recognition.maxAlternatives = 1;
  //     recognition.continuous = false;

  //     recognition.onstart = () => {
  //       console.log("🎤 mic started");
  //       setIsRecording(true);
  //     };

  //     recognition.onresult = (event) => {
  //       const speechText =
  //         event.results[0][0].transcript;

  //       console.log("TEXT:", speechText);

  //       setInput((prev) =>
  //         prev ? prev + " " + speechText : speechText
  //       );
  //     };

  //     recognition.onerror = (event) => {
  //       console.log(
  //         "❌ Speech recognition error:",
  //         event.error
  //       );

  //       setIsRecording(false);
  //     };

  //     recognition.onend = () => {
  //       console.log("🛑 mic ended");
  //       setIsRecording(false);
  //     };

  //     recognition.start();
  //   } catch (err) {
  //     console.error("Mic permission error:", err);
  //   }
  // };

const startRecording = async () => {
  try {
    await navigator.mediaDevices.getUserMedia({ audio: true });

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) return;

    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

    const recognition = new SpeechRecognition();

    recognitionRef.current = recognition;

    recognition.lang = "ar-EG";
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => {
      setIsRecording(true);
    };

    recognition.onresult = (event) => {
      let text = "";

      for (
        let i = event.resultIndex;
        i < event.results.length;
        i++
      ) {
        text += event.results[i][0].transcript;
      }

      setInput((prev) => (prev ? prev + " " + text : text));
    };

    recognition.onerror = (e) => {
      console.log(e.error);
      setIsRecording(false);
    };

    recognition.onend = () => {
      if (isRecording) {
        recognition.start();
      }
    };

    recognition.start();
  } catch (err) {
    console.log(err);
  }
};

  const toggleSound = () => {
    if (isSoundOn && currentUtteranceRef.current) {
      currentUtteranceRef.current.pause();
      currentUtteranceRef.current = null;
      setPlayingId(null);
    }

    setIsSoundOn((prev) => !prev);
  };
const handleEvaluation = async (
 question,
 answer,
 isCorrect,
 id
) => {

 const data = {
   question: question,
   chatBotReply: answer,
   isCorrect: isCorrect
 };

 console.log(data);

 try {

   await postChatbotEvaluation(
     domain,
     data
   );

   setMessage(prev =>
     prev.map(msg =>
       msg.id === id
       ? {
           ...msg,
           evaluation:isCorrect
         }
       : msg
     )
   );

 }
 catch(err){

   console.log(err);

 }

};
  return (
    <div className={styles.modalChatbot}>
      <div className={styles.content}>
        {/* ===== HEADER ===== */}

        <div className={styles.headChat}>
          <div className={styles.headerTop}>
            <button
              className={styles.closeBtn}
              onClick={closeModalChatbot}
              aria-label="إغلاق"
            >
              <IoMdClose />
            </button>
          </div>

          <div className={styles.headerInfo}>
            <div className={styles.texthead}>
              <h1>المساعد الذكي لمبادرة الألف يوم الذهبية</h1>

              <span>
                المعلومات المقدمة استرشادية، لمزيد من التفاصيل برجاء حجز مشورة
                أونلاين
              </span>
            </div>

            <div className={styles.iconAi}>
              <strong>AI</strong>
            </div>
          </div>
        </div>

        {/* ===== BODY ===== */}

        <div className={styles.bodyChat}>
          <div className={styles.chatbodymassage}>
            {message?.map((msg, index) => (
              <div
                key={index}
                className={`${styles.msgRow} ${
                  msg.sender === "user" ? styles.msgRowUser : ""
                }`}
              >
                <div
                  className={`${styles.bubble} ${
                    msg.sender === "user"
                      ? styles.rightBubble
                      : styles.leftBubble
                  }`}
                >
                  {msg.text}

                  {msg.sender !== "user" && (
                    <div className={styles.botActions}>
                      <button
                        className={styles.actionBtn}
                        onClick={toggleSound}
                      >
                        {isSoundOn ? <FaVolumeUp /> : <FaVolumeMute />}
                      </button>

                      <button
                        className={`${styles.actionBtn} ${
                          playingId === msg.id ? styles.spinning : ""
                        }`}
                        onClick={() => {
                          if (playingId !== msg.id) {
                            speakBotReply(msg.text, msg.id);
                          }
                        }}
                      >
                        <IoIosRefresh />
                      </button>

                      <div className="d-flex gap-2">
                        {msg.evaluation !== false && (
                          <button
                            className={`${styles.actionBtn}
                           ${msg.evaluation === true ? styles.activeLike : ""}`}
                            onClick={() =>
                              handleEvaluation(
                                msg.question,
                                msg.text,
                                true,
                                msg.id,
                              )
                            }
                          >
                            <BiSolidLike />
                          </button>
                        )}

                        {msg.evaluation !== true && (
                          <button
                            className={`${styles.actionBtn}
                            ${msg.evaluation === false ? styles.activeDislike : ""}`}
                            onClick={() =>
                              handleEvaluation(
                                msg.question,
                                msg.text,
                                false,
                                msg.id,
                              )
                            }
                          >
                            <BiSolidDislike />
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className={styles.msgRow}>
                <div className={`${styles.bubble} ${styles.leftBubble}`}>
                  <div className={styles.typingDots}>
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* ===== FOOTER ===== */}

        <div className={styles.footerChat}>
          <div className={styles.inputRow}>
            <button
              className={`${styles.micBtn} ${
                isRecording ? styles.micActive : ""
              }`}
              onClick={startRecording}
            >
              {isRecording ? <BsRecordCircle /> : <FaMicrophone />}
            </button>

            <textarea
              ref={inputRef}
              className={styles.textareaChat}
              value={input}
              onKeyDown={handelkeyPress}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isRecording ? "جاري الاستماع..." : "اكتب رسالتك..."}
              rows={1}
            />

            <button className={styles.sendBtn} onClick={() => sendMessage()}>
              <IoMdSend />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
