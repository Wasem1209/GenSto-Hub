"use client";
import { useState, useEffect, ComponentProps } from 'react'; 
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { ArrowLeft, Upload, Loader2, CheckCircle2, X } from 'lucide-react';
import { API_ROUTES } from '../../../constant'; 
import 'react-quill/dist/quill.snow.css';

import type ReactQuillType from 'react-quill';


const ReactQuill = dynamic<ComponentProps<typeof ReactQuillType>>(
  async () => {
    const { default: RQ } = await import('react-quill');
    return function QuillComponent(props) {
      return <RQ {...props} />;
    };
  },
  { 
    ssr: false,
    loading: () => <div className="h-64 bg-gray-100 animate-pulse rounded-xl" />
  }
);

const modules = {
    toolbar: [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        ['link', 'blockquote', 'code-block'],
        ['clean']
    ],
};



export default function AddBlog() {
   
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [coverImage, setCoverImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    useEffect(() => {
        if (!coverImage) {
            setPreviewUrl(null);
            return;
        }
        const objectUrl = URL.createObjectURL(coverImage);
        setPreviewUrl(objectUrl);
        return () => URL.revokeObjectURL(objectUrl);
    }, [coverImage]);

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
            const token = localStorage.getItem('token');
            const response = await fetch(API_ROUTES.BLOG_PUBLISH, { 
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
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
            alert(error instanceof Error ? error.message : "Failed to publish blog.");
        } finally {
            setLoading(false);
        }
    };

    if (status === 'success') {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-white">
                <div className="bg-emerald-50 p-6 rounded-full mb-4">
                    <CheckCircle2 className="w-20 h-20 text-emerald-500 animate-bounce" />
                </div>
                <h1 className="text-3xl font-black text-gray-900">Publication Live!</h1>
                <p className="text-gray-500 mt-2">Redirecting to repository...</p>
            </div>
        );
    }

    return (
        <div className="p-8 max-w-5xl mx-auto min-h-screen bg-gray-50">
            <button 
                onClick={() => router.back()} 
                className="flex items-center text-sm font-bold text-gray-500 hover:text-blue-600 mb-6 transition-colors group"
            >
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> 
                Back to Repository
            </button>

            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-gray-200/50 border border-gray-100">
                <header className="mb-10">
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight">Write Publication</h1>
                    <p className="text-gray-500 text-lg mt-2">Create engaging content for the INANST community.</p>
                </header>

                <form onSubmit={handlePublish} className="space-y-8">
                    <div className="space-y-2">
                        <label className="block text-xs font-black text-gray-400 uppercase tracking-[0.2em]">
                            Blog Title
                        </label>
                        <input 
                            type="text" 
                            required
                            value={title}
                            placeholder="Enter a catchy title..." 
                            className="w-full p-5 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-blue-500 focus:bg-white outline-none transition-all font-bold text-xl text-gray-800"
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-xs font-black text-gray-400 uppercase tracking-[0.2em]">
                            Cover Image (S3 Storage)
                        </label>
                        <div className="relative group">
                            {previewUrl ? (
                                <div className="relative h-64 w-full rounded-2xl overflow-hidden border-2 border-gray-100">
                                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                                    <button 
                                        type="button"
                                        onClick={() => setCoverImage(null)}
                                        className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full hover:scale-110 transition-transform"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <input 
                                        type="file" 
                                        accept="image/*"
                                        required
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                        onChange={(e) => setCoverImage(e.target.files?.[0] || null)}
                                    />
                                    <div className="p-12 border-2 border-dashed border-gray-200 bg-gray-50 rounded-2xl flex flex-col items-center justify-center transition-all group-hover:border-blue-400 group-hover:bg-blue-50/30">
                                        <div className="bg-white p-4 rounded-full shadow-sm mb-4">
                                            <Upload className="w-8 h-8 text-blue-500" />
                                        </div>
                                        <p className="text-base font-bold text-gray-600">
                                            Click to upload cover photo
                                        </p>
                                        <p className="text-xs text-gray-400 mt-2 font-medium">High resolution JPG or PNG recommended</p>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-xs font-black text-gray-400 uppercase tracking-[0.2em]">
                            Content Body
                        </label>
                        <div className="bg-white rounded-2xl overflow-hidden border-2 border-gray-50 min-h-[450px] focus-within:border-blue-500 transition-all">
                            <ReactQuill 
                                theme="snow" 
                                modules={modules}
                                value={content} 
                                onChange={setContent}
                                className="h-[380px]"
                                placeholder="Start typing your story here..."
                            />
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white p-6 rounded-[1.5rem] font-black text-xl shadow-xl shadow-blue-200 transition-all active:scale-[0.98] flex items-center justify-center gap-3"
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