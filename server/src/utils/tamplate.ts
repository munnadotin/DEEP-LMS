const verificationEmailTemplate = (verificationLink: string) => {
    return   `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e5e5e5; border-radius: 8px; overflow: hidden;">
      
      <div style="background: #4F46E5; color: white; padding: 20px; text-align: center;">
        <h2 style="margin: 0;">Deep LMS</h2>
      </div>

      <div style="padding: 30px;">
        <h3>Hello</h3>

        <p>
          Thanks for signing up. Click the button below to verify your email address.
        </p>

        <div style="text-align: center; margin: 30px 0;">
          <a
            href="${verificationLink}"
            style="
              background: #4F46E5;
              color: #ffffff;
              text-decoration: none;
              padding: 14px 28px;
              border-radius: 6px;
              display: inline-block;
              font-weight: bold;
            "
          >
            Verify Email
          </a>
        </div>

        <p>
          Or copy and paste this link into your browser:
        </p>

        <p style="word-break: break-all; color: #4F46E5;">
          ${verificationLink}
        </p>

        <p>
          If you didn't request this, you can safely ignore this email.
        </p>

        <hr style="margin: 30px 0;">

        <p style="font-size: 12px; color: #666;">
          This link will expire in 15 minutes.
        </p>
      </div>

    </div>
  `
}

export default verificationEmailTemplate;