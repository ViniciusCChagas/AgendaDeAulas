import { NextFunction, Request, Response } from "express";

const getActualRequestDurationInMilliseconds = (start: [number, number]) => {
  const NS_PER_SEC = 1e9; // constant to convert to nanoseconds
  const NS_TO_MS = 1e6; // constant to convert to milliseconds
  const diff = process.hrtime(start);

  return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
};

const getRequestLogText = (req: Request, uuid: number) => {
  const method = req.method;
  const url = decodeURI(req.originalUrl) ?? req.originalUrl;

  const consoleText = `[REQ-${uuid}][${method}] ${url}`;

  const bodyText = `${
    method != "GET"
      ? ` - body: ${ofuscateSesitiveInfo(JSON.stringify(req.body))}`
      : ""
  } `;
  return {
    reqConsoleText: consoleText + bodyText,
  };
};

const getResponseLogText = (
  req: Request,
  res: Response,
  start: [number, number],
  uuid: number,
  body: string
) => {
  const durationInMilliseconds = getActualRequestDurationInMilliseconds(start);
  const method = req.method;
  const url = decodeURI(req.originalUrl) ?? req.originalUrl;
  const status = res.statusCode;
  const statusMessage = res.statusMessage;

  const consoleText = `[RES-${uuid}][${method}][${status} - ${statusMessage}][${
    durationInMilliseconds.toLocaleString("pt-BR") + " ms"
  }] ${url} `;

  const bodyText = `${
    res.statusCode <= 399 ? " - data:" : " - error:"
  } ${ofuscateSesitiveInfo(body)}`;

  return {
    resConsoleText: consoleText + bodyText,
  };
};

const ofuscateSesitiveInfo = (jsonText: string) => {
  const sesitiveFields = [
    "password",
    "access_token",
    "refresh_token",
    "refreshToken",
  ];

  let ofuscatedText = jsonText;
  sesitiveFields.forEach((field) => {
    ofuscatedText = ofuscatedText.replace(
      new RegExp(`\"${field}\":\"[^\"]*\"`, "g"),
      `"${field}":"****"`
    );
  });
  return ofuscatedText;
};

export const LoggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  const current_datetime = new Date();
  const start = process.hrtime();
  const uuid = current_datetime.getTime();
  const { reqConsoleText } = getRequestLogText(req, uuid);

  console.log(reqConsoleText);

  var oldWrite = res.write;
  var oldEnd = res.end;
  var chunks = [];

  res.write = function (chunk) {
    chunks.push(chunk);
    oldWrite.apply(res, arguments);
    return true;
  };

  res.end = function (chunk) {
    if (chunk) {
      chunks.push(chunk);
    }
    var body = "";
    try {
      body = Buffer.concat(chunks).toString("utf8");
    } catch (error) {
      var body = "{}";
    }

    const { resConsoleText } = getResponseLogText(req, res, start, uuid, body);

    console.log(resConsoleText);
    return oldEnd.apply(res, arguments);
  };
  next();
};
