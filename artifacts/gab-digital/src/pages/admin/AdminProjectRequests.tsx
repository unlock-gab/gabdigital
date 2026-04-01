import { useState } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { mockProjectRequests, type ProjectRequest } from "@/lib/adminData";
import { Trash2, Search, Eye, Mail, Phone, Calendar, Globe, CheckCircle } from "lucide-react";

export default function AdminProjectRequests() {
  const { toast } = useToast();
  const [requests, setRequests] = useLocalStorage<ProjectRequest[]>('admin_project_requests', mockProjectRequests);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<ProjectRequest | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const filtered = requests.filter(r => r.fullName.toLowerCase().includes(search.toLowerCase()) || r.requestedService.toLowerCase().includes(search.toLowerCase()) || r.email.toLowerCase().includes(search.toLowerCase()));

  function markReviewed(id: number) {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: "Reviewed" as const } : r));
    if (selected?.id === id) setSelected(prev => prev ? { ...prev, status: "Reviewed" } : null);
    toast({ title: "Marked as reviewed" });
  }

  function handleDelete() {
    if (deleteId === null) return;
    setRequests(prev => prev.filter(r => r.id !== deleteId));
    if (selected?.id === deleteId) setSelected(null);
    toast({ title: "Request deleted" });
    setIsDeleteOpen(false);
  }

  const newCount = requests.filter(r => r.status === "New").length;

  return (
    <AdminLayout title="Project Requests">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <Input placeholder="Search requests..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 bg-slate-900 border-slate-700 text-white placeholder:text-slate-500" />
            </div>
            {newCount > 0 && <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">{newCount} New</Badge>}
          </div>
        </div>

        <div className="rounded-xl border border-slate-800 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-800/60 text-slate-400 text-left">
                <th className="px-4 py-3 font-medium">Client</th>
                <th className="px-4 py-3 font-medium hidden md:table-cell">Service</th>
                <th className="px-4 py-3 font-medium hidden lg:table-cell">Budget</th>
                <th className="px-4 py-3 font-medium hidden sm:table-cell">Status</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filtered.length === 0 ? (
                <tr><td colSpan={5} className="px-4 py-12 text-center text-slate-500">No requests found.</td></tr>
              ) : filtered.map(req => (
                <tr key={req.id} className={`hover:bg-slate-800/50 transition-colors cursor-pointer ${req.status === "New" ? "bg-slate-900" : "bg-slate-950"}`} onClick={() => setSelected(req)}>
                  <td className="px-4 py-3">
                    <div className={`font-medium ${req.status === "New" ? "text-white" : "text-slate-400"}`}>{req.fullName}</div>
                    <div className="text-slate-500 text-xs mt-0.5">{req.businessType}</div>
                  </td>
                  <td className="px-4 py-3 text-slate-300 hidden md:table-cell">{req.requestedService}</td>
                  <td className="px-4 py-3 text-slate-400 hidden lg:table-cell text-xs">{req.budget}</td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <Badge className={req.status === "New" ? "bg-orange-500/20 text-orange-400 border-orange-500/30" : "bg-green-500/20 text-green-400 border-green-500/30"}>{req.status}</Badge>
                  </td>
                  <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-2">
                      <Button size="sm" variant="ghost" onClick={() => setSelected(req)} className="text-slate-400 hover:text-white hover:bg-slate-700 h-8 w-8 p-0"><Eye size={14} /></Button>
                      <Button size="sm" variant="ghost" onClick={() => { setDeleteId(req.id); setIsDeleteOpen(true); }} className="text-slate-400 hover:text-red-400 hover:bg-red-500/10 h-8 w-8 p-0"><Trash2 size={14} /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>Project Request Details</DialogTitle></DialogHeader>
          {selected && (
            <div className="space-y-4 text-sm">
              <div className="flex items-center justify-between">
                <p className="text-white font-bold text-base">{selected.fullName}</p>
                <Badge className={selected.status === "New" ? "bg-orange-500/20 text-orange-400 border-orange-500/30" : "bg-green-500/20 text-green-400 border-green-500/30"}>{selected.status}</Badge>
              </div>
              <div className="space-y-2 text-slate-400">
                <div className="flex items-center gap-2"><Mail size={14} /><span>{selected.email}</span></div>
                <div className="flex items-center gap-2"><Phone size={14} /><span>{selected.phone}</span></div>
                <div className="flex items-center gap-2"><Calendar size={14} /><span>Submitted: {selected.date}</span></div>
                {selected.websiteLink && <div className="flex items-center gap-2"><Globe size={14} /><a href={selected.websiteLink} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline truncate">{selected.websiteLink}</a></div>}
              </div>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div><p className="text-slate-500 text-xs uppercase tracking-wide mb-1">Business Type</p><p className="text-white">{selected.businessType}</p></div>
                <div><p className="text-slate-500 text-xs uppercase tracking-wide mb-1">Requested Service</p><p className="text-white">{selected.requestedService}</p></div>
                <div><p className="text-slate-500 text-xs uppercase tracking-wide mb-1">Budget</p><p className="text-orange-400 font-medium">{selected.budget}</p></div>
                <div><p className="text-slate-500 text-xs uppercase tracking-wide mb-1">Preferred Start</p><p className="text-white">{selected.preferredStartDate}</p></div>
              </div>
              <div><p className="text-slate-500 text-xs uppercase tracking-wide mb-1">Project Description</p><p className="text-slate-300 leading-relaxed bg-slate-800 rounded-lg p-3">{selected.description}</p></div>
              {selected.status === "New" && (
                <Button onClick={() => markReviewed(selected.id)} className="w-full bg-green-600 hover:bg-green-700 text-white gap-2"><CheckCircle size={16} /> Mark as Reviewed</Button>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent className="bg-slate-900 border-slate-700 text-white">
          <AlertDialogHeader><AlertDialogTitle>Delete Request</AlertDialogTitle><AlertDialogDescription className="text-slate-400">Are you sure? This cannot be undone.</AlertDialogDescription></AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
}
