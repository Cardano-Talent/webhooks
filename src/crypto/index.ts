import { Hono } from "hono";
import { createHmac } from "node:crypto";
import { addDays, formatISO } from "date-fns";
import { pbAdmin } from "../pocketAdmin";
import { sortObject } from "../utils";
import {
  JobsStatusOptions,
  PaymentsMethodOptions,
} from "../types/pocketbase-types";

const crypto = new Hono();

crypto.post("/crypto", async ({ req, text }) => {
  try {
    const signature = (req.header("x-nowpayments-sig") as string) || "";

    const params = await req.json();

    if (!signature || !params) return text("ok");

    const generatedSignature = createHmac(
      "sha512",
      `${process.env.NOWPAYMENTS_WEBHOOK_KEY}`
    )
      .update(JSON.stringify(sortObject(params)))
      .digest("hex");

    if (signature !== generatedSignature) return text("ok");

    const { payment_status, payment_id, order_description, order_id } = params;

    if (payment_status !== "finished") return text("ok");

    const job = await pbAdmin
      .collection("jobs")
      .getOne(order_id, { expand: "company" });

    if (!job) throw new Error("Job Not Found");

    // @ts-expect-error company is foreign key
    const companyId = job.expand.company.id;

    // Add expiration date
    const newExpirationDate = formatISO(addDays(new Date(), 60));

    // Activate listing and refresh expiration date
    await pbAdmin.collection("jobs").update(order_id, {
      expiration_date: newExpirationDate,
      status: JobsStatusOptions.active,
    });

    // Identify the user as a paying one
    await pbAdmin.collection("companies").update(companyId, {
      purchased_post: true,
    });

    // Log payment
    await pbAdmin.collection("payments").create({
      company: companyId,
      method: PaymentsMethodOptions.crypto,
      resource: order_description,
      resource_id: order_id,
      third_party_payment_id: payment_id,
    });
  } catch (error) {
    console.error(error);
    return text("No-complete");
  } finally {
    return text("complete");
  }
});

export { crypto };
