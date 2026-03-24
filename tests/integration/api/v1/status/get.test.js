const { RESPONSE_LIMIT_DEFAULT } = require("next/dist/server/api-utils");

test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  expect(responseBody.updated_at).toBeDefined();

  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt);
  expect(responseBody.postgres.version).toEqual("16.0");
  expect(responseBody.postgres.max_connections).toEqual(100);
  expect(responseBody.postgres.current_connections).toBeGreaterThanOrEqual(1);
  expect(responseBody.postgres.opened_connections).toEqual(1);

  console.log(parsedUpdatedAt);
  console.log("Postgres version:", responseBody.postgres.version);
  console.log("Max connections:", responseBody.postgres.max_connections);
  console.log(
    "Current connections:",
    responseBody.postgres.current_connections,
  );
  console.log("Opened connections:", responseBody.postgres.opened_connections);
});
