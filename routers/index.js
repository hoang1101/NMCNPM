const authRouter = require("./auth");
const adminRouter = require("./admin");
const managerRouter = require("./manager");
const userRouter = require("./user");

const initRouter = (app) => {
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/admin", adminRouter);
  app.use("/api/v1/manager", managerRouter);
  app.use("/api/v1/user", userRouter);
};

module.exports = initRouter;
