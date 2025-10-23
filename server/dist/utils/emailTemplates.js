"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupEmailTemplate = exports.loginEmailTemplate = void 0;
const loginEmailTemplate = (otp) => {
    return `
      <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>Login Verification FUMA</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: Arial, sans-serif;">
        <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 20px;">
          <div style="background-color: #ffffff; max-width: 600px; width: 100%; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); padding: 40px;">
           
            <p style='font-size: 16px; text-align :center;'>Log-in Code</p>
            <div style="margin: 30px 0; text-align: center;">
              <span style="font-size: 36px;">${otp}</span>
            </div>

            <p style="margin-top: 10px;text-align : center; font-size: 14px; color: #6b7280;">
              Here is the sign-in code your requested.If you did not initiate this request, you can safely ignore this email.
            </p>

            <p style="font-size: 14px;text-align : center; color: #6b7280; margin-top: 40px;">
              Please do not share this code with anyone. 
            </p>
            <h1 style="text-align:center;">FUMA</h1>
          </div>
        </div>
      </body>
    </html>
  `;
};
exports.loginEmailTemplate = loginEmailTemplate;
const signupEmailTemplate = (otp) => {
    return `
          <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>Login Verification FUMA</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: Arial, sans-serif;">
        <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 20px;">
          <div style="background-color: #ffffff; max-width: 600px; width: 100%; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); padding: 40px;">
           
            <p style='font-size: 16px; text-align :center;'>Sign-up Code</p>
            <div style="margin: 30px 0; text-align: center;">
              <span style="font-size: 36px;">${otp}</span>
            </div>

            <p style="margin-top: 10px;text-align : center; font-size: 14px; color: #6b7280;">
              Here is the sign-in code your requested.If you did not initiate this request, you can safely ignore this email.
            </p>

            <p style="font-size: 14px;text-align : center; color: #6b7280; margin-top: 40px;">
              Please do not share this code with anyone. 
            </p>
            <h1 style="text-align:center;">FUMA</h1>
          </div>
        </div>
      </body>
    </html>
  `;
};
exports.signupEmailTemplate = signupEmailTemplate;
//# sourceMappingURL=emailTemplates.js.map