import Publication from './publication.model.js';

export const createPublication = async (req, res) => {
  try {
    const pub = await Publication.create(req.body);
    res.status(201).json({ success: true, publication: pub });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const getPublications = async (req, res) => {
  const filter = {};
  if (req.query.course) filter.course = req.query.course;
  const pubs = await Publication.find(filter).sort({ date: -1 }).populate('course','name');
  res.json({ success: true, publications: pubs });
};

export const getPublicationById = async (req, res) => {
  const pub = await Publication.findById(req.params.id).populate('course','name');
  if (!pub) return res.status(404).json({ success: false, message: 'No encontrada' });
  res.json({ success: true, publication: pub });
};

export const updatePublication = async (req, res) => {
  try {
    const pub = await Publication.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!pub) return res.status(404).json({ success: false, message: 'No encontrada' });
    res.json({ success: true, publication: pub });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const deletePublication = async (req, res) => {
  const pub = await Publication.findByIdAndDelete(req.params.id);
  if (!pub) return res.status(404).json({ success: false, message: 'No encontrada' });
  res.json({ success: true, message: 'Eliminada' });
};
