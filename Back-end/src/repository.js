class FoodRepository {
  constructor(database) {
    this.database = database;
  }

  async getAllFoods() {
    try {
      const sql = "select * from foods";
      const responseDB = await this.database.query(sql);

      return responseDB.rows;
    } catch (error) {
      return { error: error.message };
    }
  }

  async getFoodById(id) {
    try {
      const sql = "select name, price from foods where id = $1";
      const responseDB = await this.database.query(sql, [id]);

      return responseDB.rows;
    } catch (error) {
      return { error: error.message };
    }
  }

  async getFillingsById(id) {
    try {
      const sql = "select name, price from fillings where id_foods = $1";
      const responseDB = await this.database.query(sql, [id]);

      return responseDB.rows;
    } catch (error) {
      return { error: error.message };
    }
  }
}

module.exports = FoodRepository;
