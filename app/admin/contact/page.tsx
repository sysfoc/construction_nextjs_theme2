"use client";
import { useState, useEffect } from "react";
import { Trash2, Mail } from "lucide-react";

interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  message: string;
  status: "pending" | "replied";
  createdAt: string;
}

export default function ContactManagement() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [filteredMessages, setFilteredMessages] = useState<ContactMessage[]>(
    []
  );
  const [activeTab, setActiveTab] = useState<"all" | "pending" | "replied">(
    "all"
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    filterMessages();
  }, [messages, activeTab, searchTerm]);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/contact");
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterMessages = () => {
    let filtered = messages;

    if (activeTab !== "all") {
      filtered = filtered.filter((msg) => msg.status === activeTab);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (msg) =>
          msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          msg.message.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredMessages(filtered);
  };

  const handleStatusChange = async (
    id: string,
    newStatus: "pending" | "replied"
  ) => {
    try {
      const response = await fetch(`/api/contact/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        setMessages(
          messages.map((msg) =>
            msg._id === id ? { ...msg, status: newStatus } : msg
          )
        );
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;

    try {
      const response = await fetch(`/api/contact/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setMessages(messages.filter((msg) => msg._id !== id));
      }
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <main className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-start sm:gap-3">
          <h1 className="text-2xl font-semibold mb-1">Contact Messages</h1>
          <p className="text-sm text-gray-600">
            Click on any email address to compose a reply.
          </p>
        </div>
        {/* Search Bar */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by name, email, or message..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff6600]"
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-3 mb-4 border-b border-gray-200">
          {["all", "pending", "replied"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as "all" | "pending" | "replied")}
              className={`px-3 py-1.5 text-sm font-medium capitalize transition-colors ${
                activeTab === tab
                  ? "text-[#ff6600] border-b-2 border-[#ff6600]"
                  : "text-paragraph"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Messages List */}
        {loading ? (
          <div className="text-center py-6 text-sm text-gray-500">
            Loading...
          </div>
        ) : filteredMessages.length === 0 ? (
          <div className="text-center py-6 text-sm text-gray-500">
            No messages found
          </div>
        ) : (
          <div className="space-y-3">
            {filteredMessages.map((msg) => (
              <div
                key={msg._id}
                className="border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <h3 className="font-semibold text-base">{msg.name}</h3>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          msg.status === "replied"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {msg.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 mb-2">
                      <a
                        href={`mailto:${msg.email}`}
                        className="flex items-center gap-1 text-sm text-[#ff6600] hover:underline"
                      >
                        <Mail size={14} />
                        {msg.email}
                      </a>
                    </div>

                    <p className="text-sm text-gray-700 mb-2 whitespace-pre-wrap">
                      {msg.message}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatDate(msg.createdAt)}
                    </p>
                  </div>

                  <div className="flex flex-col gap-1.5 flex-shrink-0">
                    <button
                      onClick={() =>
                        handleStatusChange(
                          msg._id,
                          msg.status === "pending" ? "replied" : "pending"
                        )
                      }
                      className="px-2.5 py-1 bg-[var(--primary)] text-[var(--primary-foreground)] rounded text-xs hover:opacity-90 transition-opacity whitespace-nowrap"
                    >
                      Mark {msg.status === "pending" ? "Replied" : "Pending"}
                    </button>
                    <button
                      onClick={() => handleDelete(msg._id)}
                      className="px-2.5 py-1 bg-red-500 text-white rounded text-xs hover:opacity-90 transition-opacity flex items-center justify-center gap-1"
                    >
                      <Trash2 size={14} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
