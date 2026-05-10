"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { ArrowLeft, Upload, Loader2, CheckCircle2 } from 'lucide-react';
import { API_ROUTES } from '../../../constant'; 
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { 
    ssr: false,
    loading: () => <div className="h-64 bg-gray-100 animate-pulse rounded-xl" />
});

export default function AddBlog() {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [coverImage, setCoverImage] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handlePublish = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !content || !coverImage) {
            alert("Please fill all fields and upload a cover image.");
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('coverImage', coverImage); 

        try {
            
            const response = await fetch(API_ROUTES.BLOG_PUBLISH, { 
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: formData 
            });

            const result = await response.json();

            if (result.success) {
                setStatus('success');
                setTimeout(() => router.push('/admins/manage-blogs'), 2000);
            } else {
                throw new Error(result.message || "Failed to publish");
            }
        } catch (error) {
            console.error("Publishing error:", error);
            setStatus('error');
            alert("Failed to publish blog. Check console for details.");
        } finally {
            setLoading(false);
        }
    };

    if (status === 'success') {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-white">
                <CheckCircle2 className="w-20 h-20 text-emerald-500 mb-4 animate-bounce" />
                <h1 className="text-2xl font-black text-gray-900">Publication Live!</h1>
                <p className="text-gray-500">Redirecting to repository...</p>
            </div>
        );
    }

    return (
        <div className="p-8 max-w-5xl mx-auto min-h-screen bg-gray-50">
            <button 
                onClick={() => router.back()} 
                className="flex items-center text-sm text-gray-500 hover:text-blue-600 mb-6 transition-colors"
            >
                <ArrowLeft className="w-4 h-4 mr-1" /> Back to Repository
            </button>

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                <header className="mb-8">
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Write Publication</h1>
                    <p className="text-gray-500">Create engaging content for the INANST community.</p>
                </header>

                <form onSubmit={handlePublish} className="space-y-6">
                    {/* Title Input */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">
                            Blog Title
                        </label>
                        <input 
                            type="text" 
                            required
                            placeholder="Enter a catchy title..." 
                            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium text-lg"
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    {/* Image Upload Area */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">
                            Cover Image (S3 Storage)
                        </label>
                        <div className="relative group">
                            <input 
                                type="file" 
                                accept="image/*"
                                required
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                onChange={(e) => setCoverImage(e.target.files?.[0] || null)}
                            />
                            <div className={`p-8 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center transition-all ${
                                coverImage ? 'border-emerald-400 bg-emerald-50' : 'border-gray-200 bg-gray-50 group-hover:border-blue-400'
                            }`}>
                                <Upload className={`w-8 h-8 mb-2 ${coverImage ? 'text-emerald-500' : 'text-gray-400'}`} />
                                <p className="text-sm font-bold text-gray-600">
                                    {coverImage ? coverImage.name : "Click to upload cover photo"}
                                </p>
                                <p className="text-xs text-gray-400 mt-1">High resolution JPG or PNG recommended</p>
                            </div>
                        </div>
                    </div>

                    {/* Rich Text Editor */}
                    <div className="space-y-2">
                        <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider">
                            Content Body
                        </label>
                        <div className="bg-white rounded-xl overflow-hidden border border-gray-200 min-h-[400px]">
                            <ReactQuill 
                                theme="snow" 
                                value={content} 
                                onChange={setContent}
                                className="h-[350px]"
                                placeholder="Start typing your story here..."
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white p-5 rounded-2xl font-black text-lg shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-3"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-6 h-6 animate-spin" />
                                Transmitting to S3...
                            </>
                        ) : (
                            "Launch Publication"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}