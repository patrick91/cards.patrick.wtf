import { ImageResponse } from "@vercel/og";

import { NextRequest } from "next/server";

export const config = {
  runtime: "experimental-edge",
};

// Make sure the font exists in the specified path:
const font = fetch(
  new URL("../../assets/SixHandsBlack.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

export default async function handler(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  let title = searchParams.get("title");

  if (!title) {
    title = "Hello World!";
  } else {
    title = decodeURIComponent(escape(atob(title)));
  }

  const fontData = await font;

  return new ImageResponse(
    (
      <div
        style={{
          backgroundColor: "#f8cf7b",
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          fontFamily: '"SixHandsBlack"',
        }}
      >
        <p
          style={{
            transform: "rotate(-6deg)",
            maxWidth: "65%",
            fontSize: 65,
            lineHeight: 1,
          }}
        >
          {title}
        </p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      emoji: "twemoji",
      fonts: [
        {
          name: "SixHandsBlack",
          data: fontData,
          style: "normal",
        },
      ],
    }
  );
}
