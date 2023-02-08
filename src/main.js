//@ts-check

// 프레임워크 없이 간단한 토이프로젝트 웹서버 만들기

/**
 * 블로그 포스팅 서비스
 * - 로컬 파일을 데이터베이스로 활용 에정(JSON)
 * - 인증 로직은 넣지 않음
 * - RESTful API 사용
 */

const http = require("http");

/**
 * Post
 *
 * GET /posts
 * GET /posts/:id
 * POST /posts
 */

const server = http.createServer((req, res) => {
  const POST_ID_REGEX = /^\/posts\/([a-zA-Z0-9-_]+)$/;

  if (req.url === "/posts" && req.method === "GET") {
    res.statusCode = 200;
    res.end("List of posts");
  } else if (req.url && POST_ID_REGEX.test(req.url)) {
    const regexResult = POST_ID_REGEX.exec(req.url);
    console.log(regexResult);
    res.statusCode = 200;
    res.end("Some content of the post");
  } else if (req.url === "/posts" && req.method === "POST") {
    res.statusCode = 200;
    res.end("Creating post");
  } else {
    res.statusCode = 404;
    res.end("Not found");
  }
});

const PORT = 8000;

server.listen(PORT, () => {
  console.log(`The server is listeninh on port : ${PORT}`);
});
