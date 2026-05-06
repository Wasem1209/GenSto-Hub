"use client";
import { useState, useEffect } from 'react';
import { Send, User, Briefcase, CheckCircle2, Loader2, Trash2 } from 'lucide-react';
import { REST_API } from '../../../constant';

interface ITask {
    _id: string;
    title: string;
    message: string;
    workerId: string;
    position: string;
    duration: string;
    status: 'Processing' | 'Processed';
}

export default function AdminTaskPage() {
    const [tasks, setTasks] = useState<ITask[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    
    const [formData, setFormData] = useState({
        title: '',
        workerId: '', 
        position: '',
        duration: '',
        message: ''
    });

    const fetchTasks = async () => {
        try {
            const res = await fetch(`${REST_API}/v1/tasks/all`);
            const data = await res.json();
            setTasks(data.tasks || []);
        } catch (e) { 
            console.error("Fetch Tasks Error:", e); 
        } finally { 
            setLoading(false); 
        }
    };

    useEffect(() => { fetchTasks(); }, []);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const res = await fetch(`${REST_API}/v1/tasks/create`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                setFormData({ title: '', workerId: '', position: '', duration: '', message: '' });
                fetchTasks();
            }
        } catch (e) {
            console.error("Send Task Error:", e);
        } finally { 
            setSubmitting(false); 
        }
    };

    const deleteTask = async (taskId: string) => {
        if (!confirm("Are you sure you want to permanently delete this task?")) return;
        
        try {
            const res = await fetch(`${REST_API}/v1/tasks/delete/${taskId}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                fetchTasks();
            } else {
                const error = await res.json();
                console.error("Delete failed:", error.message);
            }
        } catch (e) {
            console.error("Delete Task Error:", e);
        }
    };

    return (
        <div className="p-8 bg-white min-h-screen">
            <div className="mb-8">
                <h1 className="text-3xl font-black text-gray-900 italic tracking-tighter">TASK CENTER</h1>
                <p className="text-gray-500 font-bold text-sm uppercase">System Authority: Dispatch & Monitor</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Dispatch Form */}
                <form onSubmit={handleSend} className="lg:col-span-4 bg-gray-50 p-6 rounded-3xl border border-gray-100 space-y-4 h-fit">
                    <h2 className="font-black text-gray-800 flex items-center gap-2 mb-2 uppercase">
                        <Send className="w-5 h-5 text-blue-600" /> Dispatch Task
                    </h2>
                    <input 
                        required 
                        className="w-full p-4 rounded-2xl bg-white border border-gray-200 outline-none focus:border-blue-500 transition-all font-medium" 
                        placeholder="Task Headline" 
                        value={formData.title} 
                        onChange={e => setFormData({...formData, title: e.target.value})} 
                    />
                    <div className="flex gap-2">
                        <input 
                            required 
                            className="w-1/2 p-4 rounded-2xl bg-white border border-gray-200 outline-none" 
                            placeholder="Staff ID" 
                            value={formData.workerId} 
                            onChange={e => setFormData({...formData, workerId: e.target.value})} 
                        />
                        <input 
                            required 
                            className="w-1/2 p-4 rounded-2xl bg-white border border-gray-200 outline-none" 
                            placeholder="Position" 
                            value={formData.position} 
                            onChange={e => setFormData({...formData, position: e.target.value})} 
                        />
                    </div>
                    <input 
                        required 
                        className="w-full p-4 rounded-2xl bg-white border border-gray-200 outline-none" 
                        placeholder="Timeframe (e.g. 12 Hours)" 
                        value={formData.duration} 
                        onChange={e => setFormData({...formData, duration: e.target.value})} 
                    />
                    <textarea 
                        required 
                        className="w-full p-4 h-32 rounded-2xl bg-white border border-gray-200 outline-none resize-none" 
                        placeholder="Detailed instructions..." 
                        value={formData.message} 
                        onChange={e => setFormData({...formData, message: e.target.value})} 
                    />
                    <button 
                        disabled={submitting} 
                        className="w-full bg-blue-600 text-white font-black py-4 rounded-2xl hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all flex justify-center items-center gap-2"
                    >
                        {submitting ? <Loader2 className="animate-spin" /> : "RELEASE TASK"}
                    </button>
                </form>

                {/* Live Monitor */}
                <div className="lg:col-span-8 space-y-4">
                    <div className="flex justify-between items-center px-2">
                        <h2 className="font-black text-gray-800 uppercase tracking-widest text-sm">Real-Time Monitor</h2>
                        <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase">Live Sync</span>
                    </div>
                    
                    <div className="space-y-3">
                        {loading ? (
                            <div className="flex justify-center py-10"><Loader2 className="animate-spin text-gray-200" /></div>
                        ) : tasks.length === 0 ? (
                            <div className="text-center py-10 border-2 border-dashed border-gray-100 rounded-3xl">
                                <p className="text-gray-400 font-bold uppercase text-xs">No tasks currently dispatched</p>
                            </div>
                        ) : tasks.map((task) => ( 
                            <div key={task._id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-blue-100 transition-colors group">
                                <div className="space-y-1">
                                    <h3 className="font-black text-gray-900 text-lg uppercase leading-tight">{task.title}</h3>
                                    <div className="flex gap-3 text-[10px] font-bold text-gray-400">
                                        <span className="flex items-center gap-1 uppercase"><User className="w-3 h-3 text-blue-500" /> {task.workerId}</span>
                                        <span className="flex items-center gap-1 uppercase"><Briefcase className="w-3 h-3 text-blue-500" /> {task.position}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 w-full md:w-auto border-t md:border-t-0 pt-3 md:pt-0">
                                    <div className="text-right hidden md:block">
                                        <p className="text-[10px] font-black text-gray-400 uppercase">Deadline</p>
                                        <p className="text-xs font-bold text-gray-700">{task.duration}</p>
                                    </div>
                                    
                                    <div className={`px-6 py-2 rounded-xl text-[11px] font-black tracking-tighter flex items-center gap-2 border 
                                        ${task.status === 'Processing' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'}`}>
                                        {task.status === 'Processing' ? <Loader2 className="w-3 h-3 animate-spin" /> : <CheckCircle2 className="w-3 h-3" />}
                                        {task.status.toUpperCase()}
                                    </div>

                                    <button 
                                        onClick={() => deleteTask(task._id)}
                                        className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                        title="Delete Task"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}