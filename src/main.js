//@ts-check

// 프레임워크 없이 간단한 토이프로젝트 웹서버 만들기

/**
 * 블로그 포스팅 서비스
 * - 로컬 파일을 데이터베이스로 활용 에정(JSON)
 * - 인증 로직은 넣지 않음
 * - RESTful API 사용
 */

const http = require("http");

const { routes } = require("./api");
const server = http.createServer((req, res) => {
  async function main() {
    const route = routes.find(
      (_route) =>
        req.url &&
        req.method &&
        _route.url.test(req.url) &&
        _route.method === req.method
    );

    if (!route) {
      (res.statusCode = 404), res.end("Not found");
      return;
    }

    const result = await route.callback();
    res.statusCode = result.statusCode;
    res.end(result.body);
  }
});

const PORT = 8000;

server.listen(PORT, () => {
  console.log(`The server is listeninh on port : ${PORT}`);
});
