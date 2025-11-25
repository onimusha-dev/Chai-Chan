import dotenv from "dotenv";

dotenv.config({
    path: "./.env",
});

const requiredEnvVars = [
    "ALLOWD_ORIGINS",
    "GEMINI_API_KEY",
    "MONGO_URI",
    "ACCESS_TOKEN_CODE",
    "ACCESS_TOKEN_EXPIRY",
    "REFRESH_TOKEN_CODE",
    "REFRESH_TOKEN_EXPIRY",
    "HTTP_ONLY_COOKIE",
    "SECURE_COOKIE",
    "SMTP_USER",
    "SMTP_PASS",
    // "GOOGLE_CLIENT_ID",
    // "GOOGLE_CLIENT_SECRET"
] as const;

for (const varName of requiredEnvVars) {
    if (!process.env[varName]) {
        console.error(`Error: Missing required environment variable: ${varName}`);
        process.exit(1);
    }
}

export const env = {
    port: process.env.PORT || "5500",
    origins: process.env.ALLOWD_ORIGINS,
    ollamaURI: process.env.OLLAMA_URL,

    geminiAPI: process.env.GEMINI_API_KEY,
    environment: process.env.ENVIRONMENT || "development",

    mongoURI: process.env.MONGO_URI,

    accessTokenCode: process.env.ACCESS_TOKEN_CODE,
    accessTokenExpiry: process.env.ACCESS_TOKEN_EXPIRY,

    refreshTokenCode: process.env.REFRESH_TOKEN_CODE,
    refreshTokenExpiry: process.env.REFRESH_TOKEN_EXPIRY,

    httpOnlyCookie: process.env.HTTP_ONLY_COOKIE === "true",
    secureCookie: process.env.SECURE_COOKIE === "true",

    smtpUser: 'musaddikulislam007@gmail.com',//process.env.SMTP_USER,
    smtpPass: "mubg iwdx gesr zvfz" //process.env.SMTP_PASS,

    // googleClientID: process.env.GOOGLE_CLIENT_ID,
    // googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
};

// mubg iwdx gesr zvfz 