import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Search, Eye, Mail, Phone, Calendar, Loader2 } from "lucide-react";
import { getContactMessages, patchContactMessage, deleteContactMessage } from "@/lib/api";

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date: string;
  status: string;
  createdAt?: string;
}

export default function AdminMessages() {
  const { toast } = useToast();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<ContactMessage | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  useEffect(() => {
    loadMessages();
  }, []);

  async function loadMessages() {
    setLoading(true);
    const rows = await getContactMessages();
    setMessages(rows as ContactMessage[]);
    setLoading(false);
  }

  const filtered = messages.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.subject.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase()),
  );

  async function markRead(id: number) {
    await patchContactMessage(id, "Read");
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, status: "Read" } : m)));
    if (selected?.id === id) setSelected((prev) => (prev ? { ...prev, status: "Read" } : null));
  }

  async function handleDelete() {
    if (deleteId === null) return;
    await deleteContactMessage(deleteId);
    setMessages((prev) => prev.filter((m) => m.id !== deleteId));
    if (selected?.id === deleteId) setSelected(null);
    toast({ title: "تم حذف الرسالة" });
    setIsDeleteOpen(false);
  }

  async function openMessage(msg: ContactMessage) {
    setSelected(msg);
    if (msg.status === "Unread") await markRead(msg.id);
  }

  const unreadCount = messages.filter((m) => m.status === "Unread").length;

  return (
    <AdminLayout title="Contact Messages">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <Input
                placeholder="Search messages..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 bg-slate-900 border-slate-700 text-white placeholder:text-slate-500"
              />
            </div>
            {unreadCount > 0 && (
              <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">{unreadCount} Unread</Badge>
            )}
          </div>
          <Button
            size="sm"
            variant="ghost"
            onClick={loadMessages}
            className="text-slate-400 hover:text-white hover:bg-slate-700 gap-2"
            disabled={loading}
          >
            {loading ? <Loader2 size={14} className="animate-spin" /> : null}
            Refresh
          </Button>
        </div>

        <div className="rounded-xl border border-slate-800 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-800/60 text-slate-400 text-left">
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium hidden md:table-cell">Subject / Message</th>
                <th className="px-4 py-3 font-medium hidden lg:table-cell">Date</th>
                <th className="px-4 py-3 font-medium hidden sm:table-cell">Status</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center text-slate-500">
                    <Loader2 size={20} className="animate-spin inline-block mr-2" />
                    Loading...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center text-slate-500">
                    No messages found.
                  </td>
                </tr>
              ) : (
                filtered.map((msg) => (
                  <tr
                    key={msg.id}
                    className={`hover:bg-slate-800/50 transition-colors cursor-pointer ${msg.status === "Unread" ? "bg-slate-900" : "bg-slate-950"}`}
                    onClick={() => openMessage(msg)}
                  >
                    <td className="px-4 py-3">
                      <div className={`font-medium ${msg.status === "Unread" ? "text-white" : "text-slate-400"}`}>
                        {msg.name}
                      </div>
                      <div className="text-slate-500 text-xs mt-0.5">{msg.email}</div>
                    </td>
                    <td className="px-4 py-3 text-slate-300 hidden md:table-cell truncate max-w-xs">
                      {msg.subject || msg.message.slice(0, 60)}
                    </td>
                    <td className="px-4 py-3 text-slate-500 hidden lg:table-cell">{msg.date}</td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <Badge
                        className={
                          msg.status === "Unread"
                            ? "bg-orange-500/20 text-orange-400 border-orange-500/30"
                            : "bg-green-500/20 text-green-400 border-green-500/30"
                        }
                      >
                        {msg.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => openMessage(msg)}
                          className="text-slate-400 hover:text-white hover:bg-slate-700 h-8 w-8 p-0"
                        >
                          <Eye size={14} />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setDeleteId(msg.id);
                            setIsDeleteOpen(true);
                          }}
                          className="text-slate-400 hover:text-red-400 hover:bg-red-500/10 h-8 w-8 p-0"
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-lg">
          <DialogHeader>
            <DialogTitle>Message Details</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-slate-500 text-xs uppercase tracking-wide">From</p>
                  <p className="text-white font-semibold">{selected.name}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-slate-500 text-xs uppercase tracking-wide">Status</p>
                  <Badge
                    className={
                      selected.status === "Unread"
                        ? "bg-orange-500/20 text-orange-400 border-orange-500/30"
                        : "bg-green-500/20 text-green-400 border-green-500/30"
                    }
                  >
                    {selected.status}
                  </Badge>
                </div>
              </div>
              <div className="space-y-2 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <Mail size={14} />
                  <span>{selected.email}</span>
                </div>
                {selected.phone && (
                  <div className="flex items-center gap-2">
                    <Phone size={14} />
                    <span>{selected.phone}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Calendar size={14} />
                  <span>{selected.date}</span>
                </div>
              </div>
              {selected.subject && (
                <div className="space-y-1">
                  <p className="text-slate-500 text-xs uppercase tracking-wide">Subject</p>
                  <p className="text-white font-medium">{selected.subject}</p>
                </div>
              )}
              <div className="space-y-1">
                <p className="text-slate-500 text-xs uppercase tracking-wide">Message</p>
                <p className="text-slate-300 leading-relaxed bg-slate-800 rounded-lg p-3">{selected.message}</p>
              </div>
              {selected.status === "Unread" && (
                <Button
                  onClick={() => markRead(selected.id)}
                  variant="outline"
                  className="w-full border-slate-700 text-slate-300 hover:bg-slate-800"
                >
                  Mark as Read
                </Button>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent className="bg-slate-900 border-slate-700 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Message</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-400">
              Are you sure? This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
}
