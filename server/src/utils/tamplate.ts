const verificationEmailTemplate = (verificationLink: string) => {
  return `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #E6DFD5; border-radius: 8px; overflow: hidden; background-color: #FAF7F2;">
    
    <!-- Header -->
    <div style="background-color: #3D2F24; color: #FAF7F2; padding: 24px; text-align: center;">
      <h2 style="margin: 0; font-size: 24px; letter-spacing: 0.5px; font-weight: 700;">Deep LMS</h2>
    </div>

    <!-- Main Content -->
    <div style="padding: 32px; color: #3D2F24;">
      <h3 style="margin-top: 0; color: #3D2F24; font-size: 18px;">Welcome to Deep LMS,</h3>

      <p style="color: #6E5A4B; line-height: 1.6; font-size: 15px;">
        Thanks for signing up! Click the button below to verify your email address and activate your account.
      </p>

      <!-- CTA Button -->
      <div style="text-align: center; margin: 32px 0;">
        <a
          href="${verificationLink}"
          style="
            background-color: #8C6D53;
            color: #FFFFFF;
            text-decoration: none;
            padding: 14px 28px;
            border-radius: 6px;
            display: inline-block;
            font-weight: bold;
            font-size: 15px;
            box-shadow: 0 2px 4px rgba(61, 47, 36, 0.15);
          "
        >
          Verify Email Address
        </a>
      </div>

      <p style="color: #6E5A4B; line-height: 1.6; font-size: 14px;">
        If you didn't request this email, you can safely ignore it.
      </p>

      <hr style="margin: 28px 0; border: none; border-top: 1px solid #E6DFD5;">

      <!-- Footer Note -->
      <p style="font-size: 12px; color: #9E8C7C; text-align: center; margin: 0;">
        This verification link will expire in 15 minutes.
      </p>
    </div>

  </div>
`
}

export default verificationEmailTemplate;