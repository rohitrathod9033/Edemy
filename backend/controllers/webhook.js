// controllers/webhooks.js
import Stripe from "stripe";
import User from "../models/User.js";
import { Webhook } from "svix"; // Assuming you're using svix for Clerk webhooks

// Clerk Webhook
export const clerkWebhooks = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    await whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"], // fixed typo from "svit-signature"
    });

    const { type, data } = req.body;

    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          imageUrl: data.image_url,
        };
        await User.create(userData); // fixed `user` to `userData`
        res.json({});
        break;
      }

      case "user.updated": {
        const userData = {
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          imageUrl: data.image_url,
        };
        await User.findByIdAndUpdate(data.id, userData);
        res.json({});
        break;
      }

      case "user.deleted": {
        await User.findByIdAndDelete(data.id); // added `User.` before `findByIdAndDelete`
        res.json({});
        break;
      }

      default:
        res.status(200).json({ message: "Unhandled event type" });
        break;
    }
  } catch (error) {
    res.json({ success: false, message: error.message }); // fixed typo `sucess` to `success`
  }
};
