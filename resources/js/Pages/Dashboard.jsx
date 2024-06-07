import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import '../../css/card.css';

export default function Dashboard({ auth }) {
    // Dummy data for demonstration
    const orders = 150;
    const itemCount = 300;
    
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Hello</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {/* Card for date */}
                        <div className="card">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Date</h3>
                            <p className="text-gray-600">{new Date().toLocaleDateString()}</p>
                        </div>

                        {/* Card for total orders */}
                        <div className="card">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Orders</h3>
                            <p className="text-gray-600">{orders}</p>
                        </div>

                        {/* Card for total item count */}
                        <div className="card">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Item Count</h3>
                            <p className="text-gray-600">{itemCount}</p>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
