import { DAO } from "@src/default/dao";
import { RequestDTO } from "@src/default/dto";
import { Row } from "@lib/infra/postgres";

export class Service {
    private dao: DAO;

    constructor() {
        this.dao = new DAO();
    }

    async createData(inputData: RequestDTO): Promise<void> {
        await this.dao.createData(inputData);
    }

    async getData(dataId: string): Promise<Row> {
        return await this.dao.getData(dataId);
    }
}