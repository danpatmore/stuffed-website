// Every other address (getstuffed.au, getstuffedapp.com, getstuffedapp.com.au, www.,
// and the pages.dev preview name) sends visitors to getstuffed.app, same page.
const MAIN = "getstuffed.app";

export async function onRequest({ request, next }) {
  const url = new URL(request.url);
  const host = url.hostname;
  const isPreview = host.endsWith(".pages.dev") || host === "localhost" || host === "127.0.0.1";
  if (host !== MAIN && !isPreview) {
    url.hostname = MAIN;
    url.protocol = "https:";
    url.port = "";
    return Response.redirect(url.toString(), 301);
  }
  return next();
}
