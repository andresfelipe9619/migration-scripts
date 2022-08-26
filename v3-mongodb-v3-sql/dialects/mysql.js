module.exports = (knex, inspector) => ({
  async delAllTables() {
    const tableList = await inspector.tables();

    // clear all tables
    for (const table of tableList) {
      await knex(table).del();

      await knex.raw(`
      ALTER table
        \"${table}\"
      AUTO_INCREMENT = 1;
      `)
    }

    return tableList;
  },

  async beforeMigration() {
    // do nothing
  }
});
