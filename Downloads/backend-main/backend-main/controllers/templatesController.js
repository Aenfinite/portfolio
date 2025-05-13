import Template from '../models/Template.js';

export const getTemplates = async (req, res) => {
  try {
    let templates = await Template.find({ userId: req.userId });
    res.json(templates);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching templates' });
  }
};


export const createTemplate = async (req, res) => {
  try {
    const newTemplate = new Template({ ...req.body, userId: req.userId });

    await newTemplate.save();
    res.status(201).json(newTemplate);
  } catch (error) {
    res.status(500).json({ message: 'Error creating template' });
  }
};

export const updateTemplate = async (req, res) => {
  try {
    const updatedTemplate = await Template.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTemplate);
  } catch (error) {
    res.status(500).json({ message: 'Error updating template' });
  }
};

export const deleteTemplate = async (req, res) => {
  try {
    await Template.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting template' });
  }
};
