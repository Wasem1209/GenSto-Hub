export default function AdminPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Command Center</h1>
            <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-gray-900 text-white rounded-lg">
                    <p className="text-xs uppercase opacity-50 font-bold">Total Revenue</p>
                    <p className="text-2xl font-bold">$42,300</p>
                </div>
                <div className="p-4 bg-blue-700 text-white rounded-lg">
                    <p className="text-xs uppercase opacity-50 font-bold">Promotions Pending</p>
                    <p className="text-2xl font-bold">4</p>
                </div>
            </div>
        </div>
    );
}