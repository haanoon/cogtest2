import { RequestHandler } from "express";
import fetch from "node-fetch";
import { exec } from "child_process";

// Set your endpoint and project details here or use env vars
const ENDPOINT_ID = process.env.ENDPOINT_ID || "<YOUR_ENDPOINT_ID>";
const PROJECT_ID = process.env.PROJECT_ID || "<YOUR_PROJECT_ID>";
const REGION = process.env.REGION || "us-central1";

export const modelForecastHandler: RequestHandler = async (req, res) => {
	try {
		const instance = req.body.instance;
		if (!instance) {
			return res.status(400).json({ error: "Missing instance data" });
		}

		// Prepare the request body as per Vertex AI REST API
		const body = JSON.stringify({
			instances: [instance],
		});

		// Get access token using gcloud
		exec('gcloud auth print-access-token', async (err, stdout, stderr) => {
			if (err || stderr) {
				return res.status(500).json({ error: "Failed to get access token" });
			}
			const token = stdout.trim();
			const url = `https://${REGION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${REGION}/endpoints/${ENDPOINT_ID}:predict`;

			try {
				const response = await fetch(url, {
					method: "POST",
					headers: {
						"Authorization": `Bearer ${token}`,
						"Content-Type": "application/json",
					},
					body,
				});
				if (!response.ok) {
					const errorText = await response.text();
					return res.status(500).json({ error: "Vertex AI call failed", details: errorText });
				}
				const prediction = await response.json();
				res.json(prediction);
			} catch (e) {
				res.status(500).json({ error: "Failed to call Vertex AI endpoint", details: e.message });
			}
		});
	} catch (e) {
		res.status(500).json({ error: "Internal server error", details: e.message });
	}
};
