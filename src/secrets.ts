import { SSMClient, GetParameterCommand } from "@aws-sdk/client-ssm";
import { DEMO_MODE } from "./config";

const ssm = new SSMClient({ region: "us-east-1" });

export async function getSSMParameter(name: string) {
    if (DEMO_MODE) {
        const demoValues: Record<string, string> = {
            DATABASE_URL: "demo://fake-db",
            JWT_SECRET: "demo_secret",
            S3_BUCKET_NAME: "demo-bucket",
            AWS_ACCESS_KEY_ID: "demo-key",
            AWS_SECRET_ACCESS_KEY: "demo-secret",
            AWS_REGION: "us-east-1",
        };
        return demoValues[name] || "";
    }

    const command = new GetParameterCommand({ Name: name, WithDecryption: true });
    const response = await ssm.send(command);
    return response.Parameter?.Value;
}