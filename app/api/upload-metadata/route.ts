export async function POST(req: Request) {
  const metadata = await req.json();

  const response = await fetch(
    "https://api.pinata.cloud/pinning/pinJSONToIPFS",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PINATA_JWT}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(metadata),
    }
  );

  const result = await response.json();

  return Response.json({
    uri: `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`,
  });
}