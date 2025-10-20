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
            <h1 style="margin-top: 0; font-size: 24px; color: #111827;">Dear,</h1>

            <p style="font-size: 16px; color: #374151; line-height: 1.6;">
              Welcome to the HUMA!
            </p>

            <p style="font-size: 16px; color: #374151; line-height: 1.6;">
              Please use the following One-Time Password (OTP) to verify your email address and complete the sign-up process:
            </p>

            <div style="margin: 30px 0; text-align: center;">
              <span style="font-size: 36px; font-weight: bold; color: #2563eb;">${otp}</span>
            </div>

            <p style="margin-top: 10px; font-size: 14px; color: #6b7280;">
              This OTP will expire in <strong>10 minutes</strong>.
            </p>

            <p style="font-size: 16px; color: #dc2626; font-weight: bold;">
              For your security, please do not share this code with stringone.
            </p>

            <p style="font-size: 14px; color: #6b7280; margin-top: 40px;">
              If you did not initiate this request, you can safely ignore this email.
            </p>
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
        <title>Email Verification</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: Arial, sans-serif;">
        <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 20px;">
          <div style="background-color: #ffffff; max-width: 600px; width: 100%; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); padding: 40px;">
            <h1 style="margin-top: 0; font-size: 24px; color: #111827;">Dear,</h1>

            <p style="font-size: 16px; color: #374151; line-height: 1.6;">
              Welcome to the HUMA!
            </p>

            <p style="font-size: 16px; color: #374151; line-height: 1.6;">
              Please use the following One-Time Password (OTP) to verify your email address and complete the sign-up process:
            </p>

            <div style="margin: 30px 0; text-align: center;">
              <span style="font-size: 36px; font-weight: bold; color: #2563eb;">${otp}</span>
            </div>

            <p style="margin-top: 10px; font-size: 14px; color: #6b7280;">
              This OTP will expire in <strong>10 minutes</strong>.
            </p>

            <p style="font-size: 16px; color: #dc2626; font-weight: bold;">
              For your security, please do not share this code with anyone.
            </p>

            <p style="font-size: 14px; color: #6b7280; margin-top: 40px;">
              If you did not initiate this request, you can safely ignore this email.
            </p>
          </div>
        </div>
      </body>
    </html>
  `;
};
exports.signupEmailTemplate = signupEmailTemplate;
//# sourceMappingURL=emailTemplates.js.map