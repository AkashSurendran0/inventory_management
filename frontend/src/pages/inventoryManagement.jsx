import React from 'react'
import Sidebar from '../components/sidebar'
import Navbar from '../components/navbar'
import { useState } from 'react'
import { Plus, Search } from 'lucide-react'
import AddItemModal from '../components/addItemModal'
import DeleteModal from '../components/deleteModal'
import InventoryTable from '../components/table/inventoryTable'
import { useEffect } from 'react'
import { addItem, editItem, getAllProducts } from '../services/inventoryService'
import { enqueueSnackbar } from 'notistack'
import EditItemModal from '../components/editItemModal'

function InventoryManagement() {

    
    
    const [items, setItems] = useState([])
    
    const [searchQuery, setSearchQuery] = useState('')
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [selectedItem, setSelectedItem] = useState(null)
    const [clearForm, setClearForm] = useState(false)
    
    // const filteredItems = items.filter(
    //     (item) =>
    //         item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    //     item.description.toLowerCase().includes(searchQuery.toLowerCase())
    // )

    useEffect(() => {
        const fetchProducts = async () => {
            const products=await getAllProducts()
            setItems(products.result)
        }

        fetchProducts()
    }, [])
    
    const handleAddItem = async (newItem) => {
        try {
            const product=await addItem(newItem)
            setItems([...items, product.result])
            setIsAddModalOpen(false)
            enqueueSnackbar('Item added successfully', {variant:'success'})
        } catch (error) {
            enqueueSnackbar(error.message, {variant:'error'})
        }
    }

    const handleEditItem = async (item, id) => {
        try {
            setClearForm(false)
            const product=await editItem(item, id)
            setItems(prev => (
                prev.map((item) => item._id == id ? product.result : item)
            ))
            setIsEditModalOpen(false)
            enqueueSnackbar('Item updated successfully', {variant:'success'})
            setClearForm(true)
        } catch (error) {
            enqueueSnackbar(error.message, {variant:'error'})
        }
    }

    const handleDeleteClick = (item) => {
        setSelectedItem(item)
        setIsDeleteModalOpen(true)
    }

    const handleConfirmDelete = () => {
        setItems(items.filter((item) => item.id !== selectedItem.id))
        setIsDeleteModalOpen(false)
        setSelectedItem(null)
    }

    const openEditModal = (item) => {
        setSelectedItem(item)
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
                        Inventory Management
                    </h1>
                    <p className="text-slate-400">Manage your products and stock</p>
                </div>

                {/* Top Bar with Add Button */}
                <div className="flex flex-col md:flex-row gap-4 mb-8 items-start md:items-center justify-between">
                {/* Search */}
                    <div className="w-full md:flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                        <input
                        type="text"
                        placeholder="Search by name or description"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
                        />
                    </div>

                {/* Add Item Button */}
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all font-medium shadow-lg"
                >
                    <Plus size={20} />
                    Add Item
                </button>
                </div>

                {/* Table Section */}
                <InventoryTable items={items} handleDeleteClick={handleDeleteClick} openEditModal={openEditModal}/>
            </main>

            {/* Modals */}
            <AddItemModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSave={handleAddItem}
                clearForm={clearForm}
            />
            
            {selectedItem && (
                <EditItemModal
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    onSave={handleEditItem}
                    editItem={selectedItem}
                    clearForm={clearForm}
                />
            )}

            <DeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                itemName={selectedItem?.name}
            />
            </div>
        </div>
    )
}

export default InventoryManagement