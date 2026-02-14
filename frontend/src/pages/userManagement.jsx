'use client'

import { useState } from 'react'
import { Plus, Search, Edit2, Trash2, Eye } from 'lucide-react'
import AddCustomerModal from '../components/addCustomerModal'
import DeleteModal from '../components/deleteModal'
import Sidebar from '../components/sidebar'
import Navbar from '../components/navbar'
import CustomersTable from '../components/table/usersTable'
import { addNewCustomer, deleteUser, editCustomer, getAllCustomers } from '../services/customerService'
import { useEffect } from 'react'
import { enqueueSnackbar } from 'notistack'
import { useRef } from 'react'
import EditCustomerModal from '../components/editCustomerModal'

export default function CustomerPage() {
  const [customers, setCustomers] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const debouncer=useRef(null)

  useEffect(()=>{
    const getCustomers = async () => {
        const customers = await getAllCustomers(searchQuery)
        setCustomers(customers.result)
    }

    getCustomers()
  }, [])

    const getCustomers = async (query) => {
        const customers = await getAllCustomers(query)
        setCustomers(customers.result)
    }

  const handleAddCustomer = async (newCustomer) => {
    try {
        const customer=await addNewCustomer(newCustomer)
        setCustomers([...customers, customer.result])
        setIsAddModalOpen(false)
        enqueueSnackbar('Customer added successfully', {variant:'success'})
    } catch (error) {
        enqueueSnackbar(error.message, {variant:'error'})
    }
  }

  const handleEditCustomer = async (data, id) => {
    try {
        const customer=await editCustomer(data, id)
        setCustomers(prev => (
            prev.map((item) => item._id == id ? customer.result : item)
        ))
        setIsEditModalOpen(false)
        setSelectedCustomer(null)
        enqueueSnackbar('Item updated successfully', {variant:'success'})
    } catch (error) {
        enqueueSnackbar(error.message, {variant:'error'})
    }
  }

  const handleDeleteClick = (customer) => {
    setSelectedCustomer(customer)
    setIsDeleteModalOpen(true)
  }

  const handleConfirmDelete = async (id) => {
    await deleteUser(id)
    setCustomers(customers.filter((customer) => customer._id !== id))
    setIsDeleteModalOpen(false)
    setSelectedCustomer(null)
  }

  const searchCustomer = async (query) => {
    setSearchQuery(query)
    if(debouncer.current) clearTimeout(debouncer.current)
        debouncer.current=setTimeout(() => {
            getCustomers(query)
        }, 1000); 
  }

  const openEditModal = (item) => {
    setSelectedCustomer(item)
    setIsEditModalOpen(true)
  }

  return (
    <div className="bg-slate-950">
        <Sidebar />
        <Navbar />
        <div className="md:ml-64 md:pt-16 min-h-screen bg-slate-950">
        {/* Main Content */}
        <main className="p-6 md:p-8">
            {/* Header Section */}
            <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Customer Management
            </h1>
            <p className="text-slate-400">Manage your customers and track transactions</p>
            </div>

            {/* Top Bar with Add Button */}
            <div className="flex flex-col md:flex-row gap-4 mb-8 items-start md:items-center justify-between">
            {/* Search */}
            <div className="w-full md:flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                <input
                type="text"
                placeholder="Search by name"
                value={searchQuery}
                onChange={(e) => searchCustomer(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
                />
            </div>

            {/* Add Customer Button */}
            <button
                onClick={() => setIsAddModalOpen(true)}
                className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all font-medium shadow-lg"
            >
                <Plus size={20} />
                Add Customer
            </button>
            </div>

            {/* Table Section */}
            <CustomersTable customers={customers} handleDeleteClick={handleDeleteClick} handleEditClick={openEditModal}/>
        </main>

        {/* Modals */}
        <AddCustomerModal
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
            onSave={handleAddCustomer}
        />

        {selectedCustomer && (
            <EditCustomerModal
                isOpen={isEditModalOpen}
                onClose={() => {
                    setIsEditModalOpen(false)
                    setSelectedCustomer(null)
                }}
                onSave={handleEditCustomer}
                item={selectedCustomer}
            />
        )}

        {selectedCustomer && (
            <DeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                item={selectedCustomer}
            />
        )}
        </div>
    </div>
  )
}
