import { NextRequest } from "next/server";

import { downloadS3ObjectHttp } from "@/lib/s3";

export async function GET(
  req: NextRequest,
  props: { params: Promise<{ projectId: string; payloadId: string }> }
): Promise<Response> {
  const params = await props.params;
  const { projectId, payloadId } = params;
  const payloadType = req.nextUrl.searchParams.get("payloadType");

  const { bytes, headers } = await downloadS3ObjectHttp(projectId, payloadId, payloadType);

  return new Response(bytes, { headers });
}
