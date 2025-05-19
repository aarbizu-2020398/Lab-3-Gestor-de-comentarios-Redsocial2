import Category from './category.model.js';

export const createCategory = async (req, res) => {
  try {
    const cat = await Category.create({ name: req.body.name });
    res.status(201).json({ success: true, category: cat });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const getCategories = async (req, res) => {
  const cats = await Category.find();
  res.json({ success: true, categories: cats });
};

export const getCategoryById = async (req, res) => {
  const cat = await Category.findById(req.params.id);
  if (!cat) return res.status(404).json({ success: false, message: 'No encontrada' });
  res.json({ success: true, category: cat });
};

export const updateCategory = async (req, res) => {
  try {
    const cat = await Category.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });
    if (!cat) return res.status(404).json({ success: false, message: 'No encontrada' });
    res.json({ success: true, category: cat });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const deleteCategory = async (req, res) => {
  const cat = await Category.findByIdAndDelete(req.params.id);
  if (!cat) return res.status(404).json({ success: false, message: 'No encontrada' });
  res.json({ success: true, message: 'Eliminada' });
};
