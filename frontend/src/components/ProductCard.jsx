import { useState } from 'react';

const ProductCard = ({ product }) => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Product Image */}
      <div className="relative bg-gray-100 p-8">
        {product.badge && (
          <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            {product.badge}
          </span>
        )}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-contain"
        />
      </div>

      {/* Product Details */}
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{product.name}</h2>
        <p className="text-sm text-gray-600 mb-4">{product.variant}</p>

        {/* Price */}
        <div className="mb-4">
          <div className="text-3xl font-bold text-gray-900">₹{product.price.toLocaleString('en-IN')}</div>
          <div className="text-sm text-gray-500">₹{product.originalPrice.toLocaleString('en-IN')}</div>
        </div>

        {/* Available Colors */}
        {product.colors && product.colors.length > 0 && (
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">Available in {product.colors.length} finishes</p>
            <div className="flex gap-2">
              {product.colors.map((color, index) => (
                <div
                  key={index}
                  className="w-6 h-6 rounded-full border-2 border-gray-300"
                  style={{ backgroundColor: color.code }}
                  title={color.name}
                />
              ))}
            </div>
          </div>
        )}

        {/* EMI Plans */}
        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">EMI plans backed by mutual funds</h3>
          <div className="space-y-2">
            {product.emiPlans.map((plan, index) => (
              <button
                key={index}
                onClick={() => handlePlanSelect(plan)}
                className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                  selectedPlan?._id === plan._id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-semibold text-gray-800">
                      ₹{plan.monthlyPayment.toLocaleString('en-IN')} x {plan.tenure} months
                    </div>
                    <div className="text-sm text-gray-600">
                      {plan.interestRate}% interest
                      {plan.cashback > 0 && (
                        <span className="ml-2 text-green-600">
                          Additional cashback of ₹{plan.cashback.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                  </div>
                  {selectedPlan?._id === plan._id && (
                    <svg
                      className="w-6 h-6 text-blue-500"
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
        </div>

        {/* Proceed Button */}
        {selectedPlan && (
          <button className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Proceed with {selectedPlan.tenure} months EMI
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
