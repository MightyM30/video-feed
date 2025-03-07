## How to run project

First, install dependencies:

```bash
npm install
```

Second, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Design decisions

### Common

Using Next.js API as a proxy to avoid using a auth token on the client.

### Preloading Videos

Video download starts when the user clicks on the video.
Depending on the Internet speed, the user downloads videos of different quality. If the speed is more than 100 Mbit/s, 1080p quality is downloaded, otherwise 720p.
Additionally, the full video is downloaded in parallel so that the video can be watched without buffering. Once the full video is downloaded, it will be replaced without any noticeable delays or interruptions. When the user moves to another video, the download stops.

### Continuous Loading

Videos split into pages of 8 pieces.
The first page loads instantly.
New pages are loaded dynamically as the user scrolls to the latest cards.

### Error Handling

Where a full video fails to load uses retry mechanism.
