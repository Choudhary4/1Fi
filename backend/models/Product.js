import mongoose from 'mongoose';

const emiPlanSchema = new mongoose.Schema({
  tenure: {
    type: Number,
    required: true
  },
  monthlyPayment: {
    type: Number,
    required: true
  },
  interestRate: {
    type: Number,
    required: true
  },
  cashback: {
    type: Number,
    default: 0
  }
});

const colorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: false
  }
});

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  variant: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  originalPrice: {
    type: Number,
    required: true
  },
  mrp: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  badge: {
    type: String,
    default: ''
  },
  colors: [colorSchema],
  emiPlans: [emiPlanSchema]
}, {
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);

export default Product;
