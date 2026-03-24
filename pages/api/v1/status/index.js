import database from "infra/database.js";

async function status(request, response) {
  try {
    const updatedAt = new Date().toISOString();

    const versionResult = await database.query("SHOW server_version;");
    const maxConnectionsResult = await database.query("SHOW max_connections;");
    const currentConnectionsResult = await database.query(
      "SELECT count(*) FROM pg_stat_activity;",
    );
    const databaseName = process.env.POSTGRES_DB;
    const openedConnectionsValue = await database.query({
      text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1",
      values: [databaseName],
    });

    response.status(200).json({
      updated_at: updatedAt,
      postgres: {
        version: versionResult.rows[0].server_version,
        max_connections: Number(maxConnectionsResult.rows[0].max_connections),
        current_connections: Number(currentConnectionsResult.rows[0].count),
        opened_connections: Number(openedConnectionsValue.rows[0].count),
      },
    });
  } catch (err) {
    console.error("Erro no /status:", err);
    response.status(500).json({ error: err.message });
  }
}

export default status;
