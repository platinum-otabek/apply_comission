module.exports = (body, fields) => {
    const result = {};

    fields.map(
        (field) => body.hasOwnProperty(field) && (result[field] = body[field])
    );

    return result;
};
