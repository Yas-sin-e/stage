import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/auth";

const ChatAssistantFloat = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  // Cacher le bouton si on est déjà sur la page chat-ai ou si l'utilisateur n'est pas connecté
  if (location.pathname === "/chat-ai" || !user) {
    return null;
  }

  const handleClick = () => {
    navigate("/chat-ai");
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full shadow-2xl shadow-blue-500/50 flex items-center justify-center hover:scale-110 transition-transform duration-300 group animate-bounce"
      title="Chat avec l'Assistant IA"
    >
      <svg
        className="w-8 h-8 text-white group-hover:scale-110 transition-transform"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
        />
      </svg>

      {/* Pulse effect */}
      <span className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-20"></span>
    </button>
  );
};

export default ChatAssistantFloat;
