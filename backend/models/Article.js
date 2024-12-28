import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  excerpt: {
    type: String,
    required: [true, 'Excerpt is required']
  },
  content: {
    type: String,
    required: [true, 'Content is required']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: {
      values: ['FinTech', 'AI / ML', 'Research / White Papers'],
      message: '{VALUE} is not a valid category'
    }
  },
  author: {
    name: {
      type: String,
      required: [true, 'Author name is required']
    },
    role: {
      type: String,
      required: [true, 'Author role is required']
    }
  },
  readTime: {
    type: String,
    required: [true, 'Read time is required']
  },
  date: {
    type: Date,
    default: Date.now
  },
  proTip: {
    type: String,
    required: false
  },
  keyTakeaways: {
    type: [String],
    required: false,
    default: []
  },
  implementationStrategy: {
    type: String,
    required: false
  },
  relatedArticles: {
    type: [{
      title: String,
      excerpt: String,
      category: String,
      readTime: String
    }],
    required: false,
    default: []
  }
}, {
  timestamps: true
});

// Add a pre-save hook to validate the data
articleSchema.pre('save', function(next) {
  // Ensure date is a valid Date object
  if (this.date && !(this.date instanceof Date)) {
    try {
      this.date = new Date(this.date);
    } catch (error) {
      next(new Error('Invalid date format'));
      return;
    }
  }
  next();
});

export default mongoose.model('Article', articleSchema);
