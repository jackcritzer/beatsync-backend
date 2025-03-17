import { SSMClient, GetParameterCommand } from "@aws-sdk/client-ssm";

const ssm = new SSMClient({ region: "us-east-1" });

async function getSSMParameter(name: string) {
    const command = new GetParameterCommand({ Name: name, WithDecryption: true });
    const response = await ssm.send(command);
    return response.Parameter?.Value;
}

export default async function configSecrets() {
    process.env.PORT = await getSSMParameter("/beatsync/PORT") || "5000";
    process.env.JWT_SECRET = await getSSMParameter("/beatsync/JWT_SECRET");
    process.env.DATABASE_URL = await getSSMParameter("/beatsync/DATABASE_URL");
    process.env.AWS_ACCESS_KEY_ID = await getSSMParameter("/beatsync/AWS_ACCESS_KEY_ID");
    process.env.AWS_SECRET_ACCESS_KEY = await getSSMParameter("/beatsync/AWS_SECRET_ACCESS_KEY");
    process.env.AWS_REGION = await getSSMParameter("/beatsync/AWS_REGION");
    process.env.S3_BUCKET_NAME = await getSSMParameter("/beatsync/S3_BUCKET_NAME");

    console.log("Secrets loaded successfully")
}