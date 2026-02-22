import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import api from "../../services/api/axios";

const ChatAIPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const messagesEndRef = useRef(null);

  // Clé localStorage basée sur l'ID utilisateur pour isoler les conversations
  const getStorageKey = () => {
    if (user && user._id) {
      return `chatMessages_${user._id}`;
    }
    return "chatMessages";
  };

  // Charger les messages depuis localStorage ou utiliser le message par défaut
  const loadMessagesFromStorage = () => {
    try {
      const storageKey = getStorageKey();
      const savedMessages = localStorage.getItem(storageKey);
      if (savedMessages) {
        const parsedMessages = JSON.parse(savedMessages);
        // Convertir les timestamps string en objets Date
        return parsedMessages.map((msg) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        }));
      }
    } catch (error) {
      console.error("Erreur lors du chargement des messages:", error);
    }
    // Message par défaut si rien n'est sauvegardé
    return [
      {
        sender: "bot",
        text: "👋 Bonjour ! Je suis **AutoExpert**, votre assistant professionnel.\n\n🔧 Je peux vous aider avec :\n• Diagnostics de pannes\n• Conseils d'entretien\n• Problèmes électriques\n• Carrosserie\n\n📋 Pour un diagnostic précis, j'ai besoin de :\n1️⃣ Type de véhicule (citadine/berline/SUV)\n2️⃣ Année de fabrication\n3️⃣ Motorisation (essence/diesel/hybride)\n\nPosez votre question !",
        timestamp: new Date(),
      },
    ];
  };

  // Sauvegarder les messages dans localStorage
  const saveMessagesToStorage = (messagesToSave) => {
    try {
      const storageKey = getStorageKey();
      localStorage.setItem(storageKey, JSON.stringify(messagesToSave));
    } catch (error) {
      console.error("Erreur lors de la sauvegarde des messages:", error);
    }
  };

  const [messages, setMessages] = useState(loadMessagesFromStorage);
  const [isLoading, setIsLoading] = useState(false);
  const [ollamaStatus, setOllamaStatus] = useState("checking");
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  // Sauvegarder les messages automatiquement quand ils changent
  useEffect(() => {
    saveMessagesToStorage(messages);
  }, [messages]);

  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: { message: "" },
  });
  const inputValue = watch("message");

  // Vérifier le statut d'Ollama au chargement
  useEffect(() => {
    checkOllamaStatus();
  }, []);

  const checkOllamaStatus = async () => {
    try {
      const { data } = await api.get("/chat/ai/status");
      setOllamaStatus(data.success && data.modelExists ? "online" : "warning");

      if (!data.modelExists) {
        setMessages((prev) => [
          ...prev,
          {
            sender: "system",
            text: "⚠️ Le modèle AutoExpert n'est pas disponible. Contactez l'administrateur.",
            timestamp: new Date(),
          },
        ]);
      }
    } catch (error) {
      setOllamaStatus("offline");
      setMessages((prev) => [
        ...prev,
        {
          sender: "system",
          text: "❌ Le service AutoExpert IA est temporairement indisponible.",
          timestamp: new Date(),
        },
      ]);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // Ne jamais scroller automatiquement au chargement ou refresh
    // Le scroll ne se fait que manuellement par l'utilisateur
  }, [messages]);

  const onSubmit = async (data) => {
    if (!data.message.trim() || isLoading) return;

    const userMessage = {
      sender: "user",
      text: data.message,
      timestamp: new Date(),
    };

    // Ajouter le message utilisateur aux messages existants
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    const currentInput = data.message;
    setValue("message", "");
    setIsLoading(true);

    try {
      // Préparer l'historique de conversation (exclure les messages système)
      const conversationHistory = updatedMessages.filter(
        (msg) => msg.sender !== "system",
      );

      const response = await api.post("/chat/ai", {
        messages: conversationHistory,
      });

      const botMessage = {
        sender: "bot",
        text: response.data.reply,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setOllamaStatus("online");
    } catch (error) {
      console.error("Erreur:", error);

      let errorText = "❌ Une erreur est survenue.";

      if (error.response?.status === 503) {
        errorText =
          "⚠️ Le service AutoExpert IA est temporairement indisponible. Veuillez réessayer dans quelques instants.";
        setOllamaStatus("offline");
      } else if (error.response?.status === 504) {
        errorText =
          "⏱️ Le serveur met trop de temps à répondre. Veuillez réessayer.";
      } else if (error.response?.data?.message) {
        errorText = error.response.data.message;
      }

      const errorMessage = {
        sender: "system",
        text: errorText,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const resetChat = () => {
    const resetMessages = [
      {
        sender: "bot",
        text: "✅ Conversation réinitialisée.\n\nPour un diagnostic précis, précisez :\n1️⃣ Type de véhicule\n2️⃣ Année\n3️⃣ Motorisation\n\nComment puis-je vous aider ?",
        timestamp: new Date(),
      },
    ];
    setMessages(resetMessages);
    saveMessagesToStorage(resetMessages);
  };

  const formatMessage = (text) => {
    return text.split("\n").map((line, i) => (
      <span key={i}>
        {line.split("**").map((part, j) =>
          j % 2 === 0 ? (
            part
          ) : (
            <strong key={j} className="font-bold text-cyan-400">
              {part}
            </strong>
          ),
        )}
        {i < text.split("\n").length - 1 && <br />}
      </span>
    ));
  };

  const quickQuestions = [
    {
      label: "Problème freinage",
      text: "Ma Clio 2015 diesel fait un bruit au freinage",
    },
    {
      label: "Voyant moteur",
      text: "Le voyant moteur est allumé sur ma Golf 2018 essence",
    },
    {
      label: "Problème démarrage",
      text: "Ma 208 2016 essence ne démarre pas",
    },
    {
      label: "Pare-choc fissuré",
      text: "Le pare-choc avant de ma Polo 2017 est fissuré",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black">
      {/* HEADER */}
      <div className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-xl border-b border-slate-800 shadow-xl">
        <div className="max-w-5xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/dashboard")}
              className="p-2 hover:bg-slate-800 rounded-xl transition-all"
              title="Retour au dashboard"
            >
              <svg
                className="w-6 h-6 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <div>
              <h1 className="text-xl md:text-2xl font-black text-white flex items-center gap-2">
                🤖 <span className="text-cyan-500">Auto</span>Expert{" "}
                <span className="text-xs md:text-sm font-normal text-slate-500">
                  IA
                </span>
              </h1>
              <div className="flex items-center gap-2 text-[10px] md:text-xs text-slate-500">
                <span>Assistant Mécanique Professionnel</span>
                <span
                  className={`w-2 h-2 rounded-full ${
                    ollamaStatus === "online"
                      ? "bg-green-500"
                      : ollamaStatus === "offline"
                        ? "bg-red-500"
                        : "bg-yellow-500"
                  } animate-pulse`}
                ></span>
              </div>
            </div>
          </div>
          <button
            onClick={resetChat}
            className="px-3 md:px-4 py-2 bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 text-red-400 rounded-xl text-xs md:text-sm font-bold transition-all flex items-center gap-1 md:gap-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            <span className="hidden md:inline">Reset</span>
          </button>
        </div>
      </div>

      {/* MESSAGES */}
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-6 md:py-8">
        <div className="space-y-6 md:space-y-8 mb-36 md:mb-40 bg-slate-950/20 rounded-2xl p-4 md:p-6 border border-slate-800/50">
          {/* Questions rapides (au début uniquement) */}
          {messages.length === 1 && (
            <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-4 md:p-6">
              <h3 className="text-sm font-bold text-slate-400 mb-3 flex items-center gap-2">
                <span>💡</span> Exemples de questions :
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
                {quickQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => setValue("message", q.text)}
                    className="px-4 py-3 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 rounded-xl text-left transition-all hover:border-cyan-500 group"
                  >
                    <div className="text-xs text-cyan-400 font-bold mb-1">
                      {q.label}
                    </div>
                    <div className="text-sm text-slate-300 group-hover:text-white transition-colors">
                      {q.text}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Messages */}
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className="max-w-[85%] md:max-w-[80%]">
                {/* Message Bubble */}
                <div
                  className={`${
                    msg.sender === "user"
                      ? "bg-blue-600 text-white rounded-2xl rounded-br-sm"
                      : msg.sender === "system"
                        ? "bg-red-900/20 border border-red-700 text-red-400 rounded-2xl rounded-bl-sm"
                        : "bg-slate-800/70 border border-slate-700 text-slate-100 rounded-2xl rounded-bl-sm"
                  } px-4 md:px-5 py-3 md:py-4 shadow-sm max-w-2xl`}
                >
                  <div className="text-sm md:text-base leading-relaxed break-words whitespace-pre-wrap">
                    {formatMessage(msg.text)}
                  </div>
                  <div className="text-[10px] md:text-xs opacity-60 mt-2 text-right">
                    {msg.timestamp.toLocaleTimeString("fr-FR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Loading */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-slate-800/50 border border-slate-700 rounded-3xl px-4 md:px-6 py-3 md:py-4">
                <div className="flex items-center gap-2 text-slate-400">
                  <div className="flex gap-1">
                    <div
                      className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    ></div>
                  </div>
                  <span className="text-xs md:text-sm">
                    Diagnostic en cours...
                  </span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* INPUT BAR */}
      <div className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-xl border-t border-slate-800 shadow-2xl">
        <div className="max-w-5xl mx-auto px-4 md:px-6 py-4 md:py-6">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex gap-2 md:gap-4"
          >
            <input
              type="text"
              {...register("message")}
              onKeyPress={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(onSubmit)();
                }
              }}
              placeholder="Décrivez votre problème (ex: Ma Clio 2015 diesel ne démarre pas)..."
              disabled={isLoading || ollamaStatus === "offline"}
              className="flex-1 px-4 md:px-6 py-3 md:py-4 bg-slate-800 border border-slate-700 rounded-2xl text-white placeholder-slate-500 focus:border-cyan-500 outline-none transition-all disabled:opacity-50 text-sm md:text-base"
            />
            <button
              type="submit"
              disabled={
                isLoading || !inputValue.trim() || ollamaStatus === "offline"
              }
              className="px-4 md:px-8 py-3 md:py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 disabled:from-slate-700 disabled:to-slate-700 text-white font-bold rounded-2xl transition-all disabled:cursor-not-allowed flex items-center gap-2 text-sm md:text-base"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 md:h-5 md:w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span className="hidden md:inline">Envoi...</span>
                </>
              ) : (
                <>
                  <span className="hidden md:inline">Envoyer</span>
                  <svg
                    className="w-4 h-4 md:w-5 md:h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatAIPage;
