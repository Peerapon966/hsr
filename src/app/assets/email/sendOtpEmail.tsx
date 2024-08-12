import hyv_logo from "/shared/hyv_logo"

type sendOtpEmailProps = {
  otp: string
}

export default function sendOtpEmail(props: sendOtpEmailProps) {
  const otp = props.otp;
  const subject = `${otp} is your HoYoverse verification code`;
  const htmlBody = `
        <div>
            <img src="cid:hyv_logo" alt="hoyoverse logo" width="400px" />
            <p>
                Here's your 6-digits verification code
            </p>
            <h4>
                ${otp}
            </h4>
        </div>
    `;

  return {
    subject: subject,
    body: htmlBody
  }
}