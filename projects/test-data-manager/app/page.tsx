"use client"

import { useState, useEffect } from 'react';
import { Database, Plus, Copy, RotateCcw } from 'lucide-react';

export default function Home() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [bulkCount, setBulkCount] = useState(10);
    const [templateType, setTemplateType] = useState('user');
    const [formData, setFormData] = useState({
        scenario: '',
        tags: '',
        payload: '{\n  "key": "value"\n}'
    });

    const handleBulkGenerate = async () => {
        setLoading(true);
        try {
            await fetch('/api/data/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ count: bulkCount, type: templateType })
            });
            fetchData();
        } catch {
            alert('Bulk generation failed');
        }
    };

    const fetchData = async () => {
        setLoading(true);
        const res = await fetch('/api/data');
        const json = await res.json();
        if (json.success) {
            setData(json.data);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const payloadObj = JSON.parse(formData.payload);
            const tagsArray = formData.tags.split(',').map(t => t.trim()).filter(Boolean);

            await fetch('/api/data', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    scenario: formData.scenario,
                    tags: tagsArray,
                    payload: payloadObj
                })
            });

            setFormData({ ...formData, scenario: '', tags: '' });
            fetchData();
        } catch {
            alert('Invalid JSON Payload');
        }
    };

    return (
        <main className="min-h-screen bg-slate-950 text-slate-200 p-8 font-sans">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <header className="flex items-center gap-3 mb-12 border-b border-slate-800 pb-6">
                    <div className="p-3 bg-indigo-500/10 rounded-xl">
                        <Database className="w-8 h-8 text-indigo-400" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                            Test Data Manager
                        </h1>
                        <p className="text-slate-500 mt-1">Centralized mock data repository for QA automation</p>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Form Section */}
                    <div className="lg:col-span-1">
                        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm mb-6">
                            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                <Database className="w-5 h-5 text-indigo-400" />
                                Bulk Generate
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-1">Template</label>
                                    <select
                                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition appearance-none"
                                        value={templateType}
                                        onChange={e => setTemplateType(e.target.value)}
                                    >
                                        <option value="user">👤 User Profiles</option>
                                        <option value="product">📦 E-commerce Products</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-1">Count</label>
                                    <input
                                        type="number"
                                        min="1"
                                        max="1000"
                                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                                        value={bulkCount}
                                        onChange={e => setBulkCount(parseInt(e.target.value))}
                                    />
                                </div>
                                <button
                                    onClick={handleBulkGenerate}
                                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2 rounded-xl transition shadow-lg shadow-emerald-900/20 active:scale-95 flex items-center justify-center gap-2"
                                >
                                    Generate via Faker.js
                                </button>
                            </div>
                        </div>

                        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
                            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                                <Plus className="w-5 h-5 text-emerald-400" />
                                Manual Creation
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-1">Scenario Name</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                                        placeholder="e.g. Broken User Cart"
                                        value={formData.scenario}
                                        onChange={e => setFormData({ ...formData, scenario: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-1">Tags (comma separated)</label>
                                    <input
                                        type="text"
                                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                                        placeholder="e.g. e2e, regression, manual"
                                        value={formData.tags}
                                        onChange={e => setFormData({ ...formData, tags: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-1">JSON Payload</label>
                                    <textarea
                                        required
                                        rows={8}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 font-mono text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                                        value={formData.payload}
                                        onChange={e => setFormData({ ...formData, payload: e.target.value })}
                                    />
                                </div>

                                <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 rounded-xl transition shadow-lg shadow-indigo-900/20 active:scale-95">
                                    Save Data
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* List Section */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold">Live Data Feed</h2>
                            <button onClick={fetchData} className="p-2 hover:bg-slate-800 rounded-lg transition text-slate-400">
                                <RotateCcw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            {data.map((item) => (
                                <div key={item._id} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition group">
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <h3 className="text-lg font-medium text-white mb-1 group-hover:text-indigo-400 transition-colors">
                                                {item.scenario}
                                            </h3>
                                            <div className="flex gap-2">
                                                {item.tags.map((tag: string, i: number) => (
                                                    <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                                                        #{tag}
                                                    </span>
                                                ))}
                                                <span className="text-xs text-slate-600 py-0.5">
                                                    {new Date(item.createdAt).toLocaleString()}
                                                </span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => navigator.clipboard.writeText(JSON.stringify(item.payload))}
                                            className="p-2 bg-slate-950 rounded-lg border border-slate-800 text-slate-400 hover:text-white hover:border-slate-600 transition"
                                            title="Copy JSON"
                                        >
                                            <Copy className="w-4 h-4" />
                                        </button>
                                    </div>

                                    <div className="bg-slate-950 rounded-xl p-4 border border-slate-900/50 overflow-x-auto">
                                        <pre className="text-xs text-emerald-400 font-mono">
                                            {JSON.stringify(item.payload, null, 2)}
                                        </pre>
                                    </div>
                                </div>
                            ))}

                            {data.length === 0 && !loading && (
                                <div className="text-center py-20 text-slate-600 border-2 border-dashed border-slate-800 rounded-3xl">
                                    No test data found. Create one!
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}
