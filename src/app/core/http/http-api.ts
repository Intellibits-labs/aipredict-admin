export class HttpApi {
  static refreshToken = "auth/refresh-tokens";
  static userLogout = "user/revoketoken";
  static oauthLogin = "auth/login";
  static me = "user/me";

  // Users
  static getUsers = "users";
  static changePredictor = "users/topredictor/";
  static changeUser = "users/touser/";
  static userUpdate = "users/update-user/";
  static userStatus = "users/status/";

  // Forget Password
  static forgetPassword = "auth/forgot";
  static verifyotp = "auth/verify";
  static resetPassword = "auth/reset-password";

  // Stock
  static getStock = "stock";

  // Predictions
  static getPrediction = "prediction";

  static getDashboard = "dashboard";
  static postCsvFile = "stock-log/import";
  static getMarketData = "stock-import";
}
