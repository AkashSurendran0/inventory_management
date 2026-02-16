'use client'

import { useEffect, useState } from 'react'
import { Printer, Download, Mail, ChevronDown, TrendingUp, Package, ShoppingCart, AlertCircle, User } from 'lucide-react'
import Sidebar from '../components/sidebar'
import Navbar from '../components/navbar'
import SalesReportTable from '../components/table/salesReportTable'
import ExportButtons from '../components/ui/exportButtons'
import ItemsTable from '../components/table/itemsTable'
import LedgerTable from '../components/table/ledgerTable'
import { getAllCustomers } from '../services/customerService'
import { getAllProducts } from '../services/inventoryService'
import { getSales } from '../services/salesService'

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState('sales')
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [selectedProduct, setSelectedProduct] = useState('all')
  const [selectedCustomer, setSelectedCustomer] = useState('all')
  const [selectedCustomerLedger, setSelectedCustomerLedger] = useState('')

  const [allCustomers, setAllCustomers] = useState([])
  const [allProducts, setAllProducts] = useState([])
  const [allSales, setAllSales] = useState([])

  useEffect(() => {
    const getCustomers = async () => {
        const customers = await getAllCustomers('')
        setAllCustomers(customers.result)
    }

    const fetchProducts = async () => {
        const products=await getAllProducts('')
        setAllProducts(products.result)
    }

    const getAllSales = async () => {
        const sales=await getSales()
        setAllSales(sales.result)
    }
    
    getAllSales()
    fetchProducts()
    getCustomers()
  }, [])

  const filteredSalesData = allSales.filter((sale) => {
    const saleDate = new Date(sale.date)
    const from = fromDate? new Date(fromDate) : null
    const to = toDate? new Date(toDate) : null
    const matchesFrom = !from || saleDate>=from
    const matchesTo = !to || saleDate<=to
    const productMatch = selectedProduct === 'all' || sale.productName === selectedProduct
    const customerMatch = selectedCustomer === 'all' || sale.customerName === selectedCustomer
    return matchesFrom && matchesTo && productMatch && customerMatch
  })

  let allProductsTotal=0
  allProducts.forEach(product => {
    const total=product.quantity * product.price
    allProductsTotal+=total
  })

  let customerLedgerData=null
  let customerName=null
  if(selectedCustomerLedger){
    const customer=allCustomers.find(customer => customer._id == selectedCustomerLedger)
    // setSelectedCustomer(customer.name)
    customerName=customer.name
    customerLedgerData=allSales.filter(sale => sale.customerName == customer.name)
  }
  const totalPurchased = customerLedgerData && customerLedgerData.reduce((sum, item) => sum + item.totalAmount, 0)

  const handleFilter = () => {
    // Filter is applied dynamically
  }

  const handleClearFilter = () => {
    setFromDate('')
    setToDate('')
    setSelectedProduct('all')
    setSelectedCustomer('all')
  }

  const handleExport = (format) => {
    console.log(`[v0] Exporting as ${format}`)
    // Export functionality would be implemented here
  }

  return (
    <div className="bg-slate-950">
        <Sidebar/>
        <Navbar/>
        <div className="md:ml-64 md:pt-16 min-h-screen p-4 md:p-8">
        {/* Page Title */}
        <div className="mb-8 mt-8 md:mt-5">
            <h1 className="text-3xl font-bold text-white mb-2">Reports</h1>
            <p className="text-slate-400">View and export detailed business reports</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-8 border-b border-slate-700">
            <button
            onClick={() => setActiveTab('sales')}
            className={`px-4 py-3 font-medium border-b-2 transition-colors duration-200 ${
                activeTab === 'sales'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-slate-400 hover:text-slate-300'
            }`}
            >
            Sales Report
            </button>
            <button
            onClick={() => setActiveTab('items')}
            className={`px-4 py-3 font-medium border-b-2 transition-colors duration-200 ${
                activeTab === 'items'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-slate-400 hover:text-slate-300'
            }`}
            >
            Item Report
            </button>
            <button
            onClick={() => setActiveTab('ledger')}
            className={`px-4 py-3 font-medium border-b-2 transition-colors duration-200 ${
                activeTab === 'ledger'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-slate-400 hover:text-slate-300'
            }`}
            >
            Customer Ledger
            </button>
        </div>

        {/* Sales Report Tab */}
        {activeTab === 'sales' && (
            <div>
            {/* Filter Section */}
            <div className="bg-slate-900 rounded-lg p-6 mb-6 border border-slate-800">
                <h3 className="text-lg font-semibold text-white mb-4">Filters</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                {/* From Date */}
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">From Date</label>
                    <input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    />
                </div>

                {/* To Date */}
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">To Date</label>
                    <input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    />
                </div>

                {/* Product Dropdown */}
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Product</label>
                    <select
                    value={selectedProduct}
                    onChange={(e) => setSelectedProduct(e.target.value)}
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    >
                    <option value="all">All Products</option>
                    {allProducts.map((product) => (
                        <option key={product.id} value={product.name}>
                        {product.name}
                        </option>
                    ))}
                    </select>
                </div>

                {/* Customer Dropdown */}
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Customer</label>
                    <select
                    value={selectedCustomer}
                    onChange={(e) => setSelectedCustomer(e.target.value)}
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    >
                    <option value="all">All Customers</option>
                    {allCustomers.map((customer) => (
                        <option key={customer.id} value={customer.name}>
                        {customer.name}
                        </option>
                    ))}
                    </select>
                </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                <button
                    onClick={handleFilter}
                    className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
                >
                    Filter
                </button>
                <button
                    onClick={handleClearFilter}
                    className="px-6 py-2 bg-slate-800 text-white rounded-lg font-medium hover:bg-slate-700 transition-colors duration-200"
                >
                    Clear
                </button>
                </div>
            </div>

            {/* Export Buttons */}
            <ExportButtons handleExport={handleExport} />

            {/* Sales Table */}
            <SalesReportTable  filteredSalesData={filteredSalesData} />

            {/* Summary Cards */}
            {filteredSalesData.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/20 rounded-xl p-6">
                    <div className="flex items-center justify-between">
                    <div>
                        <p className="text-slate-400 text-sm mb-1">Total Sales Amount</p>
                        <p className="text-2xl font-bold text-white">${filteredSalesData.reduce((sum, sale) => sum + sale.totalAmount, 0).toLocaleString()}</p>
                    </div>
                    <div className="bg-blue-500/20 p-3 rounded-lg">
                        <TrendingUp size={24} className="text-blue-400" />
                    </div>
                    </div>
                </div>
                <div className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/20 rounded-xl p-6">
                    <div className="flex items-center justify-between">
                    <div>
                        <p className="text-slate-400 text-sm mb-1">Total Quantity Sold</p>
                        <p className="text-2xl font-bold text-white">{filteredSalesData.reduce((sum, sale) => sum + sale.quantity, 0)}</p>
                    </div>
                    <div className="bg-purple-500/20 p-3 rounded-lg">
                        <Package size={24} className="text-purple-400" />
                    </div>
                    </div>
                </div>
                <div className="bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 border border-cyan-500/20 rounded-xl p-6">
                    <div className="flex items-center justify-between">
                    <div>
                        <p className="text-slate-400 text-sm mb-1">Number of Transactions</p>
                        <p className="text-2xl font-bold text-white">{filteredSalesData.length}</p>
                    </div>
                    <div className="bg-cyan-500/20 p-3 rounded-lg">
                        <ShoppingCart size={24} className="text-cyan-400" />
                    </div>
                    </div>
                </div>
                </div>
            )}
            </div>
        )}

        {/* Item Report Tab */}
        {activeTab === 'items' && (
            <div>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/20 rounded-xl p-6">
                    <div className="flex items-center justify-between">
                    <div>
                        <p className="text-slate-400 text-sm mb-1">Total Items</p>
                        <p className="text-2xl font-bold text-white">{allProducts.length}</p>
                    </div>
                    <div className="bg-blue-500/20 p-3 rounded-lg">
                        <Package size={24} className="text-blue-400" />
                    </div>
                    </div>
                </div>
                <div className="bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20 rounded-xl p-6">
                    <div className="flex items-center justify-between">
                    <div>
                        <p className="text-slate-400 text-sm mb-1">Total Stock Value</p>
                        <p className="text-2xl font-bold text-white">$ {allProductsTotal}</p>
                    </div>
                    <div className="bg-green-500/20 p-3 rounded-lg">
                        <TrendingUp size={24} className="text-green-400" />
                    </div>
                    </div>
                </div>
                <div className="bg-gradient-to-br from-red-500/10 to-red-500/5 border border-red-500/20 rounded-xl p-6">
                    <div className="flex items-center justify-between">
                    <div>
                        <p className="text-slate-400 text-sm mb-1">Low Stock Items</p>
                        <p className="text-2xl font-bold text-white">{allProducts.filter((item) => item.quantity <= 3).length}</p>
                    </div>
                    <div className="bg-red-500/20 p-3 rounded-lg">
                        <AlertCircle size={24} className="text-red-400" />
                    </div>
                    </div>
                </div>
            </div>

            <ExportButtons handleExport={handleExport} />

            {/* Items Table */}
            <ItemsTable itemsData={allProducts} /> 

            </div>
        )}

        {/* Customer Ledger Tab */}
        {activeTab === 'ledger' && (
            <div>
            {/* Customer Selection */}
            <div className="bg-slate-900 rounded-lg p-6 mb-6 border border-slate-800">
                <label className="block text-sm font-medium text-slate-300 mb-3">
                Select Customer
                </label>
                <select
                value={selectedCustomerLedger}
                onChange={(e) => setSelectedCustomerLedger(e.target.value)}
                className="w-full md:w-64 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                >
                <option value="">Choose a customer...</option>
                {allCustomers.map((customer) => (
                    <option key={customer._id} value={customer._id}>
                    {customer.name}
                    </option>
                ))}
                </select>
            </div>

            {selectedCustomerLedger && (
                <>
                {/* Export Buttons */}
                <ExportButtons handleExport={handleExport} />

                {/* Ledger Table */}
                <LedgerTable customerLedgerData={customerLedgerData} />

                {/* Total Amount Purchased */}
                {customerLedgerData.length > 0 && (
                    <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-slate-700 rounded-xl p-6">
                    <div className="flex items-center justify-between">
                        <div>
                        <p className="text-slate-400 text-sm mb-1">Total Amount Purchased</p>
                        <p className="text-3xl font-bold text-white">${totalPurchased.toLocaleString()}</p>
                        <p className="text-slate-400 text-sm mt-2">Customer: {customerName}</p>
                        </div>
                        <div className="bg-blue-500/20 p-4 rounded-lg">
                        <User size={32} className="text-blue-400" />
                        </div>
                    </div>
                    </div>
                )}
                </>
            )}
            </div>
        )}
        </div>
    </div>
  )
}
