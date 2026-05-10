"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { API_ROUTES } from '../../../constant'; // Changed to API_ROUTES
import { Trash2, Plus, ArrowLeft, Loader2, FileText, ExternalLink } from 'lucide-react';

interface Blog {
    _id: string;
    title: string;
    slug: string;
    coverImage: string;
    createdAt: string;
}

export default function ManageBlogs() {
    const router = useRouter();
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const fetchBlogs = async () => {
        try {
            const response = await fetch(API_ROUTES.BLOG_BASE, { // Updated call
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            const result = await response.json();
            if (result.success) setBlogs(result.data);
        } catch (error) {
            console.error("Error fetching blogs:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchBlogs(); }, []);

    const handleDelete = async (id: string) => {
        if (!window.confirm("Are you sure you want to delete this publication?")) return;
        setDeletingId(id);
        try {
            const response = await fetch(`${API_ROUTES.BLOG_BASE}/${id}`, { // Updated call
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            const result = await response.json();
            if (result.success) {
                setBlogs(prev => prev.filter(blog => blog._id !== id));
            }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            alert("Failed to delete blog");
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <div className="p-8 max-w-6xl mx-auto min-h-screen bg-gray-50">
            {/* Header and JSX stay the same */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <button onClick={() => router.back()} className="flex items-center text-sm text-gray-500 hover:text-blue-600 mb-2">
                        <ArrowLeft className="w-4 h-4 mr-1" /> Back to Dashboard
                    </button>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Blog Repository</h1>
                </div>
                <button 
                    onClick={() => router.push('/admins/add-blog')}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2"
                >
                    <Plus className="w-5 h-5" /> Create New Post
                </button>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                    <Loader2 className="w-10 h-10 text-blue-500 animate-spin mb-4" />
                    <p className="text-gray-500 font-medium">Retrieving publications...</p>
                </div>
            ) : blogs.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                    {blogs.map((blog) => (
                        <div key={blog._id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                                    <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 line-clamp-1">{blog.title}</h3>
                                    <span className="text-xs text-gray-400 font-medium">{new Date(blog.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <a href={`/blog/${blog.slug}`} target="_blank" className="p-2 text-gray-400 hover:text-blue-600"><ExternalLink className="w-5 h-5" /></a>
                                <button onClick={() => handleDelete(blog._id)} disabled={deletingId === blog._id} className="p-2 text-gray-400 hover:text-red-600">
                                    {deletingId === blog._id ? <Loader2 className="w-5 h-5 animate-spin" /> : <Trash2 className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20"><FileText className="mx-auto mb-4 text-gray-200" /><h3>No Blogs Yet</h3></div>
            )}
        </div>
    );
}