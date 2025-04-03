module.exports = {
  Query: {
    const: async(_, { value }, {pool}) => {
      return value;
    },
    dict: async(_, { value }, {pool}) => {
      return value;
    }
  },
};
