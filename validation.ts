export default {
  async validateCardCreation(ctx: any) {
    let errors = [];
    let status;
    const body = await ctx.request.body({
      contentTypes: {
        text: ["application/javascript"],
      },
    });
    const value = await body.value;
    if (!value) {
      ctx.response.status = 400; // bad request
      ctx.response.body = { error: "Please provide the required data" };
      return;
    }
    const fields = ["code", "amount",
      // "user_id"
    ];
    for (let index = 0; index < fields.length; index++) {
      if (!value[fields[index]]) {
        status = 422; // unprocessable entity
        errors.push({ [fields[index]]: `${fields[index]} field is required` });
      }
    }

    if (status) {
      ctx.response.body = { errors };
      return false;
    }

    return value;
  },
  async validateCardUpdate(ctx: any) {
    const body = await ctx.request.body({
      contentTypes: {
        text: ["application/javascript"],
      },
    });
    const value = await body.value;
console.log("baba", value)
    if (!value || Object.keys(value).length === 0) {
      ctx.response.status = 400; // bad request
      ctx.response.body = {
        errors: { message: "Please provide the required data" },
      };
      return false;
    }

    return value;
  },
};
