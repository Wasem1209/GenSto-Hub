"use client";
import { useState, useEffect } from 'react';
import { Clock, Briefcase, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
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

export default function StaffTaskPage() {
    const [tasks, setTasks] = useState<ITask[]>([]);
    const [loading, setLoading] = useState(true);
    // Track which specific task is being updated to show a loader on the button
    const [updatingId, setUpdatingId] = useState<string | null>(null);

    const fetchMyTasks = async () => {
        try {
            const res = await fetch(`${REST_API}/v1/tasks/assigned/me`);
            const data = await res.json();
            setTasks(data.tasks || []);
        } catch (e) { 
            console.error("Fetch Error:", e); 
        } finally { 
            setLoading(false); 
        }
    };

    const markAsDone = async (taskId: string) => {
        setUpdatingId(taskId);
        try {
            const res = await fetch(`${REST_API}/v1/tasks/update-status`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ taskId, status: 'Processed' })
            });
            if (res.ok) await fetchMyTasks();
        } catch (e) { 
            console.error("Update Error:", e); 
        } finally {
            setUpdatingId(null);
        }
    };

    useEffect(() => { fetchMyTasks(); }, []);

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <div className="mb-8">
                <h1 className="text-3xl font-black text-gray-900 italic uppercase tracking-tighter">My Task Box</h1>
                <p className="text-gray-500 font-bold text-sm uppercase">Assigned Operations</p>
            </div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {tasks.map((task) => (
                        <div key={task._id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4 flex flex-col justify-between hover:shadow-md transition-shadow group">
                            <div>
                                <div className="flex justify-between items-start mb-4">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-black border 
                                        ${task.status === 'Processing' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'}`}>
                                        {task.status.toUpperCase()}
                                    </span>
                                    <span className="flex items-center gap-1 text-[10px] font-bold text-gray-400">
                                        <Clock className="w-3 h-3" /> {task.duration}
                                    </span>
                                </div>
                                <h2 className="text-xl font-black text-gray-900 uppercase leading-tight mb-2">{task.title}</h2>
                                <p className="text-gray-500 text-sm font-medium leading-relaxed bg-gray-50 p-4 rounded-2xl group-hover:bg-blue-50/30 transition-colors">
                                    {task.message}
                                </p>
                            </div>

                            <div className="pt-4 space-y-3">
                                <div className="flex items-center gap-2 text-xs font-bold text-gray-400 border-b pb-3 border-gray-50">
                                    <Briefcase className="w-4 h-4 text-blue-500" /> 
                                    ROLE: <span className="text-gray-900 uppercase">{task.position}</span>
                                </div>
                                
                                {task.status === 'Processing' ? (
                                    <button 
                                        onClick={() => markAsDone(task._id)}
                                        disabled={updatingId === task._id}
                                        className="w-full bg-blue-600 text-white font-black py-4 rounded-2xl hover:bg-blue-700 disabled:bg-blue-400 transition-all flex justify-center items-center gap-2 shadow-lg shadow-blue-50"
                                    >
                                        {updatingId === task._id ? <Loader2 className="w-5 h-5 animate-spin" /> : "MARK AS DONE"}
                                    </button>
                                ) : (
                                    <div className="w-full bg-emerald-50 text-emerald-600 font-black py-4 rounded-2xl flex justify-center items-center gap-2 border border-emerald-100">
                                        <CheckCircle2 className="w-5 h-5" /> COMPLETED
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}

                    {tasks.length === 0 && (
                        <div className="col-span-full py-20 flex flex-col items-center justify-center bg-white rounded-3xl border-2 border-dashed border-gray-100">
                            <AlertCircle className="w-12 h-12 text-gray-200 mb-2" />
                            <p className="font-black text-gray-300 uppercase italic">No Pending Tasks Found</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}