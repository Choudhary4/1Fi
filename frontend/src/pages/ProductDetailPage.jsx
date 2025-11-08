import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const ProductDetailPage = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, [slug]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/products/slug/${slug}`);
      setProduct(response.data);
      setSelectedColor(response.data.colors?.[0] || null);
      setError(null);
    } catch (err) {
      setError('Product not found or failed to load.');
      console.error('Error fetching product:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const handleProceed = () => {
    alert(`Proceeding with ${selectedPlan.tenure} months EMI plan\nMonthly Payment: ₹${selectedPlan.monthlyPayment.toLocaleString('en-IN')}\nInterest Rate: ${selectedPlan.interestRate}%`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mb-4"></div>
          <div className="text-xl text-gray-600">Loading product...</div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-xl text-red-600 mb-4">{error || 'Product not found'}</div>
          <Link
            to="/"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 inline-block"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to all products
        </Link>

        {/* Product Detail Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl mx-auto">
          <div className="md:flex">
            {/* Product Image */}
            <div className="md:w-1/2 bg-gray-100 p-8 relative">
              {product.badge && (
                <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded z-10">
                  {product.badge}
                </span>
              )}
              <img
                src={selectedColor?.image || product.image}
                alt={`${product.name} - ${selectedColor?.name || product.variant}`}
                className="w-full h-96 object-contain transition-opacity duration-300"
                key={selectedColor?.name}
              />
            </div>

            {/* Product Details */}
            <div className="md:w-1/2 p-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
              <p className="text-lg text-gray-600 mb-6">{product.variant}</p>

              {/* Price */}
              <div className="mb-6">
                <div className="text-4xl font-bold text-gray-900 mb-1">
                  ₹{product.price.toLocaleString('en-IN')}
                </div>
                <div className="text-sm text-gray-500">
                  <span className="line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                  <span className="ml-2 text-green-600 font-semibold">
                    Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="text-xs text-gray-400 mt-1">MRP: ₹{product.mrp.toLocaleString('en-IN')}</div>
              </div>

              {/* Available Colors */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">
                    Available in {product.colors.length} colors
                  </h3>
                  <div className="flex gap-3">
                    {product.colors.map((color, index) => (
                      <div key={index} className="text-center">
                        <button
                          onClick={() => handleColorSelect(color)}
                          className={`w-12 h-12 rounded-full border-4 transition-all transform hover:scale-110 ${
                            selectedColor?.name === color.name
                              ? 'border-blue-600 shadow-lg scale-110'
                              : 'border-gray-300 hover:border-blue-400'
                          }`}
                          style={{ backgroundColor: color.code }}
                          title={color.name}
                        />
                        <p className={`text-xs mt-1 font-medium ${
                          selectedColor?.name === color.name ? 'text-blue-600' : 'text-gray-600'
                        }`}>
                          {color.name}
                        </p>
                      </div>
                    ))}
                  </div>
                  {selectedColor && (
                    <p className="text-sm text-gray-600 mt-3">
                      Selected: <span className="font-semibold text-gray-800">{selectedColor.name}</span>
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* EMI Plans Section */}
          <div className="border-t p-8 bg-gray-50">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              EMI plans backed by mutual funds
            </h2>
            <div className="space-y-3">
              {product.emiPlans.map((plan, index) => (
                <button
                  key={index}
                  onClick={() => handlePlanSelect(plan)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    selectedPlan?._id === plan._id
                      ? 'border-blue-500 bg-blue-50 shadow-md'
                      : 'border-gray-200 hover:border-blue-300 bg-white'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <div className="font-bold text-lg text-gray-800">
                        ₹{plan.monthlyPayment.toLocaleString('en-IN')} x {plan.tenure} months
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        <span className={plan.interestRate === 0 ? 'text-green-600 font-semibold' : ''}>
                          {plan.interestRate}% interest
                        </span>
                        {plan.cashback > 0 && (
                          <span className="ml-3 text-green-600 font-semibold">
                            + ₹{plan.cashback.toLocaleString('en-IN')} cashback
                          </span>
                        )}
                      </div>
                      {plan.interestRate === 0 && (
                        <div className="text-xs text-green-600 mt-1">No Cost EMI</div>
                      )}
                    </div>
                    {selectedPlan?._id === plan._id && (
                      <svg
                        className="w-8 h-8 text-blue-500 flex-shrink-0 ml-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Proceed Button */}
            {selectedPlan && (
              <button
                onClick={handleProceed}
                className="w-full mt-6 bg-blue-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors shadow-lg"
              >
                Proceed with {selectedPlan.tenure} months EMI
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
