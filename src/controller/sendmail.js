const { sendEmail } = require("./mail");
const cron = require("node-cron");
const Email = require('../db/mongoose');
const checkMoneyNotReturned = async () => {
    try {
        // Your logic to check if money is not borrowed back
        // For example, querying the database for transactions
        const transactions = await Transaction.find({ returned: false });

        if (transactions.length > 0) {
            // If money is not returned, send an email
            const email = 'recipient@example.com'; // Set recipient email address
            const subject = 'Money Not Returned Reminder';
            const message = 'Please remember to return the borrowed money as soon as possible.';
            await sendEmail(email, subject, message);
        }
    } catch (error) {
        console.error('Error checking money not returned:', error.message);
    }
};

// Cron job to periodically check if money is not borrowed back
cron.schedule('0 0 * * *', async () => { // Run every day at midnight
    await checkMoneyNotReturned();
});
const sendmailtoUser=async(req,res)=>{
try {
const {email,subject,message, amount, deadline}=req.body;
 const sendmaildata= await sendEmail(email,subject,message,amount,deadline);
 console.log(sendmaildata);

    return res.status(200).json({message: "Email sent successfully"});
 

    
} catch (error) {
    return res.status(500).json({message: error.message});
}
}


const sendmailtoUserCorn = async (req, res) => {
  try {
      const { email, subject, message, deadline, amount } = req.body;

      // Calculate the time one day before the deadline
      const deadlineDate = new Date(deadline);
      deadlineDate.setDate(deadlineDate.getDate() - 1); // Subtract 1 day

      // Set up cron job to send email one day before the deadline
      cron.schedule(`0 0 ${deadlineDate.getDate()} ${deadlineDate.getMonth() + 1} *`, async () => {
          try {
              const sendmaildata = await sendEmail(email, subject, message,amount,deadline);
              console.log("Scheduled email sent:", sendmaildata);
          } catch (error) {
              console.error("Error sending scheduled email:", error.message);
          }
      });

      return res.status(200).json({ message: `Email will be sent one day before the deadline: ${deadline}` });
  } catch (error) {
      return res.status(500).json({ message: error.message });
  }
};

  
module.exports={sendmailtoUser,sendmailtoUserCorn};