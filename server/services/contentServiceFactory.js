const User = require('../models/userModel');
const httpError = require('../utils/httpError');
const { isValidContentCategory } = require('../constants/contentCategories');

const isOwnerOrAdmin = (item, user) => {
    return item.createdBy.toString() === user._id.toString() || user.role === 'admin';
};

const sanitizeUpdateData = (data) => {
    const blocked = ['_id', 'createdBy', 'likesCount', 'createdAt', 'updatedAt'];
    const sanitized = { ...data };

    for (const key of blocked) {
        delete sanitized[key];
    }

    return sanitized;
};

const buildCategoryFilter = (category) => {
    if (!category) {
        return {};
    }

    if (!isValidContentCategory(category)) {
        throw httpError(400, 'Invalid category filter');
    }

    return { category };
};

const createContentService = (Model, entityType) => {
    const createItem = async (userId, data) => {
        return await Model.create({ ...data, createdBy: userId });
    };

    const getVisibleItems = async (user, filters = {}) => {
        const visibilityQuery = user?.role === 'admin'
            ? {}
            : user?._id
                ? { $or: [{ visibility: 'public' }, { createdBy: user._id }] }
                : { visibility: 'public' };

        const query = {
            ...visibilityQuery,
            ...buildCategoryFilter(filters.category)
        };

        return await Model.find(query).sort({ likesCount: -1, createdAt: -1 });
    };

    const getMyItems = async (userId, filters = {}) => {
        return await Model.find({
            createdBy: userId,
            ...buildCategoryFilter(filters.category)
        }).sort({ likesCount: -1, createdAt: -1 });
    };

    const getByIdForUser = async (id, user) => {
        const item = await Model.findById(id);
        if (!item) throw httpError(404, `${entityType} not found`);

        if (item.visibility === 'private' && (!user || !isOwnerOrAdmin(item, user))) {
            throw httpError(403, 'Not allowed to access this private item');
        }

        return item;
    };

    const updateItem = async (id, user, data) => {
        const item = await Model.findById(id);
        if (!item) throw httpError(404, `${entityType} not found`);
        if (!isOwnerOrAdmin(item, user)) throw httpError(403, 'Not allowed to update this item');

        const updateData = sanitizeUpdateData(data);
        Object.assign(item, updateData);
        await item.save();
        return item;
    };

    const deleteItem = async (id, user) => {
        const item = await Model.findById(id);
        if (!item) throw httpError(404, `${entityType} not found`);
        if (!isOwnerOrAdmin(item, user)) throw httpError(403, 'Not allowed to delete this item');

        await item.deleteOne();

        await User.updateMany(
            {},
            {
                $pull: {
                    likedContent: {
                        entityType,
                        entityId: item._id
                    },
                    reminderSubscriptions: {
                        entityType,
                        entityId: item._id
                    }
                }
            }
        );

        return { message: `${entityType} deleted successfully` };
    };

    const likeItem = async (id, userId) => {
        const [item, user] = await Promise.all([Model.findById(id), User.findById(userId)]);

        if (!item) throw httpError(404, `${entityType} not found`);
        if (!user) throw httpError(404, 'User not found');

        const alreadyLiked = user.likedContent.some(
            (liked) => liked.entityType === entityType && liked.entityId.toString() === item._id.toString()
        );

        if (alreadyLiked) throw httpError(400, `You already liked this ${entityType.toLowerCase()}`);

        user.likedContent.push({ entityType, entityId: item._id });
        item.likesCount += 1;

        await Promise.all([user.save(), item.save()]);

        return { liked: true, likesCount: item.likesCount };
    };

    const unlikeItem = async (id, userId) => {
        const [item, user] = await Promise.all([Model.findById(id), User.findById(userId)]);

        if (!item) throw httpError(404, `${entityType} not found`);
        if (!user) throw httpError(404, 'User not found');

        const likeIndex = user.likedContent.findIndex(
            (liked) => liked.entityType === entityType && liked.entityId.toString() === item._id.toString()
        );

        if (likeIndex === -1) throw httpError(400, `You did not like this ${entityType.toLowerCase()}`);

        user.likedContent.splice(likeIndex, 1);
        item.likesCount = Math.max(0, item.likesCount - 1);

        await Promise.all([user.save(), item.save()]);

        return { liked: false, likesCount: item.likesCount };
    };

    const activateReminder = async (id, userId) => {
        const [item, user] = await Promise.all([Model.findById(id), User.findById(userId)]);

        if (!item) throw httpError(404, `${entityType} not found`);
        if (!user) throw httpError(404, 'User not found');

        const existing = user.reminderSubscriptions.find(
            (reminder) => reminder.entityType === entityType && reminder.entityId.toString() === item._id.toString()
        );

        if (existing) {
            if (existing.isActive) throw httpError(400, 'Reminder already active');
            existing.isActive = true;
        } else {
            user.reminderSubscriptions.push({
                entityType,
                entityId: item._id,
                isActive: true
            });
        }

        await user.save();

        return { reminderActive: true };
    };

    const deactivateReminder = async (id, userId) => {
        const [item, user] = await Promise.all([Model.findById(id), User.findById(userId)]);

        if (!item) throw httpError(404, `${entityType} not found`);
        if (!user) throw httpError(404, 'User not found');

        const existing = user.reminderSubscriptions.find(
            (reminder) => reminder.entityType === entityType && reminder.entityId.toString() === item._id.toString()
        );

        if (!existing) throw httpError(400, 'Reminder not found for this item');
        if (!existing.isActive) throw httpError(400, 'Reminder already inactive');

        existing.isActive = false;
        await user.save();

        return { reminderActive: false };
    };

    return {
        createItem,
        getVisibleItems,
        getMyItems,
        getByIdForUser,
        updateItem,
        deleteItem,
        likeItem,
        unlikeItem,
        activateReminder,
        deactivateReminder
    };
};

module.exports = createContentService;
