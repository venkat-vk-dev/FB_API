require('dotenv').config()

// async function fetchLeadDetails(leadId) {
//   try {
//     const response = await axios.get(
//       `https://graph.facebook.com/v19.0/${leadId}?access_token=${process.env.FB_USER_ACCESS_TOKEN}`
//     );
//     const data = response.data;
//     console.log(data);
//     return data;
//   } catch (error) {
//     // ************************ NEEDS TO BE CHANGED ACCORDING TO FB RESPONSE ***************************
//     if(error.response){
//       if(error.response.status === 429 && retries > 0){
//         // console.log('Too many Requests. Retrying in 5 seconds ...')
//         await new Promise((resolve) => setTimeout(resolve, 5000))
//         return await fetchLeadDetails(webinarId, retries - 1)
//       }
//       // console.log(`Error in fetchLeadDetails (Error from FB API) with statusCode: ${error.response.code} and message: ${error.response.message}`)
//       const customError = new Error()
//       customError.statusCode = error.response.code;
//       customError.message = `Error from Zoom API in fetching Lead: ${error.response.message}`;
//       throw customError;
//     }
//     console.log('Error in fetchLeadDetails: ', error)
//     throw error
//   }
// }

async function getFbWebhook(req, res) {
  try {
    console.log("Webhook Verification Request");
    const mode = req.query["hub.mode"];
    const challenge = req.query["hub.challenge"];
    const token = req.query["hub.verify_token"];

    if (mode && token) {
      if (mode === "subscribe" && token === process.env.FB_WEBHOOK_SECRET) {
        console.log("Webhook Verification Successfull");
        return res.status(200).send(challenge);
      } else {
        console.log("Webhook Verification Failed");
        return res.sendStatus(403);
      }
    }

    console.log("Webhook Verification Failed");
    return res.sendStatus(400);
  } catch (error) {
    console.log("Error in GET webhook: " + error);
    return res.status(500).send();
  }
}

async function postFbWebhook(req, res) {
  try {
    console.log("Webhook POST Request Received");

    if (!req.isXHubValid()) {
      console.log(
        "Warning - request header X-Hub-Signature not present or invalid"
      );
      return res.sendStatus(401);
    }

    console.log("request header X-Hub-Signature validated");
    const fbData = req.body;
    console.log("Facebook Req Body: ", fbData);

    return res.status(200).send('DATA RECIEVED');
  } catch (error) {
    console.log("Error in POST webhook: " + error);
    return res.status(500).send("Internal Server Error");
  }
}

module.exports = { getFbWebhook, postFbWebhook };
