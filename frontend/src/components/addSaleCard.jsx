import React, { useEffect, useState } from "react";
import { getAllProducts } from "../services/inventoryService";
import { getAllCustomers } from "../services/customerService";
import { addNewSale } from "../services/salesService";
import { enqueueSnackbar } from "notistack";

function AddSaleCard({onsuccess}) {
  const [products, setProducts] = useState(null);
  const [customers, setCustomers] = useState(null)
  const [formData, setFormData] = useState({
    product: "",
    quantity: "",
    customer: "",
    isCashSale: false,
    saleDate: new Date().toISOString().split("T")[0],
  });
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [selectedCustomer, setSelectedCustomer] = useState(null)
//   const selectedProduct = products.find(
//     (p) => p._id === parseInt(formData.product),
//   );
  //   const selectedCustomer = customers.find(
  //     (c) => c.id === parseInt(formData.customer),
  //   );

  useEffect(() => {
    const getProducts = async () => {
      const products = await getAllProducts();
      setProducts(products.result);
    };

    const getCustomers = async () => {
        const customers = await getAllCustomers()
        setCustomers(customers.result)
    }

    getCustomers()
    getProducts();
  }, []);

  const validateForm = () => {
    const errors = {};
    if (!formData.product) errors.product = "Please select a product";
    if (!formData.quantity || !Number.isInteger(Number(formData.quantity)) || formData.quantity <= 0)
      errors.quantity = "Quantity must be greater than 0 and a whole number";
    if (selectedProduct && formData.quantity > selectedProduct.quantity) {
      errors.quantity = `Quantity exceeds available stock (${selectedProduct.quantity})`;
    }
    if (!formData.isCashSale && !formData.customer)
      errors.customer = "Please select a customer or choose Cash Sale";
    if (!formData.saleDate) errors.saleDate = "Please select a sale date";
    return errors;
  };

  const handleRecordSale = async () => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const newSale = {
      date: formData.saleDate,
      productName: selectedProduct.name,
      productId: selectedProduct._id,
      customerName: formData.isCashSale ? "Cash Sale" : selectedCustomer.name,
      quantity: parseInt(formData.quantity),
      pricePerUnit: selectedProduct.price,
      totalAmount: parseInt(formData.quantity) * selectedProduct.price,
    };

    try {
      const result=await addNewSale(newSale)
      setProducts(prev => (
        prev.map(item => item._id==selectedProduct._id? result.result.product:item)
      ))

      enqueueSnackbar('Sale added successfully', {variant:'success'})
      onsuccess(result.result.sale)
      setFormData({
        product: "",
        quantity: "",
        customer: "",
        isCashSale: false,
        saleDate: new Date().toISOString().split("T")[0],
      });
    } catch (error) {
      enqueueSnackbar(error.message, {variant:'error'})
    }

    setFormErrors({});
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const changeSelectedProduct = (e) => {
    const selectedId=e.target.value
    const foundProduct = products.find(p => p._id === selectedId);
    setSelectedProduct(foundProduct || null);
  }

  const handleSelectedCustomer = (e) => {
    const selectedId=e.target.value
    const foundCustomer=customers.find(p => p._id === selectedId);
    setSelectedCustomer(foundCustomer || null)
  }

  const [formErrors, setFormErrors] = useState({});

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 mb-8 shadow-lg">
      <h2 className="text-xl font-bold text-white mb-6">Record New Sale</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {/* Product Select */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Select Product *
          </label>
          {products && (
            <select
                name="product"
                value={formData.product}
                onChange={(e)=>{
                    handleFormChange(e)
                    changeSelectedProduct(e)
                }}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
            >
                <option value="">Choose a product...</option>
                {products.map((p) => (
                <option 
                key={p._id} 
                value={p._id}
                >
                    {p.name}
                </option>
                ))}
            </select>
          )}
          {formErrors.product && (
            <p className="text-red-400 text-xs mt-1">{formErrors.product}</p>
          )}
        </div>

        {/* Available Stock Display */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Available Stock
          </label>
          <div className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-300">
            {selectedProduct
              ? `${selectedProduct.quantity} units`
              : "Select product first"}
          </div>
        </div>

        {/* Price Per Unit Display */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Price per Unit
          </label>
          <div className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-300">
            {selectedProduct
              ? `$${selectedProduct.price.toFixed(2)}`
              : "Select product first"}
          </div>
        </div>

        {/* Quantity Input */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Quantity *
          </label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleFormChange}
            placeholder="Enter quantity"
            min="1"
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
          />
          {formErrors.quantity && (
            <p className="text-red-400 text-xs mt-1">{formErrors.quantity}</p>
          )}
        </div>

        {/* Sale Date */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Sale Date *
          </label>
          <input
            type="date"
            name="saleDate"
            value={formData.saleDate}
            onChange={handleFormChange}
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
          />
          {formErrors.saleDate && (
            <p className="text-red-400 text-xs mt-1">{formErrors.saleDate}</p>
          )}
        </div>

        {/* Total Amount Display */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Total Amount
          </label>
          <div className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 font-semibold">
            {selectedProduct && formData.quantity
              ? `$${(selectedProduct.price * parseInt(formData.quantity)).toFixed(2)}`
              : "$0.00"}
          </div>
        </div>
      </div>

      {/* Customer Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Select Customer *
          </label>
          {customers && (
            <select
                name="customer"
                value={formData.customer}
                onChange={(e)=>{
                  handleFormChange(e)
                  handleSelectedCustomer(e)
                }}
                disabled={formData.isCashSale}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <option value="">Choose a customer...</option>
                {customers.map((c) => (
                <option key={c._id} value={c._id}>
                    {c.name}
                </option>
                ))}
            </select>
          )}
          {formErrors.customer && (
            <p className="text-red-400 text-xs mt-1">{formErrors.customer}</p>
          )}
        </div>

        <div className="flex items-end">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="isCashSale"
              checked={formData.isCashSale}
              onChange={handleFormChange}
              className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-blue-500 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-slate-300">
              Cash Sale
            </span>
          </label>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={() =>
            setFormData({
              product: "",
              quantity: "",
              customer: "",
              isCashSale: false,
              saleDate: new Date().toISOString().split("T")[0],
            })
          }
          className="flex-1 px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors font-medium"
        >
          Cancel
        </button>
        <button
          onClick={handleRecordSale}
          className="flex-1 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg transition-all font-medium shadow-lg hover:shadow-xl"
        >
          Record Sale
        </button>
      </div>
    </div>
  );
}

export default AddSaleCard;
