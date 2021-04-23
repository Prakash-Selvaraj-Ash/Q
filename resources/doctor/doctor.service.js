const util = require('../utils/util');
const doctorSchema = require('../provider/provider.entity');

const doctorService = {
    createDoctor: async (createDocRequest) => {
        const createdDoctor = await doctorSchema.create(createDocRequest);
        return createdDoctor;
    },

    getDoctors: async (hospitalId) => {
        const doctors = await doctorSchema
            .find({ providerId: hospitalId });
        return doctors;
    },

    searchDoctors: async (searchParam, start, limit) => {
        const doctors = doctorSchema.find(
            {
                $and: [
                    { 'type': 'Doctor' },
                    {
                        $or: [
                            { 'name': { '$regex': searchParam, '$options': 'i' } },
                            { 'subType': { '$regex': searchParam, '$options': 'i' } }
                        ]
                    }
                ]

            }
        )

        return await util.paginate(doctors, start, limit);
    }
}

module.exports = doctorService;