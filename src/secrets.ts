import { SSMClient, GetParameterCommand } from "@aws-sdk/client-ssm";
import { DEMO_MODE } from "./config";

const ssm = new SSMClient({ region: "us-east-1" });

export async function getSSMParameter(name: string) {
    if (DEMO_MODE) {
        const demoValues: Record<string, string> = {
            "/cadence/DATABASE_URL": "demo://fake-db",
            "/cadence/JWT_SECRET": "demo_secret",
            "/cadence/S3_BUCKET_NAME": "demo-bucket",
            "/cadence/AWS_ACCESS_KEY_ID": "demo-key",
            "/cadence/AWS_SECRET_ACCESS_KEY": "demo-secret",
            "/cadence/AWS_REGION": "us-east-1",
        };
        return demoValues[name] || "";
    }

    const command = new GetParameterCommand({ Name: name, WithDecryption: true });
    const response = await ssm.send(command);
    return response.Parameter?.Value;
}