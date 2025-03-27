import Provider from '../db/providerModel.js';

class ProviderController {
    static async getAll(req, res) {
        try {
            const providers = await Provider.getAll();
            res.status(200).json(providers);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching providers', details: error.message });
        }
    }

    static async getById(req, res) {
        const { id } = req.params;
        try {
            const provider = await Provider.getById(parseInt(id));
            if (!provider) {
                return res.status(404).json({ error: 'Provider not found' });
            }
            res.status(200).json(provider);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching provider', details: error.message });
        }
    }

    static async create(req, res) {
        const { name, email, phone } = req.body;
        try {
            await Provider.create({ name, email, phone });
            res.status(201).json({ message: 'Provider created successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Error creating provider', details: error.message });
        }
    }

    static async update(req, res) {
        const { id } = req.params;
        const { name, email, phone } = req.body;
        try {
            await Provider.update({ id: parseInt(id), name, email, phone });
            res.status(200).json({ message: 'Provider updated successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Error updating provider', details: error.message });
        }
    }

    static async delete(req, res) {
        const { id } = req.params;
        try {
            await Provider.delete(parseInt(id));
            res.status(200).json({ message: 'Provider deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Error deleting provider', details: error.message });
        }
    }
}

module.exports = ProviderController;
