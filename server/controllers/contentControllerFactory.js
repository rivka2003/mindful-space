const createContentController = (contentService) => {
    const create = async (req, res, next) => {
        try {
            const item = await contentService.createItem(req.user._id, req.body);
            res.status(201).json(item);
        } catch (error) {
            next(error);
        }
    };

    const getAll = async (req, res, next) => {
        try {
            const items = await contentService.getVisibleItems(req.user, {
                category: req.query.category
            });
            res.status(200).json(items);
        } catch (error) {
            next(error);
        }
    };

    const getMine = async (req, res, next) => {
        try {
            const items = await contentService.getMyItems(req.user._id, {
                category: req.query.category
            });
            res.status(200).json(items);
        } catch (error) {
            next(error);
        }
    };

    const getById = async (req, res, next) => {
        try {
            const item = await contentService.getByIdForUser(req.params.id, req.user);
            res.status(200).json(item);
        } catch (error) {
            next(error);
        }
    };

    const update = async (req, res, next) => {
        try {
            const item = await contentService.updateItem(req.params.id, req.user, req.body);
            res.status(200).json(item);
        } catch (error) {
            next(error);
        }
    };

    const remove = async (req, res, next) => {
        try {
            const result = await contentService.deleteItem(req.params.id, req.user);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    };

    const like = async (req, res, next) => {
        try {
            const result = await contentService.likeItem(req.params.id, req.user._id);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    };

    const unlike = async (req, res, next) => {
        try {
            const result = await contentService.unlikeItem(req.params.id, req.user._id);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    };

    const activateReminder = async (req, res, next) => {
        try {
            const result = await contentService.activateReminder(req.params.id, req.user._id);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    };

    const deactivateReminder = async (req, res, next) => {
        try {
            const result = await contentService.deactivateReminder(req.params.id, req.user._id);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    };

    return {
        create,
        getAll,
        getMine,
        getById,
        update,
        remove,
        like,
        unlike,
        activateReminder,
        deactivateReminder
    };
};

module.exports = createContentController;
