import nodemailer from 'nodemailer';

// Configure the transporter
const transporter = nodemailer.createTransport({
  service:"gmail",
  auth: {
    user: 't22328414@gmail.com', 
    pass: 'rapd feyd jcvt xgzb', 
  },
});

const sendTaskAssignmentEmail = async (to, taskDetails) => {
  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender address
    to: to, // List of receivers
    subject: 'Task Assigned', // Subject line
    text: `You have been assigned a new task: ${taskDetails.title}`, // Plain text body
    html: `<strong>You have been assigned a new task: ${taskDetails.title}</strong><br/>Description: ${taskDetails.description}`, // HTML body
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

export default sendTaskAssignmentEmail