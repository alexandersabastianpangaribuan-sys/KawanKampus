import React, { useState } from 'react';
import { 
  X, 
  Send, 
  ShieldCheck, 
  AlertCircle, 
  Clock, 
  Smile, 
  Paperclip,
  CheckCheck
} from 'lucide-react';
import { UserProfile } from '../types';

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetUser: string;
  itemTitle?: string;
  currentUser: UserProfile;
}

interface Message {
  id: string;
  sender: 'me' | 'them';
  text: string;
  time: string;
}

export const ChatModal: React.FC<ChatModalProps> = ({
  isOpen,
  onClose,
  targetUser,
  itemTitle,
  currentUser,
}) => {
  if (!isOpen) return null;

  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'them',
      text: `Halo ${currentUser.name}! Terima kasih sudah menghubungi terkait "${itemTitle || 'layanan kami'}". Ada yang bisa saya bantu diskusikan?`,
      time: 'Baru saja'
    }
  ]);

  const quickTemplates = [
    'Halo kak, barangnya masih ada?',
    'Bisa COD di gerbang UNIMED/USU?',
    'Boleh nego tipis mahasiswa kak?',
    'Berapa lama estimasi pengerjaannya kak?',
    'Apakah include garansi revisi minor?'
  ];

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      sender: 'me',
      text,
      time: 'Baru saja'
    };

    setMessages((prev) => [...prev, newMsg]);
    if (!textToSend) setInputMessage('');

    // Simulate polite reply after short delay
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `reply-${Date.now()}`,
          sender: 'them',
          text: `Halo kak! Siap, masih bisa banget. Silakan lakukan pesanan langsung di KawanKampus supaya transaksi kita terlindungi sistem keamanan kampus ya!`,
          time: 'Baru saja'
        }
      ]);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto animate-in fade-in">
      <div 
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden my-8 flex flex-col h-[560px]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Chat Header (Section AL) */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-gray-100 bg-gray-50/80">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-[#0B3D91] font-bold flex items-center justify-center text-sm">
                {targetUser.charAt(0)}
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-gray-900 text-sm">{targetUser}</h3>
                <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                  <ShieldCheck className="w-3 h-3" />
                  Mahasiswa
                </span>
              </div>
              <p className="text-[11px] text-gray-500 truncate max-w-[200px] sm:max-w-xs">
                Terkait: {itemTitle || 'KawanKampus Chat'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-200/70 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Safety Warning (Section AL & AU) */}
        <div className="px-4 py-2 bg-blue-50/80 border-b border-blue-100 text-[11px] text-blue-900 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-blue-600 flex-shrink-0" />
          <span>
            <strong>Keamanan Kampus:</strong> Selalu bertransaksi melalui platform untuk perlindungan dana dan penanganan pengaduan.
          </span>
        </div>

        {/* Messages List */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50/40">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'me' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'me'
                    ? 'bg-[#2563EB] text-white rounded-tr-xs'
                    : 'bg-white border border-gray-200 text-gray-800 rounded-tl-xs shadow-xs'
                }`}
              >
                {msg.text}
              </div>
              <div className="flex items-center gap-1 mt-1 text-[10px] text-gray-400 px-1">
                <span>{msg.time}</span>
                {msg.sender === 'me' && <CheckCheck className="w-3 h-3 text-blue-600" />}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Question Chips (Section AL) */}
        <div className="px-4 py-2 border-t border-gray-100 bg-white flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          <span className="text-[10px] text-gray-400 font-semibold whitespace-nowrap">Cepat:</span>
          {quickTemplates.map((template, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(template)}
              className="text-[11px] whitespace-nowrap bg-gray-100 hover:bg-blue-50 hover:text-blue-700 text-gray-700 px-2.5 py-1 rounded-full border border-gray-200 transition-colors"
            >
              {template}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-3 border-t border-gray-100 bg-white flex items-center gap-2"
        >
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ketik pesan untuk negosiasi atau tanya barang..."
            className="flex-1 py-2 px-3.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
          />
          <button
            type="submit"
            disabled={!inputMessage.trim()}
            className="p-2.5 bg-[#2563EB] hover:bg-blue-700 disabled:opacity-40 text-white rounded-xl shadow-xs transition-all flex items-center justify-center"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
