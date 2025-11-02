import { db } from "@/appwrite";
import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

async function loadGoogleFont(font: string) {
  const url = `https://fonts.googleapis.com/css2?family=${font}`;
  const css = await (await fetch(url)).text();
  const resource = css.match(
    /src: url\((.+)\) format\('(opentype|truetype)'\)/,
  );

  if (resource) {
    const response = await fetch(resource[1]);
    if (response.status == 200) {
      return await response.arrayBuffer();
    }
  }

  throw new Error("failed to load font data");
}

export default async function Image({ params }: { params: { id: string } }) {
  const task = (await db.getDocument("db", "tasks", params.id)) as any as Task;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          padding: "30px 80px",
          backgroundColor: "#fff",
          fontFamily: "Geist, sans-serif",
          fontWeight: "900",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "0px",
            right: "0px",
            width: "500px",
            height: "500px",
            backgroundColor: "#15d487",
            opacity: 0.5,
            borderRadius: "100px",
            rotate: "45deg",
            filter: "blur(100px)",
            zIndex: 0,
          }}
        ></div>
        <img
          src="https://skillify.eliaschen.dev/worldskills-logo.svg"
          alt="Logo"
          style={{
            position: "absolute",
            bottom: "50px",
            right: "100px",
            width: "130px",
            height: "130px",
            zIndex: 10,
          }}
        />
        <div
          style={{
            flexDirection: "column",
            display: "flex",
            justifyContent: "space-between",
            zIndex: 10,
          }}
        >
          <h1
            style={{
              fontSize: "100px",
              fontWeight: "bold",
            }}
          >
            {task.title}
          </h1>
          <div
            style={{
              fontSize: "35px",
              display: "flex",
              rowGap: "-50px",
              columnGap: "20px",
              fontWeight: "bold",
              flexWrap: "wrap",
              width: "885px",
            }}
          >
            {task.tags.map((tag: Tag) => (
              <p
                key={tag.$id}
                style={{
                  color: "#15d487",
                  fontWeight: "bold",
                  border: "2px solid #15d487",
                  padding: "10px 20px",
                  borderRadius: "20px",
                }}
              >
                {tag.name}
              </p>
            ))}
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Geist",
          data: await loadGoogleFont("Geist"),
          style: "normal",
        },
      ],
    },
  );
}
