import DB, { Row } from "@lib/infra/postgres";
import SQL from "sql-template-strings";
import { v4 as uuid4 } from "uuid";
import { RequestDTO } from "@src/default/dto";

export class DAO {
    private db: DB;

    constructor() {
        this.db = DB.getInstance();
    }

    async createData(inputData: RequestDTO): Promise<void> {
        const id = uuid4();
        const query = SQL`${inputData.id} ${id}`;

        const cursor = this.db.cursor();
        await cursor.execute(query);
    }

    async getData(dataId: string): Promise<Row> {
        const query = SQL`${dataId}`;

        const cursor = this.db.cursor();
        return await cursor.fetchOne(query);
    }
}