import { Service } from "@src/default/service";
import { Request, Response } from "express";
import { RequestDTO, RequestSchema, ResponseSchema } from "@src/default/dto";
import { abort, send } from "@src/output";
import { ValidationError } from "@lib/errors";
import { validateInput, validateOutput } from "@lib/validate";

abstract class BaseController {
    protected service = new Service();
}

export class Controller extends BaseController {
    post = async (req: Request, res: Response) => {
        try {
            console.log(req.body);
            const dto = validateInput(RequestSchema, req.body);
            await this.service.createData(dto as RequestDTO);
            send(res, 201, { message: "Data created successfully." });
        } catch (e: unknown) {
            if (e instanceof ValidationError) {
                abort(res, 400, String(e));
            } else {
                abort(res, 500, String(e));
            }
        }
    };

    get = async (req: Request, res: Response) => {
        try {
            const dataId = req.params.id;
            if (dataId === null) abort(res, 400, "Missing required parameter 'dataId'");
            const data = await this.service.getData(dataId);
            if (data === null) abort(res, 404, "Data not found.");
            validateOutput(ResponseSchema, data);
            send(res, 200, { data });
        } catch (e: unknown) {
            abort(res, 500, String(e));
        }
    };
}
