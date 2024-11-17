# Cardano Talent Webhooks

This project is a simple Node.js application designed to receive webhook responses from [NOWPayments.io](https://nowpayments.io/).
It allows you to handle cryptocurrency payment notifications and integrate them into your system seamlessly.

## Stack

- **Node.js**: JavaScript runtime environment for building server-side applications.
- **Hono**: A lightweight and fast web framework for creating high-performance applications.
- **NOWPayments.io**: The cryptocurrency payment gateway.

## Features

- Easy setup for receiving NOWPayments.io webhooks.
- Lightweight and built with simplicity in mind.
- Can be used as a starting point for integrating cryptocurrency payment notifications.

## Prerequisites

- [Node.js](https://nodejs.org/) installed on your system.
- A NOWPayments.io account with webhook notifications configured.
- Basic [Hono](https://hono.dev/) web framework knowledge required

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run start`.

## Pocketbase Dev

For having typesafe backend with pocketbase You will need to use the pocketbase typegen, learn more about pocketbase typegen on the `website` repo
