'use client'

import { useEffect, useState } from 'react'
import { Plus, Search, Eye, Trash2, Filter, X } from 'lucide-react'
import DeleteModal from '../components/deleteModal'
import Sidebar from '../components/sidebar'
import Navbar from '../components/navbar'
import SalesTable from '../components/table/salesTable'
import AddSaleCard from '../components/addSaleCard'
import { getSales } from '../services/salesService'

export default function SalesPage() {
  const [sales, setSales] = useState([])

  const [searchQuery, setSearchQuery] = useState('')
  const [dateRange, setDateRange] = useState({ from: '', to: '' })
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedSale, setSelectedSale] = useState(null)
  
  // const totalSales = sales.reduce((sum, sale) => sum + parseInt(sale.totalAmount), 0)

  useEffect(()=>{
    const getAllSales = async () => {
      const sales=await getSales()
      setSales(sales.result)
    }

    getAllSales()
  }, [])

  const handleDeleteClick = (sale) => {
    setSelectedSale(sale)
    setIsDeleteModalOpen(true)
  }

  const handleDeleteConfirm = () => {
    setSales(sales.filter((s) => s.id !== selectedSale.id))
    setIsDeleteModalOpen(false)
    setSelectedSale(null)
  }

  const handleClearFilters = () => {
    setSearchQuery('')
    setDateRange({ from: '', to: '' })
  }

  const handleAddSales = (sale) => {
    console.log(sale)
    setSales([...sales, sale])
  }

  return (
    <div className="bg-slate-950">
        <Sidebar/>
        <Navbar/>
        <div className="md:ml-64 md:pt-16 pb-8">
        <div className="p-6">
            {/* Header */}
            <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Sales Management</h1>
            <p className="text-slate-400">Record and manage product sales</p>
            </div>

            {/* Sales Summary Card */}
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-600/10 border border-blue-500/20 rounded-lg p-6 mb-8">
            <div className="flex items-center justify-between">
                <div>
                <p className="text-slate-400 text-sm mb-1">Today's Sales Total</p>
                <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                    {/* ${totalSales.toFixed(2)} */}
                </p>
                </div>
                <div className="text-right">
                <p className="text-slate-400 text-sm mb-1">Total Transactions</p>
                <p className="text-3xl font-bold text-slate-200">{sales.length}</p>
                </div>
            </div>
            </div>

            {/* Add Sale Form Card */}
            <AddSaleCard onsuccess={handleAddSales}/>

            {/* Search and Filters */}
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Search Input */}
                <div className="md:col-span-2 relative">
                <Search size={18} className="absolute left-3 top-3 text-slate-400" />
                <input
                    type="text"
                    placeholder="Search by product or customer..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
                />
                </div>

                {/* Date Range */}
                <div>
                <input
                    type="date"
                    value={dateRange.from}
                    onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="From"
                />
                </div>

                <div>
                <input
                    type="date"
                    value={dateRange.to}
                    onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="To"
                />
                </div>
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-3 mt-4">
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/50 rounded-lg transition-colors text-sm font-medium">
                <Filter size={16} />
                Apply Filters
                </button>
                {(searchQuery || dateRange.from || dateRange.to) && (
                <button
                    onClick={handleClearFilters}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg transition-colors text-sm font-medium"
                >
                    <X size={16} />
                    Clear Filters
                </button>
                )}
            </div>
            </div>

            {/* Sales Table */}
            <SalesTable sales={sales} handleDeleteClick={handleDeleteClick}/>
        </div>

        {/* Delete Modal */}
        {isDeleteModalOpen && selectedSale && (
            <DeleteModal
            itemName={`Sale - ${selectedSale.productName}`}
            onConfirm={handleDeleteConfirm}
            onCancel={() => setIsDeleteModalOpen(false)}
            />
        )}
        </div>
    </div>
  )
}
