const providerSchema = require('../../resources/provider/provider.entity');
const doctorSchema = require('../../resources/doctor/doctor.entity');

module.exports = async (req, res, next) => {
    try {
        const decodedUser = req.user;
        const providerId = req.query.providerId;
        if (!decodedUser) {
            return res.status(401).end();
        }

        const provider = await providerSchema.findOne({ userId: decodedUser.uid, _id: providerId });
        if (!provider) {
            return res.status(401).end();
        }

        req.provider = provider;
        return next();

    } catch (e) {
        return res.json(e).status(500);
    }
};
